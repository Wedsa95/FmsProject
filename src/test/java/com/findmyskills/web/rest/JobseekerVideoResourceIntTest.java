package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.JobseekerVideo;
import com.findmyskills.repository.JobseekerVideoRepository;
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
 * Test class for the JobseekerVideoResource REST controller.
 *
 * @see JobseekerVideoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class JobseekerVideoResourceIntTest {

    private static final String DEFAULT_VIDEO_LINK = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_LINK = "BBBBBBBBBB";

    @Autowired
    private JobseekerVideoRepository jobseekerVideoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJobseekerVideoMockMvc;

    private JobseekerVideo jobseekerVideo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobseekerVideoResource jobseekerVideoResource = new JobseekerVideoResource(jobseekerVideoRepository);
        this.restJobseekerVideoMockMvc = MockMvcBuilders.standaloneSetup(jobseekerVideoResource)
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
    public static JobseekerVideo createEntity(EntityManager em) {
        JobseekerVideo jobseekerVideo = new JobseekerVideo()
            .videoLink(DEFAULT_VIDEO_LINK);
        return jobseekerVideo;
    }

    @Before
    public void initTest() {
        jobseekerVideo = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobseekerVideo() throws Exception {
        int databaseSizeBeforeCreate = jobseekerVideoRepository.findAll().size();

        // Create the JobseekerVideo
        restJobseekerVideoMockMvc.perform(post("/api/jobseeker-videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerVideo)))
            .andExpect(status().isCreated());

        // Validate the JobseekerVideo in the database
        List<JobseekerVideo> jobseekerVideoList = jobseekerVideoRepository.findAll();
        assertThat(jobseekerVideoList).hasSize(databaseSizeBeforeCreate + 1);
        JobseekerVideo testJobseekerVideo = jobseekerVideoList.get(jobseekerVideoList.size() - 1);
        assertThat(testJobseekerVideo.getVideoLink()).isEqualTo(DEFAULT_VIDEO_LINK);
    }

    @Test
    @Transactional
    public void createJobseekerVideoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobseekerVideoRepository.findAll().size();

        // Create the JobseekerVideo with an existing ID
        jobseekerVideo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobseekerVideoMockMvc.perform(post("/api/jobseeker-videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerVideo)))
            .andExpect(status().isBadRequest());

        // Validate the JobseekerVideo in the database
        List<JobseekerVideo> jobseekerVideoList = jobseekerVideoRepository.findAll();
        assertThat(jobseekerVideoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJobseekerVideos() throws Exception {
        // Initialize the database
        jobseekerVideoRepository.saveAndFlush(jobseekerVideo);

        // Get all the jobseekerVideoList
        restJobseekerVideoMockMvc.perform(get("/api/jobseeker-videos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobseekerVideo.getId().intValue())))
            .andExpect(jsonPath("$.[*].videoLink").value(hasItem(DEFAULT_VIDEO_LINK.toString())));
    }

    @Test
    @Transactional
    public void getJobseekerVideo() throws Exception {
        // Initialize the database
        jobseekerVideoRepository.saveAndFlush(jobseekerVideo);

        // Get the jobseekerVideo
        restJobseekerVideoMockMvc.perform(get("/api/jobseeker-videos/{id}", jobseekerVideo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobseekerVideo.getId().intValue()))
            .andExpect(jsonPath("$.videoLink").value(DEFAULT_VIDEO_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJobseekerVideo() throws Exception {
        // Get the jobseekerVideo
        restJobseekerVideoMockMvc.perform(get("/api/jobseeker-videos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobseekerVideo() throws Exception {
        // Initialize the database
        jobseekerVideoRepository.saveAndFlush(jobseekerVideo);
        int databaseSizeBeforeUpdate = jobseekerVideoRepository.findAll().size();

        // Update the jobseekerVideo
        JobseekerVideo updatedJobseekerVideo = jobseekerVideoRepository.findOne(jobseekerVideo.getId());
        // Disconnect from session so that the updates on updatedJobseekerVideo are not directly saved in db
        em.detach(updatedJobseekerVideo);
        updatedJobseekerVideo
            .videoLink(UPDATED_VIDEO_LINK);

        restJobseekerVideoMockMvc.perform(put("/api/jobseeker-videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJobseekerVideo)))
            .andExpect(status().isOk());

        // Validate the JobseekerVideo in the database
        List<JobseekerVideo> jobseekerVideoList = jobseekerVideoRepository.findAll();
        assertThat(jobseekerVideoList).hasSize(databaseSizeBeforeUpdate);
        JobseekerVideo testJobseekerVideo = jobseekerVideoList.get(jobseekerVideoList.size() - 1);
        assertThat(testJobseekerVideo.getVideoLink()).isEqualTo(UPDATED_VIDEO_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingJobseekerVideo() throws Exception {
        int databaseSizeBeforeUpdate = jobseekerVideoRepository.findAll().size();

        // Create the JobseekerVideo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJobseekerVideoMockMvc.perform(put("/api/jobseeker-videos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobseekerVideo)))
            .andExpect(status().isCreated());

        // Validate the JobseekerVideo in the database
        List<JobseekerVideo> jobseekerVideoList = jobseekerVideoRepository.findAll();
        assertThat(jobseekerVideoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJobseekerVideo() throws Exception {
        // Initialize the database
        jobseekerVideoRepository.saveAndFlush(jobseekerVideo);
        int databaseSizeBeforeDelete = jobseekerVideoRepository.findAll().size();

        // Get the jobseekerVideo
        restJobseekerVideoMockMvc.perform(delete("/api/jobseeker-videos/{id}", jobseekerVideo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JobseekerVideo> jobseekerVideoList = jobseekerVideoRepository.findAll();
        assertThat(jobseekerVideoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobseekerVideo.class);
        JobseekerVideo jobseekerVideo1 = new JobseekerVideo();
        jobseekerVideo1.setId(1L);
        JobseekerVideo jobseekerVideo2 = new JobseekerVideo();
        jobseekerVideo2.setId(jobseekerVideo1.getId());
        assertThat(jobseekerVideo1).isEqualTo(jobseekerVideo2);
        jobseekerVideo2.setId(2L);
        assertThat(jobseekerVideo1).isNotEqualTo(jobseekerVideo2);
        jobseekerVideo1.setId(null);
        assertThat(jobseekerVideo1).isNotEqualTo(jobseekerVideo2);
    }
}
