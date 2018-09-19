package com.findmyskills.repository;

import com.findmyskills.domain.Extent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Extent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtentRepository extends JpaRepository<Extent, Long> {

}
