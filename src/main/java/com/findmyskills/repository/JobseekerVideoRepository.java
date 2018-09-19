package com.findmyskills.repository;

import com.findmyskills.domain.JobseekerVideo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JobseekerVideo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobseekerVideoRepository extends JpaRepository<JobseekerVideo, Long> {

}
