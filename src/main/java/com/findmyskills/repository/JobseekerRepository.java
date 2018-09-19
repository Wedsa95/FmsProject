package com.findmyskills.repository;

import com.findmyskills.domain.Jobseeker;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Jobseeker entity.
 */
@Repository
public interface JobseekerRepository extends JpaRepository<Jobseeker, Long> {
    
	@Query("select jobseeker from Jobseeker jobseeker where jobseeker.user.login = ?#{principal.username}")
    Jobseeker findByUserIsCurrentUser();
}
