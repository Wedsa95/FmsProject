package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.Jobseeker;

import com.findmyskills.repository.JobseekerRepository;
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
 * REST controller for managing Jobseeker.
 */
@RestController
@RequestMapping("/api")
public class JobseekerResource {

    private final Logger log = LoggerFactory.getLogger(JobseekerResource.class);

    private static final String ENTITY_NAME = "jobseeker";

    private final JobseekerRepository jobseekerRepository;

    public JobseekerResource(JobseekerRepository jobseekerRepository) {
        this.jobseekerRepository = jobseekerRepository;
    }

    /**
     * POST  /jobseekers : Create a new jobseeker.
     *
     * @param jobseeker the jobseeker to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobseeker, or with status 400 (Bad Request) if the jobseeker has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jobseekers")
    @Timed
    public ResponseEntity<Jobseeker> createJobseeker(@RequestBody Jobseeker jobseeker) throws URISyntaxException {
        log.debug("REST request to save Jobseeker : {}", jobseeker);
        if (jobseeker.getId() != null) {
            throw new BadRequestAlertException("A new jobseeker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Jobseeker result = jobseekerRepository.save(jobseeker);
        return ResponseEntity.created(new URI("/api/jobseekers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobseekers : Updates an existing jobseeker.
     *
     * @param jobseeker the jobseeker to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobseeker,
     * or with status 400 (Bad Request) if the jobseeker is not valid,
     * or with status 500 (Internal Server Error) if the jobseeker couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jobseekers")
    @Timed
    public ResponseEntity<Jobseeker> updateJobseeker(@RequestBody Jobseeker jobseeker) throws URISyntaxException {
        log.debug("REST request to update Jobseeker : {}", jobseeker);
        if (jobseeker.getId() == null) {
            return createJobseeker(jobseeker);
        }
        Jobseeker result = jobseekerRepository.save(jobseeker);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobseeker.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobseekers : get all the jobseekers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobseekers in body
     */
    @GetMapping("/jobseekers")
    @Timed
    public List<Jobseeker> getAllJobseekers() {
        log.debug("REST request to get all Jobseekers");
        return jobseekerRepository.findAll();
        }

    /**
     * GET  /jobseekers/:id : get the "id" jobseeker.
     *
     * @param id the id of the jobseeker to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobseeker, or with status 404 (Not Found)
     */
    @GetMapping("/jobseekers/{id}")
    @Timed
    public ResponseEntity<Jobseeker> getJobseeker(@PathVariable Long id) {
        log.debug("REST request to get Jobseeker : {}", id);
        Jobseeker jobseeker = jobseekerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jobseeker));
    }
    
    /**
     * GET  /jobseeker : the current jobseeker.
     *
     * @param id the id of the jobseeker to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobseeker, or with status 404 (Not Found)
     */
    @GetMapping("/jobseeker")
    @Timed
    public ResponseEntity<Jobseeker> getCurrentUserJobseeker() {
    	Jobseeker jobseeker = jobseekerRepository.findByUserIsCurrentUser();
        log.debug("REST request to get Jobseeker : {}");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jobseeker));
    }

    /**
     * DELETE  /jobseekers/:id : delete the "id" jobseeker.
     *
     * @param id the id of the jobseeker to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jobseekers/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobseeker(@PathVariable Long id) {
        log.debug("REST request to delete Jobseeker : {}", id);
        jobseekerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
