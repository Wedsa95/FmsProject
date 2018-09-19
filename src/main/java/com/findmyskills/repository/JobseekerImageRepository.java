package com.findmyskills.repository;

import com.findmyskills.domain.JobseekerImage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JobseekerImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobseekerImageRepository extends JpaRepository<JobseekerImage, Long> {

}
