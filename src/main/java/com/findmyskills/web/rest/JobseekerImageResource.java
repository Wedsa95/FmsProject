package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.JobseekerImage;

import com.findmyskills.repository.JobseekerImageRepository;
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
 * REST controller for managing JobseekerImage.
 */
@RestController
@RequestMapping("/api")
public class JobseekerImageResource {

    private final Logger log = LoggerFactory.getLogger(JobseekerImageResource.class);

    private static final String ENTITY_NAME = "jobseekerImage";

    private final JobseekerImageRepository jobseekerImageRepository;

    public JobseekerImageResource(JobseekerImageRepository jobseekerImageRepository) {
        this.jobseekerImageRepository = jobseekerImageRepository;
    }

    /**
     * POST  /jobseeker-images : Create a new jobseekerImage.
     *
     * @param jobseekerImage the jobseekerImage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobseekerImage, or with status 400 (Bad Request) if the jobseekerImage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jobseeker-images")
    @Timed
    public ResponseEntity<JobseekerImage> createJobseekerImage(@RequestBody JobseekerImage jobseekerImage) throws URISyntaxException {
        log.debug("REST request to save JobseekerImage : {}", jobseekerImage);
        if (jobseekerImage.getId() != null) {
            throw new BadRequestAlertException("A new jobseekerImage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobseekerImage result = jobseekerImageRepository.save(jobseekerImage);
        return ResponseEntity.created(new URI("/api/jobseeker-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobseeker-images : Updates an existing jobseekerImage.
     *
     * @param jobseekerImage the jobseekerImage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobseekerImage,
     * or with status 400 (Bad Request) if the jobseekerImage is not valid,
     * or with status 500 (Internal Server Error) if the jobseekerImage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jobseeker-images")
    @Timed
    public ResponseEntity<JobseekerImage> updateJobseekerImage(@RequestBody JobseekerImage jobseekerImage) throws URISyntaxException {
        log.debug("REST request to update JobseekerImage : {}", jobseekerImage);
        if (jobseekerImage.getId() == null) {
            return createJobseekerImage(jobseekerImage);
        }
        JobseekerImage result = jobseekerImageRepository.save(jobseekerImage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobseekerImage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobseeker-images : get all the jobseekerImages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobseekerImages in body
     */
    @GetMapping("/jobseeker-images")
    @Timed
    public List<JobseekerImage> getAllJobseekerImages() {
        log.debug("REST request to get all JobseekerImages");
        return jobseekerImageRepository.findAll();
        }

    /**
     * GET  /jobseeker-images/:id : get the "id" jobseekerImage.
     *
     * @param id the id of the jobseekerImage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobseekerImage, or with status 404 (Not Found)
     */
    @GetMapping("/jobseeker-images/{id}")
    @Timed
    public ResponseEntity<JobseekerImage> getJobseekerImage(@PathVariable Long id) {
        log.debug("REST request to get JobseekerImage : {}", id);
        JobseekerImage jobseekerImage = jobseekerImageRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jobseekerImage));
    }

    /**
     * DELETE  /jobseeker-images/:id : delete the "id" jobseekerImage.
     *
     * @param id the id of the jobseekerImage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jobseeker-images/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobseekerImage(@PathVariable Long id) {
        log.debug("REST request to delete JobseekerImage : {}", id);
        jobseekerImageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
