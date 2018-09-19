package com.findmyskills.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Extent.
 */
@Entity
@Table(name = "extent")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Extent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "extent_description")
    private String extentDescription;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Jobseeker jobseeker;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Vacancy vacancy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExtentDescription() {
        return extentDescription;
    }

    public Extent extentDescription(String extentDescription) {
        this.extentDescription = extentDescription;
        return this;
    }

    public void setExtentDescription(String extentDescription) {
        this.extentDescription = extentDescription;
    }

    @JsonIgnore
    public Jobseeker getJobseeker() {
        return jobseeker;
    }

    public Extent jobseeker(Jobseeker jobseeker) {
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

    public Extent vacancy(Vacancy vacancy) {
        this.vacancy = vacancy;
        return this;
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
        Extent extent = (Extent) o;
        if (extent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), extent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Extent{" +
            "id=" + getId() +
            ", extentDescription='" + getExtentDescription() + "'" +
            "}";
    }
}
