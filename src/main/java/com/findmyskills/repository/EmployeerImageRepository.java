package com.findmyskills.repository;

import com.findmyskills.domain.EmployeerImage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmployeerImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeerImageRepository extends JpaRepository<EmployeerImage, Long> {

}
