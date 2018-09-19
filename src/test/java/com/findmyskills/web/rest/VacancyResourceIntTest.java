package com.findmyskills.web.rest;

import com.findmyskills.FmsApp;

import com.findmyskills.domain.Vacancy;
import com.findmyskills.repository.VacancyRepository;
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
import org.springframework.util.Base64Utils;

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
 * Test class for the VacancyResource REST controller.
 *
 * @see VacancyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FmsApp.class)
public class VacancyResourceIntTest {

    private static final LocalDate DEFAULT_UPLOAD_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPLOAD_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_VACANCIE_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_VACANCIE_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_JOB_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_JOB_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ASPIRANT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_ASPIRANT_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ABOUT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_ABOUT_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_PERSON = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_PERSON = "BBBBBBBBBB";

    @Autowired
    private VacancyRepository vacancyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVacancyMockMvc;

    private Vacancy vacancy;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VacancyResource vacancyResource = new VacancyResource(vacancyRepository);
        this.restVacancyMockMvc = MockMvcBuilders.standaloneSetup(vacancyResource)
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
    public static Vacancy createEntity(EntityManager em) {
        Vacancy vacancy = new Vacancy()
            .uploadDate(DEFAULT_UPLOAD_DATE)
            .vacancieRole(DEFAULT_VACANCIE_ROLE)
            .jobDescription(DEFAULT_JOB_DESCRIPTION)
            .aspirantDescription(DEFAULT_ASPIRANT_DESCRIPTION)
            .aboutDescription(DEFAULT_ABOUT_DESCRIPTION)
            .contactPerson(DEFAULT_CONTACT_PERSON);
        return vacancy;
    }

    @Before
    public void initTest() {
        vacancy = createEntity(em);
    }

