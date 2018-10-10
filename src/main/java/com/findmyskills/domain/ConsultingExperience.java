package com.findmyskills.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * A ConsultingExperience.
 */
@Entity
@Table(name = "consulting_experience")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ConsultingExperience implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "years_consulting")
    private Integer yearsConsulting;

    @OneToOne
    @JoinTable(name = "jobseeker_have_consulting_experience", 
		joinColumns = @JoinColumn(name = "consulting_experience_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "jobseeker_id", referencedColumnName = "id"))
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Jobseeker jobseeker;
    
    @ManyToOne
    @JoinTable(name = "vacancies_wants_consulting_experience", 
		joinColumns = @JoinColumn(name = "consulting_experience_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "vacancy_id", referencedColumnName = "id"))
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Vacancy vacancy;
    
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getYearsConsulting() {
        return yearsConsulting;
    }

    public ConsultingExperience yearsConsulting(Integer yearsConsulting) {
        this.yearsConsulting = yearsConsulting;
        return this;
    }

    public void setYearsConsulting(Integer yearsConsulting) {
        this.yearsConsulting = yearsConsulting;
    }

    @JsonIgnore
    public Jobseeker getJobseeker() {
        return jobseeker;
    }

    public ConsultingExperience jobseeker(Jobseeker jobseeker) {
        this.jobseeker = jobseeker;
        return this;
    }

    public void setJobseeker(Jobseeker jobseeker) {
        this.jobseeker = jobseeker;
    }
    
    @JsonIgnore
    public Vacancy getVacancy() {
		return vacancy;
	}

	public void setVacancy(Vacancy vacancy) {
		this.vacancy = vacancy;
	}
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ConsultingExperience consultingExperience = (ConsultingExperience) o;
        if (consultingExperience.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consultingExperience.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ConsultingExperience{" +
            "id=" + getId() +
            ", yearsConsulting=" + getYearsConsulting() +
            "}";
    }
}
