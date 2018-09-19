import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    VacancyService,
    VacancyPopupService,
    VacancyComponent,
    VacancyDetailComponent,
    VacancyDialogComponent,
    VacancyPopupComponent,
    VacancyDeletePopupComponent,
    VacancyDeleteDialogComponent,
    vacancyRoute,
    vacancyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...vacancyRoute,
    ...vacancyPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VacancyComponent,
        VacancyDetailComponent,
        VacancyDialogComponent,
        VacancyDeleteDialogComponent,
        VacancyPopupComponent,
        VacancyDeletePopupComponent,
    ],
    entryComponents: [
        VacancyComponent,
        VacancyDialogComponent,
        VacancyPopupComponent,
        VacancyDeleteDialogComponent,
        VacancyDeletePopupComponent,
    ],
    providers: [
        VacancyService,
        VacancyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppVacancyModule {}
