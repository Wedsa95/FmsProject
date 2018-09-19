package com.findmyskills.repository;

import com.findmyskills.domain.JobseekerCompliance;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JobseekerCompliance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobseekerComplianceRepository extends JpaRepository<JobseekerCompliance, Long> {

}
