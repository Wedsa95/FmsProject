package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.EmployeerImage;

import com.findmyskills.repository.EmployeerImageRepository;
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
 * REST controller for managing EmployeerImage.
 */
@RestController
@RequestMapping("/api")
public class EmployeerImageResource {

    private final Logger log = LoggerFactory.getLogger(EmployeerImageResource.class);

    private static final String ENTITY_NAME = "employeerImage";

    private final EmployeerImageRepository employeerImageRepository;

    public EmployeerImageResource(EmployeerImageRepository employeerImageRepository) {
        this.employeerImageRepository = employeerImageRepository;
    }

    /**
     * POST  /employeer-images : Create a new employeerImage.
     *
     * @param employeerImage the employeerImage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new employeerImage, or with status 400 (Bad Request) if the employeerImage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/employeer-images")
    @Timed
    public ResponseEntity<EmployeerImage> createEmployeerImage(@RequestBody EmployeerImage employeerImage) throws URISyntaxException {
        log.debug("REST request to save EmployeerImage : {}", employeerImage);
        if (employeerImage.getId() != null) {
            throw new BadRequestAlertException("A new employeerImage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeerImage result = employeerImageRepository.save(employeerImage);
        return ResponseEntity.created(new URI("/api/employeer-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /employeer-images : Updates an existing employeerImage.
     *
     * @param employeerImage the employeerImage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated employeerImage,
     * or with status 400 (Bad Request) if the employeerImage is not valid,
     * or with status 500 (Internal Server Error) if the employeerImage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/employeer-images")
    @Timed
    public ResponseEntity<EmployeerImage> updateEmployeerImage(@RequestBody EmployeerImage employeerImage) throws URISyntaxException {
        log.debug("REST request to update EmployeerImage : {}", employeerImage);
        if (employeerImage.getId() == null) {
            return createEmployeerImage(employeerImage);
        }
        EmployeerImage result = employeerImageRepository.save(employeerImage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, employeerImage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /employeer-images : get all the employeerImages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of employeerImages in body
     */
    @GetMapping("/employeer-images")
    @Timed
    public List<EmployeerImage> getAllEmployeerImages() {
        log.debug("REST request to get all EmployeerImages");
        return employeerImageRepository.findAll();
        }

    /**
     * GET  /employeer-images/:id : get the "id" employeerImage.
     *
     * @param id the id of the employeerImage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the employeerImage, or with status 404 (Not Found)
     */
    @GetMapping("/employeer-images/{id}")
    @Timed
    public ResponseEntity<EmployeerImage> getEmployeerImage(@PathVariable Long id) {
        log.debug("REST request to get EmployeerImage : {}", id);
        EmployeerImage employeerImage = employeerImageRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(employeerImage));
    }

    /**
     * DELETE  /employeer-images/:id : delete the "id" employeerImage.
     *
     * @param id the id of the employeerImage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/employeer-images/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmployeerImage(@PathVariable Long id) {
        log.debug("REST request to delete EmployeerImage : {}", id);
        employeerImageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
