package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.EmployeerCompliance;
import com.findmyskills.repository.EmployeerComplianceRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.findmyskills.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EmployeerComplianceResource REST controller.
 *
 * @see EmployeerComplianceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class EmployeerComplianceResourceIntTest {

    private static final LocalDate DEFAULT_DATE_COMPLIANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_COMPLIANCE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_ANSWER_COMPLIANCE = false;
    private static final Boolean UPDATED_ANSWER_COMPLIANCE = true;

    @Autowired
    private EmployeerComplianceRepository employeerComplianceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmployeerComplianceMockMvc;

    private EmployeerCompliance employeerCompliance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeerComplianceResource employeerComplianceResource = new EmployeerComplianceResource(employeerComplianceRepository);
        this.restEmployeerComplianceMockMvc = MockMvcBuilders.standaloneSetup(employeerComplianceResource)
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
    public static EmployeerCompliance createEntity(EntityManager em) {
        EmployeerCompliance employeerCompliance = new EmployeerCompliance()
            .dateCompliance(DEFAULT_DATE_COMPLIANCE)
            .answerCompliance(DEFAULT_ANSWER_COMPLIANCE);
        return employeerCompliance;
    }

    @Before
    public void initTest() {
        employeerCompliance = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeerCompliance() throws Exception {
        int databaseSizeBeforeCreate = employeerComplianceRepository.findAll().size();

        // Create the EmployeerCompliance
        restEmployeerComplianceMockMvc.perform(post("/api/employeer-compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeerCompliance)))
            .andExpect(status().isCreated());

        // Validate the EmployeerCompliance in the database
        List<EmployeerCompliance> employeerComplianceList = employeerComplianceRepository.findAll();
        assertThat(employeerComplianceList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeerCompliance testEmployeerCompliance = employeerComplianceList.get(employeerComplianceList.size() - 1);
        assertThat(testEmployeerCompliance.getDateCompliance()).isEqualTo(DEFAULT_DATE_COMPLIANCE);
        assertThat(testEmployeerCompliance.isAnswerCompliance()).isEqualTo(DEFAULT_ANSWER_COMPLIANCE);
    }

    @Test
    @Transactional
    public void createEmployeerComplianceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeerComplianceRepository.findAll().size();

        // Create the EmployeerCompliance with an existing ID
        employeerCompliance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeerComplianceMockMvc.perform(post("/api/employeer-compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeerCompliance)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeerCompliance in the database
        List<EmployeerCompliance> employeerComplianceList = employeerComplianceRepository.findAll();
        assertThat(employeerComplianceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmployeerCompliances() throws Exception {
        // Initialize the database
        employeerComplianceRepository.saveAndFlush(employeerCompliance);

        // Get all the employeerComplianceList
        restEmployeerComplianceMockMvc.perform(get("/api/employeer-compliances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeerCompliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCompliance").value(hasItem(DEFAULT_DATE_COMPLIANCE.toString())))
            .andExpect(jsonPath("$.[*].answerCompliance").value(hasItem(DEFAULT_ANSWER_COMPLIANCE.booleanValue())));
    }

    @Test
    @Transactional
    public void getEmployeerCompliance() throws Exception {
        // Initialize the database
        employeerComplianceRepository.saveAndFlush(employeerCompliance);

        // Get the employeerCompliance
        restEmployeerComplianceMockMvc.perform(get("/api/employeer-compliances/{id}", employeerCompliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeerCompliance.getId().intValue()))
            .andExpect(jsonPath("$.dateCompliance").value(DEFAULT_DATE_COMPLIANCE.toString()))
            .andExpect(jsonPath("$.answerCompliance").value(DEFAULT_ANSWER_COMPLIANCE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeerCompliance() throws Exception {
        // Get the employeerCompliance
        restEmployeerComplianceMockMvc.perform(get("/api/employeer-compliances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeerCompliance() throws Exception {
        // Initialize the database
        employeerComplianceRepository.saveAndFlush(employeerCompliance);
        int databaseSizeBeforeUpdate = employeerComplianceRepository.findAll().size();

        // Update the employeerCompliance
        EmployeerCompliance updatedEmployeerCompliance = employeerComplianceRepository.findOne(employeerCompliance.getId());
        // Disconnect from session so that the updates on updatedEmployeerCompliance are not directly saved in db
        em.detach(updatedEmployeerCompliance);
        updatedEmployeerCompliance
            .dateCompliance(UPDATED_DATE_COMPLIANCE)
            .answerCompliance(UPDATED_ANSWER_COMPLIANCE);

        restEmployeerComplianceMockMvc.perform(put("/api/employeer-compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployeerCompliance)))
            .andExpect(status().isOk());

        // Validate the EmployeerCompliance in the database
        List<EmployeerCompliance> employeerComplianceList = employeerComplianceRepository.findAll();
        assertThat(employeerComplianceList).hasSize(databaseSizeBeforeUpdate);
        EmployeerCompliance testEmployeerCompliance = employeerComplianceList.get(employeerComplianceList.size() - 1);
        assertThat(testEmployeerCompliance.getDateCompliance()).isEqualTo(UPDATED_DATE_COMPLIANCE);
        assertThat(testEmployeerCompliance.isAnswerCompliance()).isEqualTo(UPDATED_ANSWER_COMPLIANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeerCompliance() throws Exception {
        int databaseSizeBeforeUpdate = employeerComplianceRepository.findAll().size();

        // Create the EmployeerCompliance

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmployeerComplianceMockMvc.perform(put("/api/employeer-compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeerCompliance)))
            .andExpect(status().isCreated());

        // Validate the EmployeerCompliance in the database
        List<EmployeerCompliance> employeerComplianceList = employeerComplianceRepository.findAll();
        assertThat(employeerComplianceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmployeerCompliance() throws Exception {
        // Initialize the database
        employeerComplianceRepository.saveAndFlush(employeerCompliance);
        int databaseSizeBeforeDelete = employeerComplianceRepository.findAll().size();

        // Get the employeerCompliance
        restEmployeerComplianceMockMvc.perform(delete("/api/employeer-compliances/{id}", employeerCompliance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmployeerCompliance> employeerComplianceList = employeerComplianceRepository.findAll();
        assertThat(employeerComplianceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeerCompliance.class);
        EmployeerCompliance employeerCompliance1 = new EmployeerCompliance();
        employeerCompliance1.setId(1L);
        EmployeerCompliance employeerCompliance2 = new EmployeerCompliance();
        employeerCompliance2.setId(employeerCompliance1.getId());
        assertThat(employeerCompliance1).isEqualTo(employeerCompliance2);
        employeerCompliance2.setId(2L);
        assertThat(employeerCompliance1).isNotEqualTo(employeerCompliance2);
        employeerCompliance1.setId(null);
        assertThat(employeerCompliance1).isNotEqualTo(employeerCompliance2);
    }
}
