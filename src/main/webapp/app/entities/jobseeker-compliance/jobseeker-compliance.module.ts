import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    JobseekerComplianceService,
    JobseekerCompliancePopupService,
    JobseekerComplianceComponent,
    JobseekerComplianceDetailComponent,
    JobseekerComplianceDialogComponent,
    JobseekerCompliancePopupComponent,
    JobseekerComplianceDeletePopupComponent,
    JobseekerComplianceDeleteDialogComponent,
    jobseekerComplianceRoute,
    jobseekerCompliancePopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobseekerComplianceRoute,
    ...jobseekerCompliancePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobseekerComplianceComponent,
        JobseekerComplianceDetailComponent,
        JobseekerComplianceDialogComponent,
        JobseekerComplianceDeleteDialogComponent,
        JobseekerCompliancePopupComponent,
        JobseekerComplianceDeletePopupComponent,
    ],
    entryComponents: [
        JobseekerComplianceComponent,
        JobseekerComplianceDialogComponent,
        JobseekerCompliancePopupComponent,
        JobseekerComplianceDeleteDialogComponent,
        JobseekerComplianceDeletePopupComponent,
    ],
    providers: [
        JobseekerComplianceService,
        JobseekerCompliancePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppJobseekerComplianceModule {}
