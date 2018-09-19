import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FmsAppJobseekerModule } from './jobseeker/jobseeker.module';
import { FmsAppJobseekerProfileModule } from './jobseeker-profile/jobseeker-profile.module';
import { FmsAppEmployeerModule } from './employeer/employeer.module';
import { FmsAppVacancyModule } from './vacancy/vacancy.module';
import { FmsAppEmployeerComplianceModule } from './employeer-compliance/employeer-compliance.module';
import { FmsAppEmployeerImageModule } from './employeer-image/employeer-image.module';
import { FmsAppBranchModule } from './branch/branch.module';
import { FmsAppLocationModule } from './location/location.module';
import { FmsAppConsultingExperienceModule } from './consulting-experience/consulting-experience.module';
import { FmsAppLanguageModule } from './language/language.module';
import { FmsAppJobseekerImageModule } from './jobseeker-image/jobseeker-image.module';
import { FmsAppJobseekerVideoModule } from './jobseeker-video/jobseeker-video.module';
import { FmsAppJobseekerComplianceModule } from './jobseeker-compliance/jobseeker-compliance.module';
import { FmsAppSkillModule } from './skill/skill.module';
import { FmsAppRoleModule } from './role/role.module';
import { FmsAppExtentModule } from './extent/extent.module';
import { FmsAppReferenceModule } from './reference/reference.module';
import { FmsAppPhoneNumberModule } from './phone-number/phone-number.module';
import { FmsAppEmailModule } from './email/email.module';
import { FmsAppPresentationModule } from './presentation/presentation.module';
import { FmsAppEducationModule } from './education/education.module';
import { FmsAppDegreeModule } from './degree/degree.module';
import { FmsAppWorkExperienceModule } from './work-experience/work-experience.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FmsAppJobseekerModule,
        FmsAppJobseekerProfileModule,
        FmsAppEmployeerModule,
        FmsAppVacancyModule,
        FmsAppEmployeerComplianceModule,
        FmsAppEmployeerImageModule,
        FmsAppBranchModule,
        FmsAppLocationModule,
        FmsAppConsultingExperienceModule,
        FmsAppLanguageModule,
        FmsAppJobseekerImageModule,
        FmsAppJobseekerVideoModule,
        FmsAppJobseekerComplianceModule,
        FmsAppSkillModule,
        FmsAppRoleModule,
        FmsAppExtentModule,
        FmsAppReferenceModule,
        FmsAppPhoneNumberModule,
        FmsAppEmailModule,
        FmsAppPresentationModule,
        FmsAppEducationModule,
        FmsAppDegreeModule,
        FmsAppWorkExperienceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppEntityModule {}
