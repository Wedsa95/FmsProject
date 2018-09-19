package com.findmyskills.repository;

import com.findmyskills.domain.EmployeerCompliance;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmployeerCompliance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeerComplianceRepository extends JpaRepository<EmployeerCompliance, Long> {

}
