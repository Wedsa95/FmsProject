package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.Extent;
import com.findmyskills.repository.ExtentRepository;
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
 * Test class for the ExtentResource REST controller.
 *
 * @see ExtentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class ExtentResourceIntTest {

    private static final String DEFAULT_EXTENT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_EXTENT_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ExtentRepository extentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExtentMockMvc;

    private Extent extent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExtentResource extentResource = new ExtentResource(extentRepository);
        this.restExtentMockMvc = MockMvcBuilders.standaloneSetup(extentResource)
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
    public static Extent createEntity(EntityManager em) {
        Extent extent = new Extent()
            .extentDescription(DEFAULT_EXTENT_DESCRIPTION);
        return extent;
    }

    @Before
    public void initTest() {
        extent = createEntity(em);
    }

    @Test
    @Transactional
    public void createExtent() throws Exception {
        int databaseSizeBeforeCreate = extentRepository.findAll().size();

        // Create the Extent
        restExtentMockMvc.perform(post("/api/extents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extent)))
            .andExpect(status().isCreated());

        // Validate the Extent in the database
        List<Extent> extentList = extentRepository.findAll();
        assertThat(extentList).hasSize(databaseSizeBeforeCreate + 1);
        Extent testExtent = extentList.get(extentList.size() - 1);
        assertThat(testExtent.getExtentDescription()).isEqualTo(DEFAULT_EXTENT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createExtentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = extentRepository.findAll().size();

        // Create the Extent with an existing ID
        extent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtentMockMvc.perform(post("/api/extents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extent)))
            .andExpect(status().isBadRequest());

        // Validate the Extent in the database
        List<Extent> extentList = extentRepository.findAll();
        assertThat(extentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExtents() throws Exception {
        // Initialize the database
        extentRepository.saveAndFlush(extent);

        // Get all the extentList
        restExtentMockMvc.perform(get("/api/extents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extent.getId().intValue())))
            .andExpect(jsonPath("$.[*].extentDescription").value(hasItem(DEFAULT_EXTENT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getExtent() throws Exception {
        // Initialize the database
        extentRepository.saveAndFlush(extent);

        // Get the extent
        restExtentMockMvc.perform(get("/api/extents/{id}", extent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(extent.getId().intValue()))
            .andExpect(jsonPath("$.extentDescription").value(DEFAULT_EXTENT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExtent() throws Exception {
        // Get the extent
        restExtentMockMvc.perform(get("/api/extents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExtent() throws Exception {
        // Initialize the database
        extentRepository.saveAndFlush(extent);
        int databaseSizeBeforeUpdate = extentRepository.findAll().size();

        // Update the extent
        Extent updatedExtent = extentRepository.findOne(extent.getId());
        // Disconnect from session so that the updates on updatedExtent are not directly saved in db
        em.detach(updatedExtent);
        updatedExtent
            .extentDescription(UPDATED_EXTENT_DESCRIPTION);

        restExtentMockMvc.perform(put("/api/extents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExtent)))
            .andExpect(status().isOk());

        // Validate the Extent in the database
        List<Extent> extentList = extentRepository.findAll();
        assertThat(extentList).hasSize(databaseSizeBeforeUpdate);
        Extent testExtent = extentList.get(extentList.size() - 1);
        assertThat(testExtent.getExtentDescription()).isEqualTo(UPDATED_EXTENT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingExtent() throws Exception {
        int databaseSizeBeforeUpdate = extentRepository.findAll().size();

        // Create the Extent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restExtentMockMvc.perform(put("/api/extents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extent)))
            .andExpect(status().isCreated());

        // Validate the Extent in the database
        List<Extent> extentList = extentRepository.findAll();
        assertThat(extentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteExtent() throws Exception {
        // Initialize the database
        extentRepository.saveAndFlush(extent);
        int databaseSizeBeforeDelete = extentRepository.findAll().size();

        // Get the extent
        restExtentMockMvc.perform(delete("/api/extents/{id}", extent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Extent> extentList = extentRepository.findAll();
        assertThat(extentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Extent.class);
        Extent extent1 = new Extent();
        extent1.setId(1L);
        Extent extent2 = new Extent();
        extent2.setId(extent1.getId());
        assertThat(extent1).isEqualTo(extent2);
        extent2.setId(2L);
        assertThat(extent1).isNotEqualTo(extent2);
        extent1.setId(null);
        assertThat(extent1).isNotEqualTo(extent2);
    }
}
