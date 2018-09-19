package com.findmyskills.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A JobseekerVideo.
 */
@Entity
@Table(name = "jobseeker_video")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JobseekerVideo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "video_link")
    private String videoLink;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public JobseekerVideo videoLink(String videoLink) {
        this.videoLink = videoLink;
        return this;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
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
        JobseekerVideo jobseekerVideo = (JobseekerVideo) o;
        if (jobseekerVideo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobseekerVideo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JobseekerVideo{" +
            "id=" + getId() +
            ", videoLink='" + getVideoLink() + "'" +
            "}";
    }
}
