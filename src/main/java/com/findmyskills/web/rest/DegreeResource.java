package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.Degree;

import com.findmyskills.repository.DegreeRepository;
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
 * REST controller for managing Degree.
 */
@RestController
@RequestMapping("/api")
public class DegreeResource {

    private final Logger log = LoggerFactory.getLogger(DegreeResource.class);

    private static final String ENTITY_NAME = "degree";

    private final DegreeRepository degreeRepository;

    public DegreeResource(DegreeRepository degreeRepository) {
        this.degreeRepository = degreeRepository;
    }

    /**
     * POST  /degrees : Create a new degree.
     *
     * @param degree the degree to create
     * @return the ResponseEntity with status 201 (Created) and with body the new degree, or with status 400 (Bad Request) if the degree has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/degrees")
    @Timed
    public ResponseEntity<Degree> createDegree(@RequestBody Degree degree) throws URISyntaxException {
        log.debug("REST request to save Degree : {}", degree);
        if (degree.getId() != null) {
            throw new BadRequestAlertException("A new degree cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Degree result = degreeRepository.save(degree);
        return ResponseEntity.created(new URI("/api/degrees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /degrees : Updates an existing degree.
     *
     * @param degree the degree to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated degree,
     * or with status 400 (Bad Request) if the degree is not valid,
     * or with status 500 (Internal Server Error) if the degree couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/degrees")
    @Timed
    public ResponseEntity<Degree> updateDegree(@RequestBody Degree degree) throws URISyntaxException {
        log.debug("REST request to update Degree : {}", degree);
        if (degree.getId() == null) {
            return createDegree(degree);
        }
        Degree result = degreeRepository.save(degree);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, degree.getId().toString()))
            .body(result);
    }

    /**
     * GET  /degrees : get all the degrees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of degrees in body
     */
    @GetMapping("/degrees")
    @Timed
    public List<Degree> getAllDegrees() {
        log.debug("REST request to get all Degrees");
        return degreeRepository.findAll();
        }

    /**
     * GET  /degrees/:id : get the "id" degree.
     *
     * @param id the id of the degree to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the degree, or with status 404 (Not Found)
     */
    @GetMapping("/degrees/{id}")
    @Timed
    public ResponseEntity<Degree> getDegree(@PathVariable Long id) {
        log.debug("REST request to get Degree : {}", id);
        Degree degree = degreeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(degree));
    }

    /**
     * DELETE  /degrees/:id : delete the "id" degree.
     *
     * @param id the id of the degree to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/degrees/{id}")
    @Timed
    public ResponseEntity<Void> deleteDegree(@PathVariable Long id) {
        log.debug("REST request to delete Degree : {}", id);
        degreeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
