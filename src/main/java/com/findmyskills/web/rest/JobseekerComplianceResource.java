package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.JobseekerCompliance;

import com.findmyskills.repository.JobseekerComplianceRepository;
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
 * REST controller for managing JobseekerCompliance.
 */
@RestController
@RequestMapping("/api")
public class JobseekerComplianceResource {

    private final Logger log = LoggerFactory.getLogger(JobseekerComplianceResource.class);

    private static final String ENTITY_NAME = "jobseekerCompliance";

    private final JobseekerComplianceRepository jobseekerComplianceRepository;

    public JobseekerComplianceResource(JobseekerComplianceRepository jobseekerComplianceRepository) {
        this.jobseekerComplianceRepository = jobseekerComplianceRepository;
    }

    /**
     * POST  /jobseeker-compliances : Create a new jobseekerCompliance.
     *
     * @param jobseekerCompliance the jobseekerCompliance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobseekerCompliance, or with status 400 (Bad Request) if the jobseekerCompliance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jobseeker-compliances")
    @Timed
    public ResponseEntity<JobseekerCompliance> createJobseekerCompliance(@RequestBody JobseekerCompliance jobseekerCompliance) throws URISyntaxException {
        log.debug("REST request to save JobseekerCompliance : {}", jobseekerCompliance);
        if (jobseekerCompliance.getId() != null) {
            throw new BadRequestAlertException("A new jobseekerCompliance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobseekerCompliance result = jobseekerComplianceRepository.save(jobseekerCompliance);
        return ResponseEntity.created(new URI("/api/jobseeker-compliances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobseeker-compliances : Updates an existing jobseekerCompliance.
     *
     * @param jobseekerCompliance the jobseekerCompliance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobseekerCompliance,
     * or with status 400 (Bad Request) if the jobseekerCompliance is not valid,
     * or with status 500 (Internal Server Error) if the jobseekerCompliance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jobseeker-compliances")
    @Timed
    public ResponseEntity<JobseekerCompliance> updateJobseekerCompliance(@RequestBody JobseekerCompliance jobseekerCompliance) throws URISyntaxException {
        log.debug("REST request to update JobseekerCompliance : {}", jobseekerCompliance);
        if (jobseekerCompliance.getId() == null) {
            return createJobseekerCompliance(jobseekerCompliance);
        }
        JobseekerCompliance result = jobseekerComplianceRepository.save(jobseekerCompliance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobseekerCompliance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobseeker-compliances : get all the jobseekerCompliances.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobseekerCompliances in body
     */
    @GetMapping("/jobseeker-compliances")
    @Timed
    public List<JobseekerCompliance> getAllJobseekerCompliances() {
        log.debug("REST request to get all JobseekerCompliances");
        return jobseekerComplianceRepository.findAll();
        }

    /**
     * GET  /jobseeker-compliances/:id : get the "id" jobseekerCompliance.
     *
     * @param id the id of the jobseekerCompliance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobseekerCompliance, or with status 404 (Not Found)
     */
    @GetMapping("/jobseeker-compliances/{id}")
    @Timed
    public ResponseEntity<JobseekerCompliance> getJobseekerCompliance(@PathVariable Long id) {
        log.debug("REST request to get JobseekerCompliance : {}", id);
        JobseekerCompliance jobseekerCompliance = jobseekerComplianceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jobseekerCompliance));
    }

    /**
     * DELETE  /jobseeker-compliances/:id : delete the "id" jobseekerCompliance.
     *
     * @param id the id of the jobseekerCompliance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jobseeker-compliances/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobseekerCompliance(@PathVariable Long id) {
        log.debug("REST request to delete JobseekerCompliance : {}", id);
        jobseekerComplianceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
