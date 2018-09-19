package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.Jobseeker;
import com.findmyskills.repository.JobseekerRepository;
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
 * Test class for the JobseekerResource REST controller.
 *
 * @see JobseekerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class JobseekerResourceIntTest {

    private static final LocalDate DEFAULT_REGESTRATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REGESTRATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_BIRTH_YEAR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_YEAR = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_UNEMPLOYED = false;
    private static final Boolean UPDATED_UNEMPLOYED = true;

    private static final LocalDate DEFAULT_LAST_ACTIVE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_ACTIVE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private JobseekerRepository jobseekerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJobseekerMockMvc;

    private Jobseeker jobseeker;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobseekerResource jobseekerResource = new JobseekerResource(jobseekerRepository);
        this.restJobseekerMockMvc = MockMvcBuilders.standaloneSetup(jobseekerResource)
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
    public static Jobseeker createEntity(EntityManager em) {
        Jobseeker jobseeker = new Jobseeker()
            .regestrationDate(DEFAULT_REGESTRATION_DATE)
            .birthYear(DEFAULT_BIRTH_YEAR)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .unemployed(DEFAULT_UNEMPLOYED)
            .lastActive(DEFAULT_LAST_ACTIVE);
        return jobseeker;
    }

    @Before
    public void initTest() {
        jobseeker = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobseeker() throws Exception {
        int databaseSizeBeforeCreate = jobseekerRepository.findAll().size();

        // Create the Jobseeker
        restJobseekerMockMvc.perform(post("/api/jobseekers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseeker)))
            .andExpect(status().isCreated());

        // Validate the Jobseeker in the database
        List<Jobseeker> jobseekerList = jobseekerRepository.findAll();
        assertThat(jobseekerList).hasSize(databaseSizeBeforeCreate + 1);
        Jobseeker testJobseeker = jobseekerList.get(jobseekerList.size() - 1);
        assertThat(testJobseeker.getRegestrationDate()).isEqualTo(DEFAULT_REGESTRATION_DATE);
        assertThat(testJobseeker.getBirthYear()).isEqualTo(DEFAULT_BIRTH_YEAR);
        assertThat(testJobseeker.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testJobseeker.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testJobseeker.isUnemployed()).isEqualTo(DEFAULT_UNEMPLOYED);
        assertThat(testJobseeker.getLastActive()).isEqualTo(DEFAULT_LAST_ACTIVE);
    }

    @Test
    @Transactional
    public void createJobseekerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobseekerRepository.findAll().size();

        // Create the Jobseeker with an existing ID
        jobseeker.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobseekerMockMvc.perform(post("/api/jobseekers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseeker)))
            .andExpect(status().isBadRequest());

        // Validate the Jobseeker in the database
        List<Jobseeker> jobseekerList = jobseekerRepository.findAll();
        assertThat(jobseekerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJobseekers() throws Exception {
        // Initialize the database
        jobseekerRepository.saveAndFlush(jobseeker);

        // Get all the jobseekerList
        restJobseekerMockMvc.perform(get("/api/jobseekers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobseeker.getId().intValue())))
            .andExpect(jsonPath("$.[*].regestrationDate").value(hasItem(DEFAULT_REGESTRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].birthYear").value(hasItem(DEFAULT_BIRTH_YEAR.toString())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].unemployed").value(hasItem(DEFAULT_UNEMPLOYED.booleanValue())))
            .andExpect(jsonPath("$.[*].lastActive").value(hasItem(DEFAULT_LAST_ACTIVE.toString())));
    }

    @Test
    @Transactional
    public void getJobseeker() throws Exception {
        // Initialize the database
        jobseekerRepository.saveAndFlush(jobseeker);

        // Get the jobseeker
        restJobseekerMockMvc.perform(get("/api/jobseekers/{id}", jobseeker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobseeker.getId().intValue()))
            .andExpect(jsonPath("$.regestrationDate").value(DEFAULT_REGESTRATION_DATE.toString()))
            .andExpect(jsonPath("$.birthYear").value(DEFAULT_BIRTH_YEAR.toString()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.unemployed").value(DEFAULT_UNEMPLOYED.booleanValue()))
            .andExpect(jsonPath("$.lastActive").value(DEFAULT_LAST_ACTIVE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJobseeker() throws Exception {
        // Get the jobseeker
        restJobseekerMockMvc.perform(get("/api/jobseekers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobseeker() throws Exception {
        // Initialize the database
        jobseekerRepository.saveAndFlush(jobseeker);
        int databaseSizeBeforeUpdate = jobseekerRepository.findAll().size();

        // Update the jobseeker
        Jobseeker updatedJobseeker = jobseekerRepository.findOne(jobseeker.getId());
        // Disconnect from session so that the updates on updatedJobseeker are not directly saved in db
        em.detach(updatedJobseeker);
        updatedJobseeker
            .regestrationDate(UPDATED_REGESTRATION_DATE)
            .birthYear(UPDATED_BIRTH_YEAR)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .unemployed(UPDATED_UNEMPLOYED)
            .lastActive(UPDATED_LAST_ACTIVE);

        restJobseekerMockMvc.perform(put("/api/jobseekers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJobseeker)))
            .andExpect(status().isOk());

        // Validate the Jobseeker in the database
        List<Jobseeker> jobseekerList = jobseekerRepository.findAll();
        assertThat(jobseekerList).hasSize(databaseSizeBeforeUpdate);
        Jobseeker testJobseeker = jobseekerList.get(jobseekerList.size() - 1);
        assertThat(testJobseeker.getRegestrationDate()).isEqualTo(UPDATED_REGESTRATION_DATE);
        assertThat(testJobseeker.getBirthYear()).isEqualTo(UPDATED_BIRTH_YEAR);
        assertThat(testJobseeker.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testJobseeker.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testJobseeker.isUnemployed()).isEqualTo(UPDATED_UNEMPLOYED);
        assertThat(testJobseeker.getLastActive()).isEqualTo(UPDATED_LAST_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingJobseeker() throws Exception {
        int databaseSizeBeforeUpdate = jobseekerRepository.findAll().size();

        // Create the Jobseeker

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJobseekerMockMvc.perform(put("/api/jobseekers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseeker)))
            .andExpect(status().isCreated());

        // Validate the Jobseeker in the database
        List<Jobseeker> jobseekerList = jobseekerRepository.findAll();
        assertThat(jobseekerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJobseeker() throws Exception {
        // Initialize the database
        jobseekerRepository.saveAndFlush(jobseeker);
        int databaseSizeBeforeDelete = jobseekerRepository.findAll().size();

        // Get the jobseeker
        restJobseekerMockMvc.perform(delete("/api/jobseekers/{id}", jobseeker.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Jobseeker> jobseekerList = jobseekerRepository.findAll();
        assertThat(jobseekerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Jobseeker.class);
        Jobseeker jobseeker1 = new Jobseeker();
        jobseeker1.setId(1L);
        Jobseeker jobseeker2 = new Jobseeker();
        jobseeker2.setId(jobseeker1.getId());
        assertThat(jobseeker1).isEqualTo(jobseeker2);
        jobseeker2.setId(2L);
        assertThat(jobseeker1).isNotEqualTo(jobseeker2);
        jobseeker1.setId(null);
        assertThat(jobseeker1).isNotEqualTo(jobseeker2);
    }
}
