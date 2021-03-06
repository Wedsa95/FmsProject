package com.findmyskills.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A JobseekerCompliance.
 */
@Entity
@Table(name = "jobseeker_compliance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JobseekerCompliance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_compliance")
    private LocalDate dateCompliance;

    @Column(name = "answer_compliance")
    private Boolean answerCompliance;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Jobseeker jobseeker;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCompliance() {
        return dateCompliance;
    }

    public JobseekerCompliance dateCompliance(LocalDate dateCompliance) {
        this.dateCompliance = dateCompliance;
        return this;
    }

    public void setDateCompliance(LocalDate dateCompliance) {
        this.dateCompliance = dateCompliance;
    }

    public Boolean isAnswerCompliance() {
        return answerCompliance;
    }

    public JobseekerCompliance answerCompliance(Boolean answerCompliance) {
        this.answerCompliance = answerCompliance;
        return this;
    }

    public void setAnswerCompliance(Boolean answerCompliance) {
        this.answerCompliance = answerCompliance;
    }

    @JsonIgnore
    public Jobseeker getJobseeker() {
        return jobseeker;
    }

    public JobseekerCompliance jobseeker(Jobseeker jobseeker) {
        this.jobseeker = jobseeker;
        return this;
    }

    public void setJobseeker(Jobseeker jobseeker) {
        this.jobseeker = jobseeker;
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
        JobseekerCompliance jobseekerCompliance = (JobseekerCompliance) o;
        if (jobseekerCompliance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobseekerCompliance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JobseekerCompliance{" +
            "id=" + getId() +
            ", dateCompliance='" + getDateCompliance() + "'" +
            ", answerCompliance='" + isAnswerCompliance() + "'" +
            "}";
    }
}
