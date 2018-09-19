package com.findmyskills.repository;

import com.findmyskills.domain.Employeer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Employeer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeerRepository extends JpaRepository<Employeer, Long> {

}
