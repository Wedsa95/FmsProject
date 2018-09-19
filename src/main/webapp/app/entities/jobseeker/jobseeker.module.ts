import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import { FmsAppAdminModule } from '../../admin/admin.module';
import {
    JobseekerService,
    JobseekerPopupService,
    JobseekerComponent,
    JobseekerDetailComponent,
    JobseekerDialogComponent,
    JobseekerPopupComponent,
    JobseekerDeletePopupComponent,
    JobseekerDeleteDialogComponent,
    jobseekerRoute,
    jobseekerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobseekerRoute,
    ...jobseekerPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        FmsAppAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobseekerComponent,
        JobseekerDetailComponent,
        JobseekerDialogComponent,
        JobseekerDeleteDialogComponent,
        JobseekerPopupComponent,
        JobseekerDeletePopupComponent,
    ],
    entryComponents: [
        JobseekerComponent,
        JobseekerDialogComponent,
        JobseekerPopupComponent,
        JobseekerDeleteDialogComponent,
        JobseekerDeletePopupComponent,
    ],
    providers: [
        JobseekerService,
        JobseekerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppJobseekerModule {}
