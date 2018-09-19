package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.WorkExperience;
import com.findmyskills.repository.WorkExperienceRepository;
import com.findmyskills.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.findmyskills.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WorkExperienceResource REST controller.
 *
 * @see WorkExperienceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class WorkExperienceResourceIntTest {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWorkExperienceMockMvc;

    private WorkExperience workExperience;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkExperienceResource workExperienceResource = new WorkExperienceResource(workExperienceRepository);
        this.restWorkExperienceMockMvc = MockMvcBuilders.standaloneSetup(workExperienceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkExperience createEntity(EntityManager em) {
        WorkExperience workExperience = new WorkExperience()
            .companyName(DEFAULT_COMPANY_NAME)
            .position(DEFAULT_POSITION)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return workExperience;
    }

    @Before
    public void initTest() {
        workExperience = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkExperience() throws Exception {
        int databaseSizeBeforeCreate = workExperienceRepository.findAll().size();

        // Create the WorkExperience
        restWorkExperienceMockMvc.perform(post("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperience)))
            .andExpect(status().isCreated());

        // Validate the WorkExperience in the database
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeCreate + 1);
        WorkExperience testWorkExperience = workExperienceList.get(workExperienceList.size() - 1);
        assertThat(testWorkExperience.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testWorkExperience.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testWorkExperience.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testWorkExperience.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testWorkExperience.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createWorkExperienceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workExperienceRepository.findAll().size();

        // Create the WorkExperience with an existing ID
        workExperience.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkExperienceMockMvc.perform(post("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperience)))
            .andExpect(status().isBadRequest());

        // Validate the WorkExperience in the database
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWorkExperiences() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);

        // Get all the workExperienceList
        restWorkExperienceMockMvc.perform(get("/api/work-experiences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workExperience.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME.toString())))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    public void getWorkExperience() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);

        // Get the workExperience
        restWorkExperienceMockMvc.perform(get("/api/work-experiences/{id}", workExperience.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workExperience.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME.toString()))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkExperience() throws Exception {
        // Get the workExperience
        restWorkExperienceMockMvc.perform(get("/api/work-experiences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkExperience() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);
        int databaseSizeBeforeUpdate = workExperienceRepository.findAll().size();

        // Update the workExperience
        WorkExperience updatedWorkExperience = workExperienceRepository.findOne(workExperience.getId());
        // Disconnect from session so that the updates on updatedWorkExperience are not directly saved in db
        em.detach(updatedWorkExperience);
        updatedWorkExperience
            .companyName(UPDATED_COMPANY_NAME)
            .position(UPDATED_POSITION)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restWorkExperienceMockMvc.perform(put("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkExperience)))
            .andExpect(status().isOk());

        // Validate the WorkExperience in the database
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeUpdate);
        WorkExperience testWorkExperience = workExperienceList.get(workExperienceList.size() - 1);
        assertThat(testWorkExperience.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testWorkExperience.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testWorkExperience.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testWorkExperience.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testWorkExperience.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkExperience() throws Exception {
        int databaseSizeBeforeUpdate = workExperienceRepository.findAll().size();

        // Create the WorkExperience

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWorkExperienceMockMvc.perform(put("/api/work-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workExperience)))
            .andExpect(status().isCreated());

        // Validate the WorkExperience in the database
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWorkExperience() throws Exception {
        // Initialize the database
        workExperienceRepository.saveAndFlush(workExperience);
        int databaseSizeBeforeDelete = workExperienceRepository.findAll().size();

        // Get the workExperience
        restWorkExperienceMockMvc.perform(delete("/api/work-experiences/{id}", workExperience.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WorkExperience> workExperienceList = workExperienceRepository.findAll();
        assertThat(workExperienceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkExperience.class);
        WorkExperience workExperience1 = new WorkExperience();
        workExperience1.setId(1L);
        WorkExperience workExperience2 = new WorkExperience();
        workExperience2.setId(workExperience1.getId());
        assertThat(workExperience1).isEqualTo(workExperience2);
        workExperience2.setId(2L);
        assertThat(workExperience1).isNotEqualTo(workExperience2);
        workExperience1.setId(null);
        assertThat(workExperience1).isNotEqualTo(workExperience2);
    }
}
