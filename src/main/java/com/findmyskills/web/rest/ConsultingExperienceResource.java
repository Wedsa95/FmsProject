package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.ConsultingExperience;

import com.findmyskills.repository.ConsultingExperienceRepository;
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
 * REST controller for managing ConsultingExperience.
 */
@RestController
@RequestMapping("/api")
public class ConsultingExperienceResource {

    private final Logger log = LoggerFactory.getLogger(ConsultingExperienceResource.class);

    private static final String ENTITY_NAME = "consultingExperience";

    private final ConsultingExperienceRepository consultingExperienceRepository;

    public ConsultingExperienceResource(ConsultingExperienceRepository consultingExperienceRepository) {
        this.consultingExperienceRepository = consultingExperienceRepository;
    }

    /**
     * POST  /consulting-experiences : Create a new consultingExperience.
     *
     * @param consultingExperience the consultingExperience to create
     * @return the ResponseEntity with status 201 (Created) and with body the new consultingExperience, or with status 400 (Bad Request) if the consultingExperience has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/consulting-experiences")
    @Timed
    public ResponseEntity<ConsultingExperience> createConsultingExperience(@RequestBody ConsultingExperience consultingExperience) throws URISyntaxException {
        log.debug("REST request to save ConsultingExperience : {}", consultingExperience);
        if (consultingExperience.getId() != null) {
            throw new BadRequestAlertException("A new consultingExperience cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsultingExperience result = consultingExperienceRepository.save(consultingExperience);
        return ResponseEntity.created(new URI("/api/consulting-experiences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /consulting-experiences : Updates an existing consultingExperience.
     *
     * @param consultingExperience the consultingExperience to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated consultingExperience,
     * or with status 400 (Bad Request) if the consultingExperience is not valid,
     * or with status 500 (Internal Server Error) if the consultingExperience couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/consulting-experiences")
    @Timed
    public ResponseEntity<ConsultingExperience> updateConsultingExperience(@RequestBody ConsultingExperience consultingExperience) throws URISyntaxException {
        log.debug("REST request to update ConsultingExperience : {}", consultingExperience);
        if (consultingExperience.getId() == null) {
            return createConsultingExperience(consultingExperience);
        }
        ConsultingExperience result = consultingExperienceRepository.save(consultingExperience);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, consultingExperience.getId().toString()))
            .body(result);
    }

    /**
     * GET  /consulting-experiences : get all the consultingExperiences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of consultingExperiences in body
     */
    @GetMapping("/consulting-experiences")
    @Timed
    public List<ConsultingExperience> getAllConsultingExperiences() {
        log.debug("REST request to get all ConsultingExperiences");
        return consultingExperienceRepository.findAll();
        }

    /**
     * GET  /consulting-experiences/:id : get the "id" consultingExperience.
     *
     * @param id the id of the consultingExperience to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the consultingExperience, or with status 404 (Not Found)
     */
    @GetMapping("/consulting-experiences/{id}")
    @Timed
    public ResponseEntity<ConsultingExperience> getConsultingExperience(@PathVariable Long id) {
        log.debug("REST request to get ConsultingExperience : {}", id);
        ConsultingExperience consultingExperience = consultingExperienceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(consultingExperience));
    }

    /**
     * DELETE  /consulting-experiences/:id : delete the "id" consultingExperience.
     *
     * @param id the id of the consultingExperience to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/consulting-experiences/{id}")
    @Timed
    public ResponseEntity<Void> deleteConsultingExperience(@PathVariable Long id) {
        log.debug("REST request to delete ConsultingExperience : {}", id);
        consultingExperienceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
