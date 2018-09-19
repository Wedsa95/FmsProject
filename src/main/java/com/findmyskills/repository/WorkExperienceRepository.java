package com.findmyskills.repository;

import com.findmyskills.domain.WorkExperience;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WorkExperience entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {

}
