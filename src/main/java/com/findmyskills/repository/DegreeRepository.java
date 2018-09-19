package com.findmyskills.repository;

import com.findmyskills.domain.Degree;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Degree entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DegreeRepository extends JpaRepository<Degree, Long> {

}
