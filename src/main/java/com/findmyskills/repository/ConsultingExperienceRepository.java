package com.findmyskills.repository;

import com.findmyskills.domain.ConsultingExperience;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ConsultingExperience entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultingExperienceRepository extends JpaRepository<ConsultingExperience, Long> {

}
