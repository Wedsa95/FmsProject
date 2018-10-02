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
 * A Vacancy.
 */
@Entity
@Table(name = "vacancy")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Vacancy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "upload_date")
    private LocalDate uploadDate;

    @Column(name = "vacancie_role")
    private String vacancieRole;

    @Lob
    @Column(name = "job_description")
    private String jobDescription;

    @Lob
    @Column(name = "aspirant_description")
    private String aspirantDescription;

    @Lob
    @Column(name = "about_description")
    private String aboutDescription;

    @Column(name = "contact_person")
    private String contactPerson;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Employeer employeer;

    @OneToOne
    @JoinTable(name = "vacancies_needs_degree", 
		joinColumns = @JoinColumn(name = "vacancy_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "degree_id", referencedColumnName = "id"))
    @JoinColumn(unique = true)
    private Degree degree;

    @OneToOne
    @JoinColumn(unique = true)
    private ConsultingExperience consultingExperience;

    @OneToMany
    @JoinTable(name = "vacancies_have_extent", 
		joinColumns = @JoinColumn(name = "vacancy_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "extent_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Extent> extents = new HashSet<>();

    @OneToMany
    @JoinTable(name = "vacancie_needs_roles", 
		joinColumns = @JoinColumn(name = "vacancy_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Role> roles = new HashSet<>();

    @OneToMany
    @JoinTable(name = "vacancies_have_location", 
		joinColumns = @JoinColumn(name = "vacancy_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "location_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Location> locations = new HashSet<>();

    @OneToMany
    @JoinTable(name = "vacancies_needs_languages", 
		joinColumns = @JoinColumn(name = "vacancy_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "language_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Language> languages = new HashSet<>();

    @OneToMany
    @JoinTable(name = "vacancies_wants_branch", 
		joinColumns = @JoinColumn(name = "vacancy_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "branch_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Branch> branches = new HashSet<>();

    @OneToMany
    @JoinTable(name = "vacancies_needs_skills", 
    	joinColumns = @JoinColumn(name = "vacancy_id", referencedColumnName = "id"), 
    	inverseJoinColumns = @JoinColumn(name = "skill_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Skill> skills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public Vacancy uploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
        return this;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getVacancieRole() {
        return vacancieRole;
    }

    public Vacancy vacancieRole(String vacancieRole) {
        this.vacancieRole = vacancieRole;
        return this;
    }

    public void setVacancieRole(String vacancieRole) {
        this.vacancieRole = vacancieRole;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public Vacancy jobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
        return this;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getAspirantDescription() {
        return aspirantDescription;
    }

    public Vacancy aspirantDescription(String aspirantDescription) {
        this.aspirantDescription = aspirantDescription;
        return this;
    }

    public void setAspirantDescription(String aspirantDescription) {
        this.aspirantDescription = aspirantDescription;
    }

    public String getAboutDescription() {
        return aboutDescription;
    }

    public Vacancy aboutDescription(String aboutDescription) {
        this.aboutDescription = aboutDescription;
        return this;
    }

    public void setAboutDescription(String aboutDescription) {
        this.aboutDescription = aboutDescription;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public Vacancy contactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
        return this;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    @JsonIgnore
    public Employeer getEmployeer() {
        return employeer;
    }

    public Vacancy employeer(Employeer employeer) {
        this.employeer = employeer;
        return this;
    }

    public void setEmployeer(Employeer employeer) {
        this.employeer = employeer;
    }

    public Degree getDegree() {
        return degree;
    }

    public Vacancy degree(Degree degree) {
        this.degree = degree;
        return this;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }

    public ConsultingExperience getConsultingExperience() {
        return consultingExperience;
    }

    public Vacancy consultingExperience(ConsultingExperience consultingExperience) {
        this.consultingExperience = consultingExperience;
        return this;
    }

    public void setConsultingExperience(ConsultingExperience consultingExperience) {
        this.consultingExperience = consultingExperience;
    }

    public Set<Extent> getExtents() {
        return extents;
    }

    public Vacancy extents(Set<Extent> extents) {
        this.extents = extents;
        return this;
    }

    public Vacancy addExtents(Extent extent) {
        this.extents.add(extent);
        extent.setVacancy(this);
        return this;
    }

    public Vacancy removeExtents(Extent extent) {
        this.extents.remove(extent);
        extent.setVacancy(null);
        return this;
    }

    public void setExtents(Set<Extent> extents) {
        this.extents = extents;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Vacancy roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public Vacancy addRoles(Role role) {
        this.roles.add(role);
        role.setVacancy(this);
        return this;
    }

    public Vacancy removeRoles(Role role) {
        this.roles.remove(role);
        role.setVacancy(null);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Vacancy locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Vacancy addLocations(Location location) {
        this.locations.add(location);
        location.setVacancy(this);
        return this;
    }

    public Vacancy removeLocations(Location location) {
        this.locations.remove(location);
        location.setVacancy(null);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Vacancy languages(Set<Language> languages) {
        this.languages = languages;
        return this;
    }

    public Vacancy addLanguages(Language language) {
        this.languages.add(language);
        language.setVacancy(this);
        return this;
    }

    public Vacancy removeLanguages(Language language) {
        this.languages.remove(language);
        language.setVacancy(null);
        return this;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Set<Branch> getBranches() {
        return branches;
    }

    public Vacancy branches(Set<Branch> branches) {
        this.branches = branches;
        return this;
    }

    public Vacancy addBranches(Branch branch) {
        this.branches.add(branch);
        branch.setVacancy(this);
        return this;
    }

    public Vacancy removeBranches(Branch branch) {
        this.branches.remove(branch);
        branch.setVacancy(null);
        return this;
    }

    public void setBranches(Set<Branch> branches) {
        this.branches = branches;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public Vacancy skills(Set<Skill> skills) {
        this.skills = skills;
        return this;
    }

    public Vacancy addSkills(Skill skill) {
        this.skills.add(skill);
        skill.setVacancy(this);
        return this;
    }

    public Vacancy removeSkills(Skill skill) {
        this.skills.remove(skill);
        skill.setVacancy(null);
        return this;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
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
        Vacancy vacancy = (Vacancy) o;
        if (vacancy.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vacancy.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vacancy{" +
            "id=" + getId() +
            ", uploadDate='" + getUploadDate() + "'" +
            ", vacancieRole='" + getVacancieRole() + "'" +
            ", jobDescription='" + getJobDescription() + "'" +
            ", aspirantDescription='" + getAspirantDescription() + "'" +
            ", aboutDescription='" + getAboutDescription() + "'" +
            ", contactPerson='" + getContactPerson() + "'" +
            "}";
    }
}
