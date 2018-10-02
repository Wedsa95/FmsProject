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
 * A Jobseeker.
 */
@Entity
@Table(name = "jobseeker")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Jobseeker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "regestration_date")
    private LocalDate regestrationDate;

    @Column(name = "birth_year")
    private LocalDate birthYear;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "unemployed")
    private Boolean unemployed;

    @Column(name = "last_active")
    private LocalDate lastActive;
    
    //JsonProperty so that you can not retrieve 
    // the user in this way, but you can set a new one
    @OneToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinColumn(unique = true)
    private User user;

    @OneToOne
    @JoinColumn(unique = true)
    private JobseekerImage image;

    @OneToOne
    @JoinColumn(unique = true)
    private JobseekerVideo video;

    @OneToOne
    @JoinColumn(unique = true)
    private Presentation presentation;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "jobseeker_has_skills", 
    	joinColumns = @JoinColumn(name = "jobseeker_id", referencedColumnName = "id"), 
    	inverseJoinColumns = @JoinColumn(name = "skill_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Skill> skills = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "jobseeker_prefers_branch", 
    	      joinColumns = @JoinColumn(name = "jobseeker_id", referencedColumnName = "id"), 
    	      inverseJoinColumns = @JoinColumn(name = "branch_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Branch> branches = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "jobseeker_speeks_languages", 
    	joinColumns = @JoinColumn(name = "jobseeker_id", referencedColumnName = "id"), 
    	inverseJoinColumns = @JoinColumn(name = "language_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Language> languages = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "jobseeker_prefers_work_in", 
		joinColumns = @JoinColumn(name = "jobseeker_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "location_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Location> locations = new HashSet<>();

    @OneToMany(mappedBy = "jobseeker", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ConsultingExperience> consultingExperiences = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "jobseeker_worked_as_roles", 
		joinColumns = @JoinColumn(name = "jobseeker_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Role> roles = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "jobseeker_want_extent", 
		joinColumns = @JoinColumn(name = "jobseeker_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "extent_id", referencedColumnName = "id"))
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Extent> experiences = new HashSet<>();
    
    @OneToMany(mappedBy = "jobseeker", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Email> emails = new HashSet<>();
        
    @OneToMany(mappedBy = "jobseeker", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PhoneNumber> phonenumbers = new HashSet<>();

    @OneToMany(mappedBy = "jobseeker", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<JobseekerCompliance> jobseekerCompliances = new HashSet<>();

    @OneToMany(mappedBy = "jobseeker", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Education> educations = new HashSet<>();

    @OneToMany(mappedBy = "jobseeker", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WorkExperience> workExperiences = new HashSet<>();

    @OneToMany(mappedBy = "jobseeker", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reference> references = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getRegestrationDate() {
        return regestrationDate;
    }

    public Jobseeker regestrationDate(LocalDate regestrationDate) {
        this.regestrationDate = regestrationDate;
        return this;
    }

    public void setRegestrationDate(LocalDate regestrationDate) {
        this.regestrationDate = regestrationDate;
    }

    public LocalDate getBirthYear() {
        return birthYear;
    }

    public Jobseeker birthYear(LocalDate birthYear) {
        this.birthYear = birthYear;
        return this;
    }

    public void setBirthYear(LocalDate birthYear) {
        this.birthYear = birthYear;
    }

    public String getFirstName() {
        return firstName;
    }

    public Jobseeker firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Jobseeker lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Boolean isUnemployed() {
        return unemployed;
    }

    public Jobseeker unemployed(Boolean unemployed) {
        this.unemployed = unemployed;
        return this;
    }

    public void setUnemployed(Boolean unemployed) {
        this.unemployed = unemployed;
    }

    public LocalDate getLastActive() {
        return lastActive;
    }

    public Jobseeker lastActive(LocalDate lastActive) {
        this.lastActive = lastActive;
        return this;
    }

    public void setLastActive(LocalDate lastActive) {
        this.lastActive = lastActive;
    }
    
    @JsonIgnore
    public User getUser() {
        return user;
    }

    public Jobseeker user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public JobseekerImage getImage() {
        return image;
    }

    public Jobseeker image(JobseekerImage jobseekerImage) {
        this.image = jobseekerImage;
        return this;
    }

    public void setImage(JobseekerImage jobseekerImage) {
        this.image = jobseekerImage;
    }

    public JobseekerVideo getVideo() {
        return video;
    }

    public Jobseeker video(JobseekerVideo jobseekerVideo) {
        this.video = jobseekerVideo;
        return this;
    }

    public void setVideo(JobseekerVideo jobseekerVideo) {
        this.video = jobseekerVideo;
    }

    public Presentation getPresentation() {
        return presentation;
    }

    public Jobseeker presentation(Presentation presentation) {
        this.presentation = presentation;
        return this;
    }

    public void setPresentation(Presentation presentation) {
        this.presentation = presentation;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public Jobseeker skills(Set<Skill> skills) {
        this.skills = skills;
        return this;
    }

    public Jobseeker addSkills(Skill skill) {
        this.skills.add(skill);
        skill.setJobseeker(this);
        return this;
    }

    public Jobseeker removeSkills(Skill skill) {
        this.skills.remove(skill);
        skill.setJobseeker(null);
        return this;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }

    public Set<Branch> getBranches() {
        return branches;
    }

    public Jobseeker branches(Set<Branch> branches) {
        this.branches = branches;
        return this;
    }

    public Jobseeker addBranches(Branch branch) {
        this.branches.add(branch);
        branch.setJobseeker(this);
        return this;
    }

    public Jobseeker removeBranches(Branch branch) {
        this.branches.remove(branch);
        branch.setJobseeker(null);
        return this;
    }

    public void setBranches(Set<Branch> branches) {
        this.branches = branches;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Jobseeker languages(Set<Language> languages) {
        this.languages = languages;
        return this;
    }

    public Jobseeker addLanguages(Language language) {
        this.languages.add(language);
        language.setJobseeker(this);
        return this;
    }

    public Jobseeker removeLanguages(Language language) {
        this.languages.remove(language);
        language.setJobseeker(null);
        return this;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Jobseeker locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Jobseeker addLocations(Location location) {
        this.locations.add(location);
        location.setJobseeker(this);
        return this;
    }

    public Jobseeker removeLocations(Location location) {
        this.locations.remove(location);
        location.setJobseeker(null);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<ConsultingExperience> getConsultingExperiences() {
        return consultingExperiences;
    }

    public Jobseeker consultingExperiences(Set<ConsultingExperience> consultingExperiences) {
        this.consultingExperiences = consultingExperiences;
        return this;
    }

    public Jobseeker addConsultingExperience(ConsultingExperience consultingExperience) {
        this.consultingExperiences.add(consultingExperience);
        consultingExperience.setJobseeker(this);
        return this;
    }

    public Jobseeker removeConsultingExperience(ConsultingExperience consultingExperience) {
        this.consultingExperiences.remove(consultingExperience);
        consultingExperience.setJobseeker(null);
        return this;
    }

    public void setConsultingExperiences(Set<ConsultingExperience> consultingExperiences) {
        this.consultingExperiences = consultingExperiences;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Jobseeker roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public Jobseeker addRoles(Role role) {
        this.roles.add(role);
        role.setJobseeker(this);
        return this;
    }

    public Jobseeker removeRoles(Role role) {
        this.roles.remove(role);
        role.setJobseeker(null);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Email> getEmails() {
        return emails;
    }

    public Jobseeker emails(Set<Email> emails) {
        this.emails = emails;
        return this;
    }

    public Jobseeker addEmails(Email email) {
        this.emails.add(email);
        email.setJobseeker(this);
        return this;
    }

    public Jobseeker removeEmails(Email email) {
        this.emails.remove(email);
        email.setJobseeker(null);
        return this;
    }

    public void setEmails(Set<Email> emails) {
        this.emails = emails;
    }

    public Set<PhoneNumber> getPhonenumbers() {
        return phonenumbers;
    }

    public Jobseeker phonenumbers(Set<PhoneNumber> phoneNumbers) {
        this.phonenumbers = phoneNumbers;
        return this;
    }

    public Jobseeker addPhonenumbers(PhoneNumber phoneNumber) {
        this.phonenumbers.add(phoneNumber);
        phoneNumber.setJobseeker(this);
        return this;
    }

    public Jobseeker removePhonenumbers(PhoneNumber phoneNumber) {
        this.phonenumbers.remove(phoneNumber);
        phoneNumber.setJobseeker(null);
        return this;
    }

    public void setPhonenumbers(Set<PhoneNumber> phoneNumbers) {
        this.phonenumbers = phoneNumbers;
    }

    public Set<Extent> getExperiences() {
        return experiences;
    }

    public Jobseeker experiences(Set<Extent> extents) {
        this.experiences = extents;
        return this;
    }

    public Jobseeker addExperience(Extent extent) {
        this.experiences.add(extent);
        extent.setJobseeker(this);
        return this;
    }

    public Jobseeker removeExperience(Extent extent) {
        this.experiences.remove(extent);
        extent.setJobseeker(null);
        return this;
    }

    public void setExperiences(Set<Extent> extents) {
        this.experiences = extents;
    }

    public Set<JobseekerCompliance> getJobseekerCompliances() {
        return jobseekerCompliances;
    }

    public Jobseeker jobseekerCompliances(Set<JobseekerCompliance> jobseekerCompliances) {
        this.jobseekerCompliances = jobseekerCompliances;
        return this;
    }

    public Jobseeker addJobseekerCompliance(JobseekerCompliance jobseekerCompliance) {
        this.jobseekerCompliances.add(jobseekerCompliance);
        jobseekerCompliance.setJobseeker(this);
        return this;
    }

    public Jobseeker removeJobseekerCompliance(JobseekerCompliance jobseekerCompliance) {
        this.jobseekerCompliances.remove(jobseekerCompliance);
        jobseekerCompliance.setJobseeker(null);
        return this;
    }

    public void setJobseekerCompliances(Set<JobseekerCompliance> jobseekerCompliances) {
        this.jobseekerCompliances = jobseekerCompliances;
    }

    public Set<Education> getEducations() {
        return educations;
    }

    public Jobseeker educations(Set<Education> educations) {
        this.educations = educations;
        return this;
    }

    public Jobseeker addEducations(Education education) {
        this.educations.add(education);
        education.setJobseeker(this);
        return this;
    }

    public Jobseeker removeEducations(Education education) {
        this.educations.remove(education);
        education.setJobseeker(null);
        return this;
    }

    public void setEducations(Set<Education> educations) {
        this.educations = educations;
    }

    public Set<WorkExperience> getWorkExperiences() {
        return workExperiences;
    }

    public Jobseeker workExperiences(Set<WorkExperience> workExperiences) {
        this.workExperiences = workExperiences;
        return this;
    }

    public Jobseeker addWorkExperiences(WorkExperience workExperience) {
        this.workExperiences.add(workExperience);
        workExperience.setJobseeker(this);
        return this;
    }

    public Jobseeker removeWorkExperiences(WorkExperience workExperience) {
        this.workExperiences.remove(workExperience);
        workExperience.setJobseeker(null);
        return this;
    }

    public void setWorkExperiences(Set<WorkExperience> workExperiences) {
        this.workExperiences = workExperiences;
    }

    public Set<Reference> getReferences() {
        return references;
    }

    public Jobseeker references(Set<Reference> references) {
        this.references = references;
        return this;
    }

    public Jobseeker addReferences(Reference reference) {
        this.references.add(reference);
        reference.setJobseeker(this);
        return this;
    }

    public Jobseeker removeReferences(Reference reference) {
        this.references.remove(reference);
        reference.setJobseeker(null);
        return this;
    }

    public void setReferences(Set<Reference> references) {
        this.references = references;
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
        Jobseeker jobseeker = (Jobseeker) o;
        if (jobseeker.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobseeker.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Jobseeker{" +
            "id=" + getId() +
            ", regestrationDate='" + getRegestrationDate() + "'" +
            ", birthYear='" + getBirthYear() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", unemployed='" + isUnemployed() + "'" +
            ", lastActive='" + getLastActive() + "'" +
            "}";
    }
}