    @Test
    @Transactional
    public void createVacancy() throws Exception {
        int databaseSizeBeforeCreate = vacancyRepository.findAll().size();

        // Create the Vacancy
        restVacancyMockMvc.perform(post("/api/vacancies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacancy)))
            .andExpect(status().isCreated());

        // Validate the Vacancy in the database
        List<Vacancy> vacancyList = vacancyRepository.findAll();
        assertThat(vacancyList).hasSize(databaseSizeBeforeCreate + 1);
        Vacancy testVacancy = vacancyList.get(vacancyList.size() - 1);
        assertThat(testVacancy.getUploadDate()).isEqualTo(DEFAULT_UPLOAD_DATE);
        assertThat(testVacancy.getVacancieRole()).isEqualTo(DEFAULT_VACANCIE_ROLE);
        assertThat(testVacancy.getJobDescription()).isEqualTo(DEFAULT_JOB_DESCRIPTION);
        assertThat(testVacancy.getAspirantDescription()).isEqualTo(DEFAULT_ASPIRANT_DESCRIPTION);
        assertThat(testVacancy.getAboutDescription()).isEqualTo(DEFAULT_ABOUT_DESCRIPTION);
        assertThat(testVacancy.getContactPerson()).isEqualTo(DEFAULT_CONTACT_PERSON);
    }

    @Test
    @Transactional
    public void createVacancyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vacancyRepository.findAll().size();

        // Create the Vacancy with an existing ID
        vacancy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVacancyMockMvc.perform(post("/api/vacancies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacancy)))
            .andExpect(status().isBadRequest());

        // Validate the Vacancy in the database
        List<Vacancy> vacancyList = vacancyRepository.findAll();
        assertThat(vacancyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVacancies() throws Exception {
        // Initialize the database
        vacancyRepository.saveAndFlush(vacancy);

        // Get all the vacancyList
        restVacancyMockMvc.perform(get("/api/vacancies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vacancy.getId().intValue())))
            .andExpect(jsonPath("$.[*].uploadDate").value(hasItem(DEFAULT_UPLOAD_DATE.toString())))
            .andExpect(jsonPath("$.[*].vacancieRole").value(hasItem(DEFAULT_VACANCIE_ROLE.toString())))
            .andExpect(jsonPath("$.[*].jobDescription").value(hasItem(DEFAULT_JOB_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].aspirantDescription").value(hasItem(DEFAULT_ASPIRANT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].aboutDescription").value(hasItem(DEFAULT_ABOUT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].contactPerson").value(hasItem(DEFAULT_CONTACT_PERSON.toString())));
    }

    @Test
    @Transactional
    public void getVacancy() throws Exception {
        // Initialize the database
        vacancyRepository.saveAndFlush(vacancy);

        // Get the vacancy
        restVacancyMockMvc.perform(get("/api/vacancies/{id}", vacancy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vacancy.getId().intValue()))
            .andExpect(jsonPath("$.uploadDate").value(DEFAULT_UPLOAD_DATE.toString()))
            .andExpect(jsonPath("$.vacancieRole").value(DEFAULT_VACANCIE_ROLE.toString()))
            .andExpect(jsonPath("$.jobDescription").value(DEFAULT_JOB_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.aspirantDescription").value(DEFAULT_ASPIRANT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.aboutDescription").value(DEFAULT_ABOUT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.contactPerson").value(DEFAULT_CONTACT_PERSON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVacancy() throws Exception {
        // Get the vacancy
        restVacancyMockMvc.perform(get("/api/vacancies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVacancy() throws Exception {
        // Initialize the database
        vacancyRepository.saveAndFlush(vacancy);
        int databaseSizeBeforeUpdate = vacancyRepository.findAll().size();

        // Update the vacancy
        Vacancy updatedVacancy = vacancyRepository.findOne(vacancy.getId());
        // Disconnect from session so that the updates on updatedVacancy are not directly saved in db
        em.detach(updatedVacancy);
        updatedVacancy
            .uploadDate(UPDATED_UPLOAD_DATE)
            .vacancieRole(UPDATED_VACANCIE_ROLE)
            .jobDescription(UPDATED_JOB_DESCRIPTION)
            .aspirantDescription(UPDATED_ASPIRANT_DESCRIPTION)
            .aboutDescription(UPDATED_ABOUT_DESCRIPTION)
            .contactPerson(UPDATED_CONTACT_PERSON);

        restVacancyMockMvc.perform(put("/api/vacancies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVacancy)))
            .andExpect(status().isOk());

        // Validate the Vacancy in the database
        List<Vacancy> vacancyList = vacancyRepository.findAll();
        assertThat(vacancyList).hasSize(databaseSizeBeforeUpdate);
        Vacancy testVacancy = vacancyList.get(vacancyList.size() - 1);
        assertThat(testVacancy.getUploadDate()).isEqualTo(UPDATED_UPLOAD_DATE);
        assertThat(testVacancy.getVacancieRole()).isEqualTo(UPDATED_VACANCIE_ROLE);
        assertThat(testVacancy.getJobDescription()).isEqualTo(UPDATED_JOB_DESCRIPTION);
        assertThat(testVacancy.getAspirantDescription()).isEqualTo(UPDATED_ASPIRANT_DESCRIPTION);
        assertThat(testVacancy.getAboutDescription()).isEqualTo(UPDATED_ABOUT_DESCRIPTION);
        assertThat(testVacancy.getContactPerson()).isEqualTo(UPDATED_CONTACT_PERSON);
    }

    @Test
    @Transactional
    public void updateNonExistingVacancy() throws Exception {
        int databaseSizeBeforeUpdate = vacancyRepository.findAll().size();

        // Create the Vacancy

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVacancyMockMvc.perform(put("/api/vacancies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacancy)))
            .andExpect(status().isCreated());

        // Validate the Vacancy in the database
        List<Vacancy> vacancyList = vacancyRepository.findAll();
        assertThat(vacancyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVacancy() throws Exception {
        // Initialize the database
        vacancyRepository.saveAndFlush(vacancy);
        int databaseSizeBeforeDelete = vacancyRepository.findAll().size();

        // Get the vacancy
        restVacancyMockMvc.perform(delete("/api/vacancies/{id}", vacancy.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vacancy> vacancyList = vacancyRepository.findAll();
        assertThat(vacancyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vacancy.class);
        Vacancy vacancy1 = new Vacancy();
        vacancy1.setId(1L);
        Vacancy vacancy2 = new Vacancy();
        vacancy2.setId(vacancy1.getId());
        assertThat(vacancy1).isEqualTo(vacancy2);
        vacancy2.setId(2L);
        assertThat(vacancy1).isNotEqualTo(vacancy2);
        vacancy1.setId(null);
        assertThat(vacancy1).isNotEqualTo(vacancy2);
    }
}
