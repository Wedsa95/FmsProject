package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.Employeer;

import com.findmyskills.repository.EmployeerRepository;
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
 * REST controller for managing Employeer.
 */
@RestController
@RequestMapping("/api")
public class EmployeerResource {

    private final Logger log = LoggerFactory.getLogger(EmployeerResource.class);

    private static final String ENTITY_NAME = "employeer";

    private final EmployeerRepository employeerRepository;

    public EmployeerResource(EmployeerRepository employeerRepository) {
        this.employeerRepository = employeerRepository;
    }

    /**
     * POST  /employeers : Create a new employeer.
     *
     * @param employeer the employeer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new employeer, or with status 400 (Bad Request) if the employeer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/employeers")
    @Timed
    public ResponseEntity<Employeer> createEmployeer(@RequestBody Employeer employeer) throws URISyntaxException {
        log.debug("REST request to save Employeer : {}", employeer);
        if (employeer.getId() != null) {
            throw new BadRequestAlertException("A new employeer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Employeer result = employeerRepository.save(employeer);
        return ResponseEntity.created(new URI("/api/employeers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /employeers : Updates an existing employeer.
     *
     * @param employeer the employeer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated employeer,
     * or with status 400 (Bad Request) if the employeer is not valid,
     * or with status 500 (Internal Server Error) if the employeer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/employeers")
    @Timed
    public ResponseEntity<Employeer> updateEmployeer(@RequestBody Employeer employeer) throws URISyntaxException {
        log.debug("REST request to update Employeer : {}", employeer);
        if (employeer.getId() == null) {
            return createEmployeer(employeer);
        }
        Employeer result = employeerRepository.save(employeer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, employeer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /employeers : get all the employeers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of employeers in body
     */
    @GetMapping("/employeers")
    @Timed
    public List<Employeer> getAllEmployeers() {
        log.debug("REST request to get all Employeers");
        return employeerRepository.findAll();
        }

    /**
     * GET  /employeers/:id : get the "id" employeer.
     *
     * @param id the id of the employeer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the employeer, or with status 404 (Not Found)
     */
    @GetMapping("/employeers/{id}")
    @Timed
    public ResponseEntity<Employeer> getEmployeer(@PathVariable Long id) {
        log.debug("REST request to get Employeer : {}", id);
        Employeer employeer = employeerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(employeer));
    }

    /**
     * DELETE  /employeers/:id : delete the "id" employeer.
     *
     * @param id the id of the employeer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/employeers/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmployeer(@PathVariable Long id) {
        log.debug("REST request to delete Employeer : {}", id);
        employeerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
