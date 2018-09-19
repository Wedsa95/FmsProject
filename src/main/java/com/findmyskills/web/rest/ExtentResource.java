package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.Extent;

import com.findmyskills.repository.ExtentRepository;
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
 * REST controller for managing Extent.
 */
@RestController
@RequestMapping("/api")
public class ExtentResource {

    private final Logger log = LoggerFactory.getLogger(ExtentResource.class);

    private static final String ENTITY_NAME = "extent";

    private final ExtentRepository extentRepository;

    public ExtentResource(ExtentRepository extentRepository) {
        this.extentRepository = extentRepository;
    }

    /**
     * POST  /extents : Create a new extent.
     *
     * @param extent the extent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new extent, or with status 400 (Bad Request) if the extent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/extents")
    @Timed
    public ResponseEntity<Extent> createExtent(@RequestBody Extent extent) throws URISyntaxException {
        log.debug("REST request to save Extent : {}", extent);
        if (extent.getId() != null) {
            throw new BadRequestAlertException("A new extent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Extent result = extentRepository.save(extent);
        return ResponseEntity.created(new URI("/api/extents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /extents : Updates an existing extent.
     *
     * @param extent the extent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated extent,
     * or with status 400 (Bad Request) if the extent is not valid,
     * or with status 500 (Internal Server Error) if the extent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/extents")
    @Timed
    public ResponseEntity<Extent> updateExtent(@RequestBody Extent extent) throws URISyntaxException {
        log.debug("REST request to update Extent : {}", extent);
        if (extent.getId() == null) {
            return createExtent(extent);
        }
        Extent result = extentRepository.save(extent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, extent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /extents : get all the extents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of extents in body
     */
    @GetMapping("/extents")
    @Timed
    public List<Extent> getAllExtents() {
        log.debug("REST request to get all Extents");
        return extentRepository.findAll();
        }

    /**
     * GET  /extents/:id : get the "id" extent.
     *
     * @param id the id of the extent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the extent, or with status 404 (Not Found)
     */
    @GetMapping("/extents/{id}")
    @Timed
    public ResponseEntity<Extent> getExtent(@PathVariable Long id) {
        log.debug("REST request to get Extent : {}", id);
        Extent extent = extentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(extent));
    }

    /**
     * DELETE  /extents/:id : delete the "id" extent.
     *
     * @param id the id of the extent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/extents/{id}")
    @Timed
    public ResponseEntity<Void> deleteExtent(@PathVariable Long id) {
        log.debug("REST request to delete Extent : {}", id);
        extentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
