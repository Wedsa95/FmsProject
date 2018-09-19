import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import { FmsAppAdminModule } from '../../admin/admin.module';
import {
    JobseekerProfileService,
    JobseekerProfilePopupService,
    JobseekerProfileComponent,
    JobseekerProfileDetailComponent,
    JobseekerProfileDialogComponent,
    JobseekerPopupComponent,
    JobseekerDeletePopupComponent,
    JobseekerProfileDeleteDialogComponent,
    jobseekerProfileRoute,
    jobseekerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobseekerProfileRoute,
    ...jobseekerPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        FmsAppAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobseekerProfileComponent,
        JobseekerProfileDetailComponent,
        JobseekerProfileDialogComponent,
        JobseekerProfileDeleteDialogComponent,
        JobseekerPopupComponent,
        JobseekerDeletePopupComponent,
    ],
    entryComponents: [
        JobseekerProfileComponent,
        JobseekerProfileDialogComponent,
        JobseekerPopupComponent,
        JobseekerProfileDeleteDialogComponent,
        JobseekerDeletePopupComponent,
    ],
    providers: [
        JobseekerProfileService,
        JobseekerProfilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppJobseekerProfileModule {}
