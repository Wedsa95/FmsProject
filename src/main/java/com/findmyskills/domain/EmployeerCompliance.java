package com.findmyskills.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A EmployeerCompliance.
 */
@Entity
@Table(name = "employeer_compliance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EmployeerCompliance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_compliance")
    private LocalDate dateCompliance;

    @Column(name = "answer_compliance")
    private Boolean answerCompliance;

    @ManyToOne
    private Employeer employeer;

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

    public EmployeerCompliance dateCompliance(LocalDate dateCompliance) {
        this.dateCompliance = dateCompliance;
        return this;
    }

    public void setDateCompliance(LocalDate dateCompliance) {
        this.dateCompliance = dateCompliance;
    }

    public Boolean isAnswerCompliance() {
        return answerCompliance;
    }

    public EmployeerCompliance answerCompliance(Boolean answerCompliance) {
        this.answerCompliance = answerCompliance;
        return this;
    }

    public void setAnswerCompliance(Boolean answerCompliance) {
        this.answerCompliance = answerCompliance;
    }

    public Employeer getEmployeer() {
        return employeer;
    }

    public EmployeerCompliance employeer(Employeer employeer) {
        this.employeer = employeer;
        return this;
    }

    public void setEmployeer(Employeer employeer) {
        this.employeer = employeer;
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
        EmployeerCompliance employeerCompliance = (EmployeerCompliance) o;
        if (employeerCompliance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employeerCompliance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmployeerCompliance{" +
            "id=" + getId() +
            ", dateCompliance='" + getDateCompliance() + "'" +
            ", answerCompliance='" + isAnswerCompliance() + "'" +
            "}";
    }
}
