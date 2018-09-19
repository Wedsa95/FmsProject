package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.Employeer;
import com.findmyskills.repository.EmployeerRepository;
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
 * Test class for the EmployeerResource REST controller.
 *
 * @see EmployeerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class EmployeerResourceIntTest {

    private static final String DEFAULT_EMPLOYEER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYEER_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_LAST_ACTIVE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_ACTIVE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COMPANY_REGISTRATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_REGISTRATION_NUMBER = "BBBBBBBBBB";

    @Autowired
    private EmployeerRepository employeerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmployeerMockMvc;

    private Employeer employeer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeerResource employeerResource = new EmployeerResource(employeerRepository);
        this.restEmployeerMockMvc = MockMvcBuilders.standaloneSetup(employeerResource)
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
    public static Employeer createEntity(EntityManager em) {
        Employeer employeer = new Employeer()
            .employeerName(DEFAULT_EMPLOYEER_NAME)
            .lastActive(DEFAULT_LAST_ACTIVE)
            .companyRegistrationNumber(DEFAULT_COMPANY_REGISTRATION_NUMBER);
        return employeer;
    }

    @Before
    public void initTest() {
        employeer = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeer() throws Exception {
        int databaseSizeBeforeCreate = employeerRepository.findAll().size();

        // Create the Employeer
        restEmployeerMockMvc.perform(post("/api/employeers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeer)))
            .andExpect(status().isCreated());

        // Validate the Employeer in the database
        List<Employeer> employeerList = employeerRepository.findAll();
        assertThat(employeerList).hasSize(databaseSizeBeforeCreate + 1);
        Employeer testEmployeer = employeerList.get(employeerList.size() - 1);
        assertThat(testEmployeer.getEmployeerName()).isEqualTo(DEFAULT_EMPLOYEER_NAME);
        assertThat(testEmployeer.getLastActive()).isEqualTo(DEFAULT_LAST_ACTIVE);
        assertThat(testEmployeer.getCompanyRegistrationNumber()).isEqualTo(DEFAULT_COMPANY_REGISTRATION_NUMBER);
    }

    @Test
    @Transactional
    public void createEmployeerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeerRepository.findAll().size();

        // Create the Employeer with an existing ID
        employeer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeerMockMvc.perform(post("/api/employeers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeer)))
            .andExpect(status().isBadRequest());

        // Validate the Employeer in the database
        List<Employeer> employeerList = employeerRepository.findAll();
        assertThat(employeerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmployeers() throws Exception {
        // Initialize the database
        employeerRepository.saveAndFlush(employeer);

        // Get all the employeerList
        restEmployeerMockMvc.perform(get("/api/employeers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeer.getId().intValue())))
            .andExpect(jsonPath("$.[*].employeerName").value(hasItem(DEFAULT_EMPLOYEER_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastActive").value(hasItem(DEFAULT_LAST_ACTIVE.toString())))
            .andExpect(jsonPath("$.[*].companyRegistrationNumber").value(hasItem(DEFAULT_COMPANY_REGISTRATION_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getEmployeer() throws Exception {
        // Initialize the database
        employeerRepository.saveAndFlush(employeer);

        // Get the employeer
        restEmployeerMockMvc.perform(get("/api/employeers/{id}", employeer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeer.getId().intValue()))
            .andExpect(jsonPath("$.employeerName").value(DEFAULT_EMPLOYEER_NAME.toString()))
            .andExpect(jsonPath("$.lastActive").value(DEFAULT_LAST_ACTIVE.toString()))
            .andExpect(jsonPath("$.companyRegistrationNumber").value(DEFAULT_COMPANY_REGISTRATION_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeer() throws Exception {
        // Get the employeer
        restEmployeerMockMvc.perform(get("/api/employeers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeer() throws Exception {
        // Initialize the database
        employeerRepository.saveAndFlush(employeer);
        int databaseSizeBeforeUpdate = employeerRepository.findAll().size();

        // Update the employeer
        Employeer updatedEmployeer = employeerRepository.findOne(employeer.getId());
        // Disconnect from session so that the updates on updatedEmployeer are not directly saved in db
        em.detach(updatedEmployeer);
        updatedEmployeer
            .employeerName(UPDATED_EMPLOYEER_NAME)
            .lastActive(UPDATED_LAST_ACTIVE)
            .companyRegistrationNumber(UPDATED_COMPANY_REGISTRATION_NUMBER);

        restEmployeerMockMvc.perform(put("/api/employeers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployeer)))
            .andExpect(status().isOk());

        // Validate the Employeer in the database
        List<Employeer> employeerList = employeerRepository.findAll();
        assertThat(employeerList).hasSize(databaseSizeBeforeUpdate);
        Employeer testEmployeer = employeerList.get(employeerList.size() - 1);
        assertThat(testEmployeer.getEmployeerName()).isEqualTo(UPDATED_EMPLOYEER_NAME);
        assertThat(testEmployeer.getLastActive()).isEqualTo(UPDATED_LAST_ACTIVE);
        assertThat(testEmployeer.getCompanyRegistrationNumber()).isEqualTo(UPDATED_COMPANY_REGISTRATION_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeer() throws Exception {
        int databaseSizeBeforeUpdate = employeerRepository.findAll().size();

        // Create the Employeer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmployeerMockMvc.perform(put("/api/employeers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeer)))
            .andExpect(status().isCreated());

        // Validate the Employeer in the database
        List<Employeer> employeerList = employeerRepository.findAll();
        assertThat(employeerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmployeer() throws Exception {
        // Initialize the database
        employeerRepository.saveAndFlush(employeer);
        int databaseSizeBeforeDelete = employeerRepository.findAll().size();

        // Get the employeer
        restEmployeerMockMvc.perform(delete("/api/employeers/{id}", employeer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Employeer> employeerList = employeerRepository.findAll();
        assertThat(employeerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Employeer.class);
        Employeer employeer1 = new Employeer();
        employeer1.setId(1L);
        Employeer employeer2 = new Employeer();
        employeer2.setId(employeer1.getId());
        assertThat(employeer1).isEqualTo(employeer2);
        employeer2.setId(2L);
        assertThat(employeer1).isNotEqualTo(employeer2);
        employeer1.setId(null);
        assertThat(employeer1).isNotEqualTo(employeer2);
    }
}
