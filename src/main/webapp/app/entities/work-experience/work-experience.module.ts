import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    WorkExperienceService,
    WorkExperiencePopupService,
    WorkExperienceComponent,
    WorkExperienceDetailComponent,
    WorkExperienceDialogComponent,
    WorkExperiencePopupComponent,
    WorkExperienceDeletePopupComponent,
    WorkExperienceDeleteDialogComponent,
    workExperienceRoute,
    workExperiencePopupRoute,
} from './';

const ENTITY_STATES = [
    ...workExperienceRoute,
    ...workExperiencePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WorkExperienceComponent,
        WorkExperienceDetailComponent,
        WorkExperienceDialogComponent,
        WorkExperienceDeleteDialogComponent,
        WorkExperiencePopupComponent,
        WorkExperienceDeletePopupComponent,
    ],
    entryComponents: [
        WorkExperienceComponent,
        WorkExperienceDialogComponent,
        WorkExperiencePopupComponent,
        WorkExperienceDeleteDialogComponent,
        WorkExperienceDeletePopupComponent,
    ],
    providers: [
        WorkExperienceService,
        WorkExperiencePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppWorkExperienceModule {}
