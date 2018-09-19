package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.Education;

import com.findmyskills.repository.EducationRepository;
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
 * REST controller for managing Education.
 */
@RestController
@RequestMapping("/api")
public class EducationResource {

    private final Logger log = LoggerFactory.getLogger(EducationResource.class);

    private static final String ENTITY_NAME = "education";

    private final EducationRepository educationRepository;

    public EducationResource(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    /**
     * POST  /educations : Create a new education.
     *
     * @param education the education to create
     * @return the ResponseEntity with status 201 (Created) and with body the new education, or with status 400 (Bad Request) if the education has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/educations")
    @Timed
    public ResponseEntity<Education> createEducation(@RequestBody Education education) throws URISyntaxException {
        log.debug("REST request to save Education : {}", education);
        if (education.getId() != null) {
            throw new BadRequestAlertException("A new education cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Education result = educationRepository.save(education);
        return ResponseEntity.created(new URI("/api/educations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /educations : Updates an existing education.
     *
     * @param education the education to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated education,
     * or with status 400 (Bad Request) if the education is not valid,
     * or with status 500 (Internal Server Error) if the education couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/educations")
    @Timed
    public ResponseEntity<Education> updateEducation(@RequestBody Education education) throws URISyntaxException {
        log.debug("REST request to update Education : {}", education);
        if (education.getId() == null) {
            return createEducation(education);
        }
        Education result = educationRepository.save(education);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, education.getId().toString()))
            .body(result);
    }

    /**
     * GET  /educations : get all the educations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of educations in body
     */
    @GetMapping("/educations")
    @Timed
    public List<Education> getAllEducations() {
        log.debug("REST request to get all Educations");
        return educationRepository.findAll();
        }

    /**
     * GET  /educations/:id : get the "id" education.
     *
     * @param id the id of the education to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the education, or with status 404 (Not Found)
     */
    @GetMapping("/educations/{id}")
    @Timed
    public ResponseEntity<Education> getEducation(@PathVariable Long id) {
        log.debug("REST request to get Education : {}", id);
        Education education = educationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(education));
    }

    /**
     * DELETE  /educations/:id : delete the "id" education.
     *
     * @param id the id of the education to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/educations/{id}")
    @Timed
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        log.debug("REST request to delete Education : {}", id);
        educationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
