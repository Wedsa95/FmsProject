import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    EducationService,
    EducationPopupService,
    EducationComponent,
    EducationDetailComponent,
    EducationDialogComponent,
    EducationPopupComponent,
    EducationDeletePopupComponent,
    EducationDeleteDialogComponent,
    educationRoute,
    educationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...educationRoute,
    ...educationPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EducationComponent,
        EducationDetailComponent,
        EducationDialogComponent,
        EducationDeleteDialogComponent,
        EducationPopupComponent,
        EducationDeletePopupComponent,
    ],
    entryComponents: [
        EducationComponent,
        EducationDialogComponent,
        EducationPopupComponent,
        EducationDeleteDialogComponent,
        EducationDeletePopupComponent,
    ],
    providers: [
        EducationService,
        EducationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppEducationModule {}
