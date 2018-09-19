package com.findmyskills.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.findmyskills.domain.Presentation;

import com.findmyskills.repository.PresentationRepository;
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
 * REST controller for managing Presentation.
 */
@RestController
@RequestMapping("/api")
public class PresentationResource {

    private final Logger log = LoggerFactory.getLogger(PresentationResource.class);

    private static final String ENTITY_NAME = "presentation";

    private final PresentationRepository presentationRepository;

    public PresentationResource(PresentationRepository presentationRepository) {
        this.presentationRepository = presentationRepository;
    }

    /**
     * POST  /presentations : Create a new presentation.
     *
     * @param presentation the presentation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new presentation, or with status 400 (Bad Request) if the presentation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/presentations")
    @Timed
    public ResponseEntity<Presentation> createPresentation(@RequestBody Presentation presentation) throws URISyntaxException {
        log.debug("REST request to save Presentation : {}", presentation);
        if (presentation.getId() != null) {
            throw new BadRequestAlertException("A new presentation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Presentation result = presentationRepository.save(presentation);
        return ResponseEntity.created(new URI("/api/presentations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /presentations : Updates an existing presentation.
     *
     * @param presentation the presentation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated presentation,
     * or with status 400 (Bad Request) if the presentation is not valid,
     * or with status 500 (Internal Server Error) if the presentation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/presentations")
    @Timed
    public ResponseEntity<Presentation> updatePresentation(@RequestBody Presentation presentation) throws URISyntaxException {
        log.debug("REST request to update Presentation : {}", presentation);
        if (presentation.getId() == null) {
            return createPresentation(presentation);
        }
        Presentation result = presentationRepository.save(presentation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, presentation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /presentations : get all the presentations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of presentations in body
     */
    @GetMapping("/presentations")
    @Timed
    public List<Presentation> getAllPresentations() {
        log.debug("REST request to get all Presentations");
        return presentationRepository.findAll();
        }

    /**
     * GET  /presentations/:id : get the "id" presentation.
     *
     * @param id the id of the presentation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the presentation, or with status 404 (Not Found)
     */
    @GetMapping("/presentations/{id}")
    @Timed
    public ResponseEntity<Presentation> getPresentation(@PathVariable Long id) {
        log.debug("REST request to get Presentation : {}", id);
        Presentation presentation = presentationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(presentation));
    }

    /**
     * DELETE  /presentations/:id : delete the "id" presentation.
     *
     * @param id the id of the presentation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/presentations/{id}")
    @Timed
    public ResponseEntity<Void> deletePresentation(@PathVariable Long id) {
        log.debug("REST request to delete Presentation : {}", id);
        presentationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
