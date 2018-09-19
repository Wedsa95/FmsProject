package com.findmyskills.repository;

import com.findmyskills.domain.Vacancy;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Vacancy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VacancyRepository extends JpaRepository<Vacancy, Long> {

}
