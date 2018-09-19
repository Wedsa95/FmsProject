package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.EmployeerImage;
import com.findmyskills.repository.EmployeerImageRepository;
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
 * Test class for the EmployeerImageResource REST controller.
 *
 * @see EmployeerImageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class EmployeerImageResourceIntTest {

    private static final String DEFAULT_IMAGE_LINK = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_LINK = "BBBBBBBBBB";

    @Autowired
    private EmployeerImageRepository employeerImageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmployeerImageMockMvc;

    private EmployeerImage employeerImage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeerImageResource employeerImageResource = new EmployeerImageResource(employeerImageRepository);
        this.restEmployeerImageMockMvc = MockMvcBuilders.standaloneSetup(employeerImageResource)
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
    public static EmployeerImage createEntity(EntityManager em) {
        EmployeerImage employeerImage = new EmployeerImage()
            .imageLink(DEFAULT_IMAGE_LINK);
        return employeerImage;
    }

    @Before
    public void initTest() {
        employeerImage = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeerImage() throws Exception {
        int databaseSizeBeforeCreate = employeerImageRepository.findAll().size();

        // Create the EmployeerImage
        restEmployeerImageMockMvc.perform(post("/api/employeer-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeerImage)))
            .andExpect(status().isCreated());

        // Validate the EmployeerImage in the database
        List<EmployeerImage> employeerImageList = employeerImageRepository.findAll();
        assertThat(employeerImageList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeerImage testEmployeerImage = employeerImageList.get(employeerImageList.size() - 1);
        assertThat(testEmployeerImage.getImageLink()).isEqualTo(DEFAULT_IMAGE_LINK);
    }

    @Test
    @Transactional
    public void createEmployeerImageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeerImageRepository.findAll().size();

        // Create the EmployeerImage with an existing ID
        employeerImage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeerImageMockMvc.perform(post("/api/employeer-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeerImage)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeerImage in the database
        List<EmployeerImage> employeerImageList = employeerImageRepository.findAll();
        assertThat(employeerImageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmployeerImages() throws Exception {
        // Initialize the database
        employeerImageRepository.saveAndFlush(employeerImage);

        // Get all the employeerImageList
        restEmployeerImageMockMvc.perform(get("/api/employeer-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeerImage.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageLink").value(hasItem(DEFAULT_IMAGE_LINK.toString())));
    }

    @Test
    @Transactional
    public void getEmployeerImage() throws Exception {
        // Initialize the database
        employeerImageRepository.saveAndFlush(employeerImage);

        // Get the employeerImage
        restEmployeerImageMockMvc.perform(get("/api/employeer-images/{id}", employeerImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeerImage.getId().intValue()))
            .andExpect(jsonPath("$.imageLink").value(DEFAULT_IMAGE_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeerImage() throws Exception {
        // Get the employeerImage
        restEmployeerImageMockMvc.perform(get("/api/employeer-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeerImage() throws Exception {
        // Initialize the database
        employeerImageRepository.saveAndFlush(employeerImage);
        int databaseSizeBeforeUpdate = employeerImageRepository.findAll().size();

        // Update the employeerImage
        EmployeerImage updatedEmployeerImage = employeerImageRepository.findOne(employeerImage.getId());
        // Disconnect from session so that the updates on updatedEmployeerImage are not directly saved in db
        em.detach(updatedEmployeerImage);
        updatedEmployeerImage
            .imageLink(UPDATED_IMAGE_LINK);

        restEmployeerImageMockMvc.perform(put("/api/employeer-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployeerImage)))
            .andExpect(status().isOk());

        // Validate the EmployeerImage in the database
        List<EmployeerImage> employeerImageList = employeerImageRepository.findAll();
        assertThat(employeerImageList).hasSize(databaseSizeBeforeUpdate);
        EmployeerImage testEmployeerImage = employeerImageList.get(employeerImageList.size() - 1);
        assertThat(testEmployeerImage.getImageLink()).isEqualTo(UPDATED_IMAGE_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeerImage() throws Exception {
        int databaseSizeBeforeUpdate = employeerImageRepository.findAll().size();

        // Create the EmployeerImage

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmployeerImageMockMvc.perform(put("/api/employeer-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeerImage)))
            .andExpect(status().isCreated());

        // Validate the EmployeerImage in the database
        List<EmployeerImage> employeerImageList = employeerImageRepository.findAll();
        assertThat(employeerImageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmployeerImage() throws Exception {
        // Initialize the database
        employeerImageRepository.saveAndFlush(employeerImage);
        int databaseSizeBeforeDelete = employeerImageRepository.findAll().size();

        // Get the employeerImage
        restEmployeerImageMockMvc.perform(delete("/api/employeer-images/{id}", employeerImage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmployeerImage> employeerImageList = employeerImageRepository.findAll();
        assertThat(employeerImageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeerImage.class);
        EmployeerImage employeerImage1 = new EmployeerImage();
        employeerImage1.setId(1L);
        EmployeerImage employeerImage2 = new EmployeerImage();
        employeerImage2.setId(employeerImage1.getId());
        assertThat(employeerImage1).isEqualTo(employeerImage2);
        employeerImage2.setId(2L);
        assertThat(employeerImage1).isNotEqualTo(employeerImage2);
        employeerImage1.setId(null);
        assertThat(employeerImage1).isNotEqualTo(employeerImage2);
    }
}
