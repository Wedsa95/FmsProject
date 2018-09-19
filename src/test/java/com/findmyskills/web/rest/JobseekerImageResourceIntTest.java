package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.JobseekerImage;
import com.findmyskills.repository.JobseekerImageRepository;
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
 * Test class for the JobseekerImageResource REST controller.
 *
 * @see JobseekerImageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class JobseekerImageResourceIntTest {

    private static final String DEFAULT_IMAGE_LINK = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_LINK = "BBBBBBBBBB";

    @Autowired
    private JobseekerImageRepository jobseekerImageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJobseekerImageMockMvc;

    private JobseekerImage jobseekerImage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobseekerImageResource jobseekerImageResource = new JobseekerImageResource(jobseekerImageRepository);
        this.restJobseekerImageMockMvc = MockMvcBuilders.standaloneSetup(jobseekerImageResource)
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
    public static JobseekerImage createEntity(EntityManager em) {
        JobseekerImage jobseekerImage = new JobseekerImage()
            .imageLink(DEFAULT_IMAGE_LINK);
        return jobseekerImage;
    }

    @Before
    public void initTest() {
        jobseekerImage = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobseekerImage() throws Exception {
        int databaseSizeBeforeCreate = jobseekerImageRepository.findAll().size();

        // Create the JobseekerImage
        restJobseekerImageMockMvc.perform(post("/api/jobseeker-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerImage)))
            .andExpect(status().isCreated());

        // Validate the JobseekerImage in the database
        List<JobseekerImage> jobseekerImageList = jobseekerImageRepository.findAll();
        assertThat(jobseekerImageList).hasSize(databaseSizeBeforeCreate + 1);
        JobseekerImage testJobseekerImage = jobseekerImageList.get(jobseekerImageList.size() - 1);
        assertThat(testJobseekerImage.getImageLink()).isEqualTo(DEFAULT_IMAGE_LINK);
    }

    @Test
    @Transactional
    public void createJobseekerImageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobseekerImageRepository.findAll().size();

        // Create the JobseekerImage with an existing ID
        jobseekerImage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobseekerImageMockMvc.perform(post("/api/jobseeker-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerImage)))
            .andExpect(status().isBadRequest());

        // Validate the JobseekerImage in the database
        List<JobseekerImage> jobseekerImageList = jobseekerImageRepository.findAll();
        assertThat(jobseekerImageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJobseekerImages() throws Exception {
        // Initialize the database
        jobseekerImageRepository.saveAndFlush(jobseekerImage);

        // Get all the jobseekerImageList
        restJobseekerImageMockMvc.perform(get("/api/jobseeker-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobseekerImage.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageLink").value(hasItem(DEFAULT_IMAGE_LINK.toString())));
    }

    @Test
    @Transactional
    public void getJobseekerImage() throws Exception {
        // Initialize the database
        jobseekerImageRepository.saveAndFlush(jobseekerImage);

        // Get the jobseekerImage
        restJobseekerImageMockMvc.perform(get("/api/jobseeker-images/{id}", jobseekerImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobseekerImage.getId().intValue()))
            .andExpect(jsonPath("$.imageLink").value(DEFAULT_IMAGE_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJobseekerImage() throws Exception {
        // Get the jobseekerImage
        restJobseekerImageMockMvc.perform(get("/api/jobseeker-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobseekerImage() throws Exception {
        // Initialize the database
        jobseekerImageRepository.saveAndFlush(jobseekerImage);
        int databaseSizeBeforeUpdate = jobseekerImageRepository.findAll().size();

        // Update the jobseekerImage
        JobseekerImage updatedJobseekerImage = jobseekerImageRepository.findOne(jobseekerImage.getId());
        // Disconnect from session so that the updates on updatedJobseekerImage are not directly saved in db
        em.detach(updatedJobseekerImage);
        updatedJobseekerImage
            .imageLink(UPDATED_IMAGE_LINK);

        restJobseekerImageMockMvc.perform(put("/api/jobseeker-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJobseekerImage)))
            .andExpect(status().isOk());

        // Validate the JobseekerImage in the database
        List<JobseekerImage> jobseekerImageList = jobseekerImageRepository.findAll();
        assertThat(jobseekerImageList).hasSize(databaseSizeBeforeUpdate);
        JobseekerImage testJobseekerImage = jobseekerImageList.get(jobseekerImageList.size() - 1);
        assertThat(testJobseekerImage.getImageLink()).isEqualTo(UPDATED_IMAGE_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingJobseekerImage() throws Exception {
        int databaseSizeBeforeUpdate = jobseekerImageRepository.findAll().size();

        // Create the JobseekerImage

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJobseekerImageMockMvc.perform(put("/api/jobseeker-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerImage)))
            .andExpect(status().isCreated());

        // Validate the JobseekerImage in the database
        List<JobseekerImage> jobseekerImageList = jobseekerImageRepository.findAll();
        assertThat(jobseekerImageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJobseekerImage() throws Exception {
        // Initialize the database
        jobseekerImageRepository.saveAndFlush(jobseekerImage);
        int databaseSizeBeforeDelete = jobseekerImageRepository.findAll().size();

        // Get the jobseekerImage
        restJobseekerImageMockMvc.perform(delete("/api/jobseeker-images/{id}", jobseekerImage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JobseekerImage> jobseekerImageList = jobseekerImageRepository.findAll();
        assertThat(jobseekerImageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobseekerImage.class);
        JobseekerImage jobseekerImage1 = new JobseekerImage();
        jobseekerImage1.setId(1L);
        JobseekerImage jobseekerImage2 = new JobseekerImage();
        jobseekerImage2.setId(jobseekerImage1.getId());
        assertThat(jobseekerImage1).isEqualTo(jobseekerImage2);
        jobseekerImage2.setId(2L);
        assertThat(jobseekerImage1).isNotEqualTo(jobseekerImage2);
        jobseekerImage1.setId(null);
        assertThat(jobseekerImage1).isNotEqualTo(jobseekerImage2);
    }
}
