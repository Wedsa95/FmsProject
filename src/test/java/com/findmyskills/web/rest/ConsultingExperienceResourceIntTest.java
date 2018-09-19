package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.ConsultingExperience;
import com.findmyskills.repository.ConsultingExperienceRepository;
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

import javax.persistence.EntityManager;
import java.util.List;

import static com.findmyskills.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ConsultingExperienceResource REST controller.
 *
 * @see ConsultingExperienceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class ConsultingExperienceResourceIntTest {

    private static final Integer DEFAULT_YEARS_CONSULTING = 1;
    private static final Integer UPDATED_YEARS_CONSULTING = 2;

    @Autowired
    private ConsultingExperienceRepository consultingExperienceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConsultingExperienceMockMvc;

    private ConsultingExperience consultingExperience;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsultingExperienceResource consultingExperienceResource = new ConsultingExperienceResource(consultingExperienceRepository);
        this.restConsultingExperienceMockMvc = MockMvcBuilders.standaloneSetup(consultingExperienceResource)
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
    public static ConsultingExperience createEntity(EntityManager em) {
        ConsultingExperience consultingExperience = new ConsultingExperience()
            .yearsConsulting(DEFAULT_YEARS_CONSULTING);
        return consultingExperience;
    }

    @Before
    public void initTest() {
        consultingExperience = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsultingExperience() throws Exception {
        int databaseSizeBeforeCreate = consultingExperienceRepository.findAll().size();

        // Create the ConsultingExperience
        restConsultingExperienceMockMvc.perform(post("/api/consulting-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultingExperience)))
            .andExpect(status().isCreated());

        // Validate the ConsultingExperience in the database
        List<ConsultingExperience> consultingExperienceList = consultingExperienceRepository.findAll();
        assertThat(consultingExperienceList).hasSize(databaseSizeBeforeCreate + 1);
        ConsultingExperience testConsultingExperience = consultingExperienceList.get(consultingExperienceList.size() - 1);
        assertThat(testConsultingExperience.getYearsConsulting()).isEqualTo(DEFAULT_YEARS_CONSULTING);
    }

    @Test
    @Transactional
    public void createConsultingExperienceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultingExperienceRepository.findAll().size();

        // Create the ConsultingExperience with an existing ID
        consultingExperience.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultingExperienceMockMvc.perform(post("/api/consulting-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultingExperience)))
            .andExpect(status().isBadRequest());

        // Validate the ConsultingExperience in the database
        List<ConsultingExperience> consultingExperienceList = consultingExperienceRepository.findAll();
        assertThat(consultingExperienceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConsultingExperiences() throws Exception {
        // Initialize the database
        consultingExperienceRepository.saveAndFlush(consultingExperience);

        // Get all the consultingExperienceList
        restConsultingExperienceMockMvc.perform(get("/api/consulting-experiences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consultingExperience.getId().intValue())))
            .andExpect(jsonPath("$.[*].yearsConsulting").value(hasItem(DEFAULT_YEARS_CONSULTING)));
    }

    @Test
    @Transactional
    public void getConsultingExperience() throws Exception {
        // Initialize the database
        consultingExperienceRepository.saveAndFlush(consultingExperience);

        // Get the consultingExperience
        restConsultingExperienceMockMvc.perform(get("/api/consulting-experiences/{id}", consultingExperience.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consultingExperience.getId().intValue()))
            .andExpect(jsonPath("$.yearsConsulting").value(DEFAULT_YEARS_CONSULTING));
    }

    @Test
    @Transactional
    public void getNonExistingConsultingExperience() throws Exception {
        // Get the consultingExperience
        restConsultingExperienceMockMvc.perform(get("/api/consulting-experiences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsultingExperience() throws Exception {
        // Initialize the database
        consultingExperienceRepository.saveAndFlush(consultingExperience);
        int databaseSizeBeforeUpdate = consultingExperienceRepository.findAll().size();

        // Update the consultingExperience
        ConsultingExperience updatedConsultingExperience = consultingExperienceRepository.findOne(consultingExperience.getId());
        // Disconnect from session so that the updates on updatedConsultingExperience are not directly saved in db
        em.detach(updatedConsultingExperience);
        updatedConsultingExperience
            .yearsConsulting(UPDATED_YEARS_CONSULTING);

        restConsultingExperienceMockMvc.perform(put("/api/consulting-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsultingExperience)))
            .andExpect(status().isOk());

        // Validate the ConsultingExperience in the database
        List<ConsultingExperience> consultingExperienceList = consultingExperienceRepository.findAll();
        assertThat(consultingExperienceList).hasSize(databaseSizeBeforeUpdate);
        ConsultingExperience testConsultingExperience = consultingExperienceList.get(consultingExperienceList.size() - 1);
        assertThat(testConsultingExperience.getYearsConsulting()).isEqualTo(UPDATED_YEARS_CONSULTING);
    }

    @Test
    @Transactional
    public void updateNonExistingConsultingExperience() throws Exception {
        int databaseSizeBeforeUpdate = consultingExperienceRepository.findAll().size();

        // Create the ConsultingExperience

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConsultingExperienceMockMvc.perform(put("/api/consulting-experiences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultingExperience)))
            .andExpect(status().isCreated());

        // Validate the ConsultingExperience in the database
        List<ConsultingExperience> consultingExperienceList = consultingExperienceRepository.findAll();
        assertThat(consultingExperienceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConsultingExperience() throws Exception {
        // Initialize the database
        consultingExperienceRepository.saveAndFlush(consultingExperience);
        int databaseSizeBeforeDelete = consultingExperienceRepository.findAll().size();

        // Get the consultingExperience
        restConsultingExperienceMockMvc.perform(delete("/api/consulting-experiences/{id}", consultingExperience.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ConsultingExperience> consultingExperienceList = consultingExperienceRepository.findAll();
        assertThat(consultingExperienceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsultingExperience.class);
        ConsultingExperience consultingExperience1 = new ConsultingExperience();
        consultingExperience1.setId(1L);
        ConsultingExperience consultingExperience2 = new ConsultingExperience();
        consultingExperience2.setId(consultingExperience1.getId());
        assertThat(consultingExperience1).isEqualTo(consultingExperience2);
        consultingExperience2.setId(2L);
        assertThat(consultingExperience1).isNotEqualTo(consultingExperience2);
        consultingExperience1.setId(null);
        assertThat(consultingExperience1).isNotEqualTo(consultingExperience2);
    }
}
