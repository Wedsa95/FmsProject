package com.findmyskills.repository;

import com.findmyskills.domain.Employeer;
import com.findmyskills.domain.Jobseeker;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Employeer entity.
 */
@Repository
public interface EmployeerRepository extends JpaRepository<Employeer, Long> {

	@Query("select employeer from Employeer employeer where employeer.user.login = ?#{principal.username}")
	Employeer findByUserIsCurrentUser();
}
