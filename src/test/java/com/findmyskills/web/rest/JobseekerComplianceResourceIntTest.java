package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.JobseekerCompliance;
import com.findmyskills.repository.JobseekerComplianceRepository;
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
 * Test class for the JobseekerComplianceResource REST controller.
 *
 * @see JobseekerComplianceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class JobseekerComplianceResourceIntTest {

    private static final LocalDate DEFAULT_DATE_COMPLIANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_COMPLIANCE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_ANSWER_COMPLIANCE = false;
    private static final Boolean UPDATED_ANSWER_COMPLIANCE = true;

    @Autowired
    private JobseekerComplianceRepository jobseekerComplianceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJobseekerComplianceMockMvc;

    private JobseekerCompliance jobseekerCompliance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobseekerComplianceResource jobseekerComplianceResource = new JobseekerComplianceResource(jobseekerComplianceRepository);
        this.restJobseekerComplianceMockMvc = MockMvcBuilders.standaloneSetup(jobseekerComplianceResource)
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
    public static JobseekerCompliance createEntity(EntityManager em) {
        JobseekerCompliance jobseekerCompliance = new JobseekerCompliance()
            .dateCompliance(DEFAULT_DATE_COMPLIANCE)
            .answerCompliance(DEFAULT_ANSWER_COMPLIANCE);
        return jobseekerCompliance;
    }

    @Before
    public void initTest() {
        jobseekerCompliance = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobseekerCompliance() throws Exception {
        int databaseSizeBeforeCreate = jobseekerComplianceRepository.findAll().size();

        // Create the JobseekerCompliance
        restJobseekerComplianceMockMvc.perform(post("/api/jobseeker-compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerCompliance)))
            .andExpect(status().isCreated());

        // Validate the JobseekerCompliance in the database
        List<JobseekerCompliance> jobseekerComplianceList = jobseekerComplianceRepository.findAll();
        assertThat(jobseekerComplianceList).hasSize(databaseSizeBeforeCreate + 1);
        JobseekerCompliance testJobseekerCompliance = jobseekerComplianceList.get(jobseekerComplianceList.size() - 1);
        assertThat(testJobseekerCompliance.getDateCompliance()).isEqualTo(DEFAULT_DATE_COMPLIANCE);
        assertThat(testJobseekerCompliance.isAnswerCompliance()).isEqualTo(DEFAULT_ANSWER_COMPLIANCE);
    }

    @Test
    @Transactional
    public void createJobseekerComplianceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobseekerComplianceRepository.findAll().size();

        // Create the JobseekerCompliance with an existing ID
        jobseekerCompliance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobseekerComplianceMockMvc.perform(post("/api/jobseeker-compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerCompliance)))
            .andExpect(status().isBadRequest());

        // Validate the JobseekerCompliance in the database
        List<JobseekerCompliance> jobseekerComplianceList = jobseekerComplianceRepository.findAll();
        assertThat(jobseekerComplianceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJobseekerCompliances() throws Exception {
        // Initialize the database
        jobseekerComplianceRepository.saveAndFlush(jobseekerCompliance);

        // Get all the jobseekerComplianceList
        restJobseekerComplianceMockMvc.perform(get("/api/jobseeker-compliances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobseekerCompliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCompliance").value(hasItem(DEFAULT_DATE_COMPLIANCE.toString())))
            .andExpect(jsonPath("$.[*].answerCompliance").value(hasItem(DEFAULT_ANSWER_COMPLIANCE.booleanValue())));
    }

    @Test
    @Transactional
    public void getJobseekerCompliance() throws Exception {
        // Initialize the database
        jobseekerComplianceRepository.saveAndFlush(jobseekerCompliance);

        // Get the jobseekerCompliance
        restJobseekerComplianceMockMvc.perform(get("/api/jobseeker-compliances/{id}", jobseekerCompliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobseekerCompliance.getId().intValue()))
            .andExpect(jsonPath("$.dateCompliance").value(DEFAULT_DATE_COMPLIANCE.toString()))
            .andExpect(jsonPath("$.answerCompliance").value(DEFAULT_ANSWER_COMPLIANCE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingJobseekerCompliance() throws Exception {
        // Get the jobseekerCompliance
        restJobseekerComplianceMockMvc.perform(get("/api/jobseeker-compliances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobseekerCompliance() throws Exception {
        // Initialize the database
        jobseekerComplianceRepository.saveAndFlush(jobseekerCompliance);
        int databaseSizeBeforeUpdate = jobseekerComplianceRepository.findAll().size();

        // Update the jobseekerCompliance
        JobseekerCompliance updatedJobseekerCompliance = jobseekerComplianceRepository.findOne(jobseekerCompliance.getId());
        // Disconnect from session so that the updates on updatedJobseekerCompliance are not directly saved in db
        em.detach(updatedJobseekerCompliance);
        updatedJobseekerCompliance
            .dateCompliance(UPDATED_DATE_COMPLIANCE)
            .answerCompliance(UPDATED_ANSWER_COMPLIANCE);

        restJobseekerComplianceMockMvc.perform(put("/api/jobseeker-compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJobseekerCompliance)))
            .andExpect(status().isOk());

        // Validate the JobseekerCompliance in the database
        List<JobseekerCompliance> jobseekerComplianceList = jobseekerComplianceRepository.findAll();
        assertThat(jobseekerComplianceList).hasSize(databaseSizeBeforeUpdate);
        JobseekerCompliance testJobseekerCompliance = jobseekerComplianceList.get(jobseekerComplianceList.size() - 1);
        assertThat(testJobseekerCompliance.getDateCompliance()).isEqualTo(UPDATED_DATE_COMPLIANCE);
        assertThat(testJobseekerCompliance.isAnswerCompliance()).isEqualTo(UPDATED_ANSWER_COMPLIANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingJobseekerCompliance() throws Exception {
        int databaseSizeBeforeUpdate = jobseekerComplianceRepository.findAll().size();

        // Create the JobseekerCompliance

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJobseekerComplianceMockMvc.perform(put("/api/jobseeker-compliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerCompliance)))
            .andExpect(status().isCreated());

        // Validate the JobseekerCompliance in the database
        List<JobseekerCompliance> jobseekerComplianceList = jobseekerComplianceRepository.findAll();
        assertThat(jobseekerComplianceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJobseekerCompliance() throws Exception {
        // Initialize the database
        jobseekerComplianceRepository.saveAndFlush(jobseekerCompliance);
        int databaseSizeBeforeDelete = jobseekerComplianceRepository.findAll().size();

        // Get the jobseekerCompliance
        restJobseekerComplianceMockMvc.perform(delete("/api/jobseeker-compliances/{id}", jobseekerCompliance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JobseekerCompliance> jobseekerComplianceList = jobseekerComplianceRepository.findAll();
        assertThat(jobseekerComplianceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobseekerCompliance.class);
        JobseekerCompliance jobseekerCompliance1 = new JobseekerCompliance();
        jobseekerCompliance1.setId(1L);
        JobseekerCompliance jobseekerCompliance2 = new JobseekerCompliance();
        jobseekerCompliance2.setId(jobseekerCompliance1.getId());
        assertThat(jobseekerCompliance1).isEqualTo(jobseekerCompliance2);
        jobseekerCompliance2.setId(2L);
        assertThat(jobseekerCompliance1).isNotEqualTo(jobseekerCompliance2);
        jobseekerCompliance1.setId(null);
        assertThat(jobseekerCompliance1).isNotEqualTo(jobseekerCompliance2);
    }
}
