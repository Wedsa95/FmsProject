package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.JobseekerVideo;

import com.findmyskills.repository.JobseekerVideoRepository;
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
 * REST controller for managing JobseekerVideo.
 */
@RestController
@RequestMapping("/api")
public class JobseekerVideoResource {

    private final Logger log = LoggerFactory.getLogger(JobseekerVideoResource.class);

    private static final String ENTITY_NAME = "jobseekerVideo";

    private final JobseekerVideoRepository jobseekerVideoRepository;

    public JobseekerVideoResource(JobseekerVideoRepository jobseekerVideoRepository) {
        this.jobseekerVideoRepository = jobseekerVideoRepository;
    }

    /**
     * POST  /jobseeker-videos : Create a new jobseekerVideo.
     *
     * @param jobseekerVideo the jobseekerVideo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobseekerVideo, or with status 400 (Bad Request) if the jobseekerVideo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jobseeker-videos")
    @Timed
    public ResponseEntity<JobseekerVideo> createJobseekerVideo(@RequestBody JobseekerVideo jobseekerVideo) throws URISyntaxException {
        log.debug("REST request to save JobseekerVideo : {}", jobseekerVideo);
        if (jobseekerVideo.getId() != null) {
            throw new BadRequestAlertException("A new jobseekerVideo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobseekerVideo result = jobseekerVideoRepository.save(jobseekerVideo);
        return ResponseEntity.created(new URI("/api/jobseeker-videos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobseeker-videos : Updates an existing jobseekerVideo.
     *
     * @param jobseekerVideo the jobseekerVideo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobseekerVideo,
     * or with status 400 (Bad Request) if the jobseekerVideo is not valid,
     * or with status 500 (Internal Server Error) if the jobseekerVideo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jobseeker-videos")
    @Timed
    public ResponseEntity<JobseekerVideo> updateJobseekerVideo(@RequestBody JobseekerVideo jobseekerVideo) throws URISyntaxException {
        log.debug("REST request to update JobseekerVideo : {}", jobseekerVideo);
        if (jobseekerVideo.getId() == null) {
            return createJobseekerVideo(jobseekerVideo);
        }
        JobseekerVideo result = jobseekerVideoRepository.save(jobseekerVideo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobseekerVideo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobseeker-videos : get all the jobseekerVideos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobseekerVideos in body
     */
    @GetMapping("/jobseeker-videos")
    @Timed
    public List<JobseekerVideo> getAllJobseekerVideos() {
        log.debug("REST request to get all JobseekerVideos");
        return jobseekerVideoRepository.findAll();
        }

    /**
     * GET  /jobseeker-videos/:id : get the "id" jobseekerVideo.
     *
     * @param id the id of the jobseekerVideo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobseekerVideo, or with status 404 (Not Found)
     */
    @GetMapping("/jobseeker-videos/{id}")
    @Timed
    public ResponseEntity<JobseekerVideo> getJobseekerVideo(@PathVariable Long id) {
        log.debug("REST request to get JobseekerVideo : {}", id);
        JobseekerVideo jobseekerVideo = jobseekerVideoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jobseekerVideo));
    }

    /**
     * DELETE  /jobseeker-videos/:id : delete the "id" jobseekerVideo.
     *
     * @param id the id of the jobseekerVideo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jobseeker-videos/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobseekerVideo(@PathVariable Long id) {
        log.debug("REST request to delete JobseekerVideo : {}", id);
        jobseekerVideoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
