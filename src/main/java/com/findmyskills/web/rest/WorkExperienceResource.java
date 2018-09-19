package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.WorkExperience;

import com.findmyskills.repository.WorkExperienceRepository;
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
 * REST controller for managing WorkExperience.
 */
@RestController
@RequestMapping("/api")
public class WorkExperienceResource {

    private final Logger log = LoggerFactory.getLogger(WorkExperienceResource.class);

    private static final String ENTITY_NAME = "workExperience";

    private final WorkExperienceRepository workExperienceRepository;

    public WorkExperienceResource(WorkExperienceRepository workExperienceRepository) {
        this.workExperienceRepository = workExperienceRepository;
    }

    /**
     * POST  /work-experiences : Create a new workExperience.
     *
     * @param workExperience the workExperience to create
     * @return the ResponseEntity with status 201 (Created) and with body the new workExperience, or with status 400 (Bad Request) if the workExperience has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/work-experiences")
    @Timed
    public ResponseEntity<WorkExperience> createWorkExperience(@RequestBody WorkExperience workExperience) throws URISyntaxException {
        log.debug("REST request to save WorkExperience : {}", workExperience);
        if (workExperience.getId() != null) {
            throw new BadRequestAlertException("A new workExperience cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkExperience result = workExperienceRepository.save(workExperience);
        return ResponseEntity.created(new URI("/api/work-experiences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /work-experiences : Updates an existing workExperience.
     *
     * @param workExperience the workExperience to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated workExperience,
     * or with status 400 (Bad Request) if the workExperience is not valid,
     * or with status 500 (Internal Server Error) if the workExperience couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/work-experiences")
    @Timed
    public ResponseEntity<WorkExperience> updateWorkExperience(@RequestBody WorkExperience workExperience) throws URISyntaxException {
        log.debug("REST request to update WorkExperience : {}", workExperience);
        if (workExperience.getId() == null) {
            return createWorkExperience(workExperience);
        }
        WorkExperience result = workExperienceRepository.save(workExperience);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workExperience.getId().toString()))
            .body(result);
    }

    /**
     * GET  /work-experiences : get all the workExperiences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of workExperiences in body
     */
    @GetMapping("/work-experiences")
    @Timed
    public List<WorkExperience> getAllWorkExperiences() {
        log.debug("REST request to get all WorkExperiences");
        return workExperienceRepository.findAll();
        }

    /**
     * GET  /work-experiences/:id : get the "id" workExperience.
     *
     * @param id the id of the workExperience to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the workExperience, or with status 404 (Not Found)
     */
    @GetMapping("/work-experiences/{id}")
    @Timed
    public ResponseEntity<WorkExperience> getWorkExperience(@PathVariable Long id) {
        log.debug("REST request to get WorkExperience : {}", id);
        WorkExperience workExperience = workExperienceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(workExperience));
    }

    /**
     * DELETE  /work-experiences/:id : delete the "id" workExperience.
     *
     * @param id the id of the workExperience to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/work-experiences/{id}")
    @Timed
    public ResponseEntity<Void> deleteWorkExperience(@PathVariable Long id) {
        log.debug("REST request to delete WorkExperience : {}", id);
        workExperienceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
