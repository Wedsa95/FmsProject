package com.findmyskills.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.findmyskills.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.findmyskills.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".skills", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".branches", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".languages", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".locations", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".consultingExperiences", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".roles", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".emails", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".phonenumbers", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".experiences", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".jobseekerCompliances", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".educations", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".workExperiences", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Jobseeker.class.getName() + ".references", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Employeer.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Employeer.class.getName() + ".employeerCompliances", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Employeer.class.getName() + ".images", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Employeer.class.getName() + ".vacancies", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Vacancy.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Vacancy.class.getName() + ".extents", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Vacancy.class.getName() + ".roles", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Vacancy.class.getName() + ".locations", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Vacancy.class.getName() + ".languages", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Vacancy.class.getName() + ".branches", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Vacancy.class.getName() + ".skills", jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.EmployeerCompliance.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.EmployeerImage.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Branch.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.ConsultingExperience.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Language.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.JobseekerImage.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.JobseekerVideo.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.JobseekerCompliance.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Skill.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Role.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Extent.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Reference.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.PhoneNumber.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Email.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Presentation.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Education.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.Degree.class.getName(), jcacheConfiguration);
            cm.createCache(com.findmyskills.domain.WorkExperience.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
