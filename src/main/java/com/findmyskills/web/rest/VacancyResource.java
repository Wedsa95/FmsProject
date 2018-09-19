package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.Vacancy;

import com.findmyskills.repository.VacancyRepository;
import com.findmyskills.web.rest.errors.BadRequestAlertException;
import com.findmyskills.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Vacancy.
 */
@RestController
@RequestMapping("/api")
public class VacancyResource {

    private final Logger log = LoggerFactory.getLogger(VacancyResource.class);

    private static final String ENTITY_NAME = "vacancy";

    private final VacancyRepository vacancyRepository;

    public VacancyResource(VacancyRepository vacancyRepository) {
        this.vacancyRepository = vacancyRepository;
    }

    /**
     * POST  /vacancies : Create a new vacancy.
     *
     * @param vacancy the vacancy to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vacancy, or with status 400 (Bad Request) if the vacancy has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vacancies")
    @Timed
    public ResponseEntity<Vacancy> createVacancy(@RequestBody Vacancy vacancy) throws URISyntaxException {
        log.debug("REST request to save Vacancy : {}", vacancy);
        if (vacancy.getId() != null) {
            throw new BadRequestAlertException("A new vacancy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vacancy result = vacancyRepository.save(vacancy);
        return ResponseEntity.created(new URI("/api/vacancies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vacancies : Updates an existing vacancy.
     *
     * @param vacancy the vacancy to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vacancy,
     * or with status 400 (Bad Request) if the vacancy is not valid,
     * or with status 500 (Internal Server Error) if the vacancy couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vacancies")
    @Timed
    public ResponseEntity<Vacancy> updateVacancy(@RequestBody Vacancy vacancy) throws URISyntaxException {
        log.debug("REST request to update Vacancy : {}", vacancy);
        if (vacancy.getId() == null) {
            return createVacancy(vacancy);
        }
        Vacancy result = vacancyRepository.save(vacancy);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vacancy.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vacancies : get all the vacancies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vacancies in body
     */
    @GetMapping("/vacancies")
    @Timed
    public List<Vacancy> getAllVacancies() {
        log.debug("REST request to get all Vacancies");
        return vacancyRepository.findAll();
        }

    /**
     * GET  /vacancies/:id : get the "id" vacancy.
     *
     * @param id the id of the vacancy to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vacancy, or with status 404 (Not Found)
     */
    @GetMapping("/vacancies/{id}")
    @Timed
    public ResponseEntity<Vacancy> getVacancy(@PathVariable Long id) {
        log.debug("REST request to get Vacancy : {}", id);
        Vacancy vacancy = vacancyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vacancy));
    }

    /**
     * DELETE  /vacancies/:id : delete the "id" vacancy.
     *
     * @param id the id of the vacancy to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vacancies/{id}")
    @Timed
    public ResponseEntity<Void> deleteVacancy(@PathVariable Long id) {
        log.debug("REST request to delete Vacancy : {}", id);
        vacancyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
