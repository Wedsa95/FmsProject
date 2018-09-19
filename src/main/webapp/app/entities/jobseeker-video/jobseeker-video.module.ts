import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    JobseekerVideoService,
    JobseekerVideoPopupService,
    JobseekerVideoComponent,
    JobseekerVideoDetailComponent,
    JobseekerVideoDialogComponent,
    JobseekerVideoPopupComponent,
    JobseekerVideoDeletePopupComponent,
    JobseekerVideoDeleteDialogComponent,
    jobseekerVideoRoute,
    jobseekerVideoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobseekerVideoRoute,
    ...jobseekerVideoPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobseekerVideoComponent,
        JobseekerVideoDetailComponent,
        JobseekerVideoDialogComponent,
        JobseekerVideoDeleteDialogComponent,
        JobseekerVideoPopupComponent,
        JobseekerVideoDeletePopupComponent,
    ],
    entryComponents: [
        JobseekerVideoComponent,
        JobseekerVideoDialogComponent,
        JobseekerVideoPopupComponent,
        JobseekerVideoDeleteDialogComponent,
        JobseekerVideoDeletePopupComponent,
    ],
    providers: [
        JobseekerVideoService,
        JobseekerVideoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppJobseekerVideoModule {}
