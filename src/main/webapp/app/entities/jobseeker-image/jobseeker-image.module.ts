import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    JobseekerImageService,
    JobseekerImagePopupService,
    JobseekerImageComponent,
    JobseekerImageDetailComponent,
    JobseekerImageDialogComponent,
    JobseekerImagePopupComponent,
    JobseekerImageDeletePopupComponent,
    JobseekerImageDeleteDialogComponent,
    jobseekerImageRoute,
    jobseekerImagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobseekerImageRoute,
    ...jobseekerImagePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobseekerImageComponent,
        JobseekerImageDetailComponent,
        JobseekerImageDialogComponent,
        JobseekerImageDeleteDialogComponent,
        JobseekerImagePopupComponent,
        JobseekerImageDeletePopupComponent,
    ],
    entryComponents: [
        JobseekerImageComponent,
        JobseekerImageDialogComponent,
        JobseekerImagePopupComponent,
        JobseekerImageDeleteDialogComponent,
        JobseekerImageDeletePopupComponent,
    ],
    providers: [
        JobseekerImageService,
        JobseekerImagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppJobseekerImageModule {}
