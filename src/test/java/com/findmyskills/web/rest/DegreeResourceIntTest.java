package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.Degree;
import com.findmyskills.repository.DegreeRepository;
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
 * Test class for the DegreeResource REST controller.
 *
 * @see DegreeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class DegreeResourceIntTest {

    private static final String DEFAULT_DEGREE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DEGREE_TYPE = "BBBBBBBBBB";

    @Autowired
    private DegreeRepository degreeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDegreeMockMvc;

    private Degree degree;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DegreeResource degreeResource = new DegreeResource(degreeRepository);
        this.restDegreeMockMvc = MockMvcBuilders.standaloneSetup(degreeResource)
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
    public static Degree createEntity(EntityManager em) {
        Degree degree = new Degree()
            .degreeType(DEFAULT_DEGREE_TYPE);
        return degree;
    }

    @Before
    public void initTest() {
        degree = createEntity(em);
    }

    @Test
    @Transactional
    public void createDegree() throws Exception {
        int databaseSizeBeforeCreate = degreeRepository.findAll().size();

        // Create the Degree
        restDegreeMockMvc.perform(post("/api/degrees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(degree)))
            .andExpect(status().isCreated());

        // Validate the Degree in the database
        List<Degree> degreeList = degreeRepository.findAll();
        assertThat(degreeList).hasSize(databaseSizeBeforeCreate + 1);
        Degree testDegree = degreeList.get(degreeList.size() - 1);
        assertThat(testDegree.getDegreeType()).isEqualTo(DEFAULT_DEGREE_TYPE);
    }

    @Test
    @Transactional
    public void createDegreeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = degreeRepository.findAll().size();

        // Create the Degree with an existing ID
        degree.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDegreeMockMvc.perform(post("/api/degrees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(degree)))
            .andExpect(status().isBadRequest());

        // Validate the Degree in the database
        List<Degree> degreeList = degreeRepository.findAll();
        assertThat(degreeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDegrees() throws Exception {
        // Initialize the database
        degreeRepository.saveAndFlush(degree);

        // Get all the degreeList
        restDegreeMockMvc.perform(get("/api/degrees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(degree.getId().intValue())))
            .andExpect(jsonPath("$.[*].degreeType").value(hasItem(DEFAULT_DEGREE_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getDegree() throws Exception {
        // Initialize the database
        degreeRepository.saveAndFlush(degree);

        // Get the degree
        restDegreeMockMvc.perform(get("/api/degrees/{id}", degree.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(degree.getId().intValue()))
            .andExpect(jsonPath("$.degreeType").value(DEFAULT_DEGREE_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDegree() throws Exception {
        // Get the degree
        restDegreeMockMvc.perform(get("/api/degrees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDegree() throws Exception {
        // Initialize the database
        degreeRepository.saveAndFlush(degree);
        int databaseSizeBeforeUpdate = degreeRepository.findAll().size();

        // Update the degree
        Degree updatedDegree = degreeRepository.findOne(degree.getId());
        // Disconnect from session so that the updates on updatedDegree are not directly saved in db
        em.detach(updatedDegree);
        updatedDegree
            .degreeType(UPDATED_DEGREE_TYPE);

        restDegreeMockMvc.perform(put("/api/degrees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDegree)))
            .andExpect(status().isOk());

        // Validate the Degree in the database
        List<Degree> degreeList = degreeRepository.findAll();
        assertThat(degreeList).hasSize(databaseSizeBeforeUpdate);
        Degree testDegree = degreeList.get(degreeList.size() - 1);
        assertThat(testDegree.getDegreeType()).isEqualTo(UPDATED_DEGREE_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingDegree() throws Exception {
        int databaseSizeBeforeUpdate = degreeRepository.findAll().size();

        // Create the Degree

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDegreeMockMvc.perform(put("/api/degrees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(degree)))
            .andExpect(status().isCreated());

        // Validate the Degree in the database
        List<Degree> degreeList = degreeRepository.findAll();
        assertThat(degreeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDegree() throws Exception {
        // Initialize the database
        degreeRepository.saveAndFlush(degree);
        int databaseSizeBeforeDelete = degreeRepository.findAll().size();

        // Get the degree
        restDegreeMockMvc.perform(delete("/api/degrees/{id}", degree.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Degree> degreeList = degreeRepository.findAll();
        assertThat(degreeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Degree.class);
        Degree degree1 = new Degree();
        degree1.setId(1L);
        Degree degree2 = new Degree();
        degree2.setId(degree1.getId());
        assertThat(degree1).isEqualTo(degree2);
        degree2.setId(2L);
        assertThat(degree1).isNotEqualTo(degree2);
        degree1.setId(null);
        assertThat(degree1).isNotEqualTo(degree2);
    }
}
