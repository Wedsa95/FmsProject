package com.findmyskills.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Employeer.
 */
@Entity
@Table(name = "employeer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employeer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employeer_name")
    private String employeerName;

    @Column(name = "last_active")
    private LocalDate lastActive;

    @Column(name = "company_registration_number")
    private String companyRegistrationNumber;
    
//    @OneToOne
//    @JoinColumn(unique = true)
//    private EmployeerImage image;
    
    @OneToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "employeer", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EmployeerCompliance> employeerCompliances = new HashSet<>();

    @OneToMany(mappedBy = "employeer", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EmployeerImage> images = new HashSet<>();

    @OneToMany(mappedBy = "employeer", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Vacancy> vacancies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeerName() {
        return employeerName;
    }

    public Employeer employeerName(String employeerName) {
        this.employeerName = employeerName;
        return this;
    }

    public void setEmployeerName(String employeerName) {
        this.employeerName = employeerName;
    }

    public LocalDate getLastActive() {
        return lastActive;
    }

    public Employeer lastActive(LocalDate lastActive) {
        this.lastActive = lastActive;
        return this;
    }

    public void setLastActive(LocalDate lastActive) {
        this.lastActive = lastActive;
    }

    public String getCompanyRegistrationNumber() {
        return companyRegistrationNumber;
    }

    public Employeer companyRegistrationNumber(String companyRegistrationNumber) {
        this.companyRegistrationNumber = companyRegistrationNumber;
        return this;
    }

    public void setCompanyRegistrationNumber(String companyRegistrationNumber) {
        this.companyRegistrationNumber = companyRegistrationNumber;
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public Employeer user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<EmployeerCompliance> getEmployeerCompliances() {
        return employeerCompliances;
    }

    public Employeer employeerCompliances(Set<EmployeerCompliance> employeerCompliances) {
        this.employeerCompliances = employeerCompliances;
        return this;
    }

    public Employeer addEmployeerCompliance(EmployeerCompliance employeerCompliance) {
        this.employeerCompliances.add(employeerCompliance);
        employeerCompliance.setEmployeer(this);
        return this;
    }

    public Employeer removeEmployeerCompliance(EmployeerCompliance employeerCompliance) {
        this.employeerCompliances.remove(employeerCompliance);
        employeerCompliance.setEmployeer(null);
        return this;
    }

    public void setEmployeerCompliances(Set<EmployeerCompliance> employeerCompliances) {
        this.employeerCompliances = employeerCompliances;
    }

    public Set<EmployeerImage> getImages() {
        return images;
    }

    public Employeer images(Set<EmployeerImage> employeerImages) {
        this.images = employeerImages;
        return this;
    }

    public Employeer addImage(EmployeerImage employeerImage) {
        this.images.add(employeerImage);
        employeerImage.setEmployeer(this);
        return this;
    }

    public Employeer removeImage(EmployeerImage employeerImage) {
        this.images.remove(employeerImage);
        employeerImage.setEmployeer(null);
        return this;
    }

    public void setImages(Set<EmployeerImage> employeerImages) {
        this.images = employeerImages;
    }

//    public EmployeerImage getImage() {
//		return image;
//	}
//
//	public void setImage(EmployeerImage image) {
//		this.image = image;
//	}

	public Set<Vacancy> getVacancies() {
        return vacancies;
    }

    public Employeer vacancies(Set<Vacancy> vacancies) {
        this.vacancies = vacancies;
        return this;
    }

    public Employeer addVacancies(Vacancy vacancy) {
        this.vacancies.add(vacancy);
        vacancy.setEmployeer(this);
        return this;
    }

    public Employeer removeVacancies(Vacancy vacancy) {
        this.vacancies.remove(vacancy);
        vacancy.setEmployeer(null);
        return this;
    }

    public void setVacancies(Set<Vacancy> vacancies) {
        this.vacancies = vacancies;
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
        Employeer employeer = (Employeer) o;
        if (employeer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employeer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employeer{" +
            "id=" + getId() +
            ", employeerName='" + getEmployeerName() + "'" +
            ", lastActive='" + getLastActive() + "'" +
            ", companyRegistrationNumber='" + getCompanyRegistrationNumber() + "'" +
            "}";
    }
}
