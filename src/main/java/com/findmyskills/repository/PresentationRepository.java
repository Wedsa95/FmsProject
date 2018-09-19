package com.findmyskills.repository;

import com.findmyskills.domain.Presentation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Presentation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresentationRepository extends JpaRepository<Presentation, Long> {

}
