package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.EmployeerCompliance;

import com.findmyskills.repository.EmployeerComplianceRepository;
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
 * REST controller for managing EmployeerCompliance.
 */
@RestController
@RequestMapping("/api")
public class EmployeerComplianceResource {

    private final Logger log = LoggerFactory.getLogger(EmployeerComplianceResource.class);

    private static final String ENTITY_NAME = "employeerCompliance";

    private final EmployeerComplianceRepository employeerComplianceRepository;

    public EmployeerComplianceResource(EmployeerComplianceRepository employeerComplianceRepository) {
        this.employeerComplianceRepository = employeerComplianceRepository;
    }

    /**
     * POST  /employeer-compliances : Create a new employeerCompliance.
     *
     * @param employeerCompliance the employeerCompliance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new employeerCompliance, or with status 400 (Bad Request) if the employeerCompliance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/employeer-compliances")
    @Timed
    public ResponseEntity<EmployeerCompliance> createEmployeerCompliance(@RequestBody EmployeerCompliance employeerCompliance) throws URISyntaxException {
        log.debug("REST request to save EmployeerCompliance : {}", employeerCompliance);
        if (employeerCompliance.getId() != null) {
            throw new BadRequestAlertException("A new employeerCompliance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeerCompliance result = employeerComplianceRepository.save(employeerCompliance);
        return ResponseEntity.created(new URI("/api/employeer-compliances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /employeer-compliances : Updates an existing employeerCompliance.
     *
     * @param employeerCompliance the employeerCompliance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated employeerCompliance,
     * or with status 400 (Bad Request) if the employeerCompliance is not valid,
     * or with status 500 (Internal Server Error) if the employeerCompliance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/employeer-compliances")
    @Timed
    public ResponseEntity<EmployeerCompliance> updateEmployeerCompliance(@RequestBody EmployeerCompliance employeerCompliance) throws URISyntaxException {
        log.debug("REST request to update EmployeerCompliance : {}", employeerCompliance);
        if (employeerCompliance.getId() == null) {
            return createEmployeerCompliance(employeerCompliance);
        }
        EmployeerCompliance result = employeerComplianceRepository.save(employeerCompliance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, employeerCompliance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /employeer-compliances : get all the employeerCompliances.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of employeerCompliances in body
     */
    @GetMapping("/employeer-compliances")
    @Timed
    public List<EmployeerCompliance> getAllEmployeerCompliances() {
        log.debug("REST request to get all EmployeerCompliances");
        return employeerComplianceRepository.findAll();
        }

    /**
     * GET  /employeer-compliances/:id : get the "id" employeerCompliance.
     *
     * @param id the id of the employeerCompliance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the employeerCompliance, or with status 404 (Not Found)
     */
    @GetMapping("/employeer-compliances/{id}")
    @Timed
    public ResponseEntity<EmployeerCompliance> getEmployeerCompliance(@PathVariable Long id) {
        log.debug("REST request to get EmployeerCompliance : {}", id);
        EmployeerCompliance employeerCompliance = employeerComplianceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(employeerCompliance));
    }

    /**
     * DELETE  /employeer-compliances/:id : delete the "id" employeerCompliance.
     *
     * @param id the id of the employeerCompliance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/employeer-compliances/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmployeerCompliance(@PathVariable Long id) {
        log.debug("REST request to delete EmployeerCompliance : {}", id);
        employeerComplianceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
