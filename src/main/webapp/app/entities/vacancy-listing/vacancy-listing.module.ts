import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import { Autosize } from 'angular2-autosize';
import {
    VacancyListingService,
    VacancyListingPopupService,
    VacancyListingComponent,
    VacancyListingDetailComponent,
    VacancyListingDialogComponent,
    VacancyListingCreateComponent,
    VacancyListingPopupComponent,
    VacancyListingDeletePopupComponent,
    VacancyListingDeleteDialogComponent,
    vacancyListingRoute,
    vacancyListingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...vacancyListingRoute,
    ...vacancyListingPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VacancyListingComponent,
        VacancyListingDetailComponent,
        VacancyListingDialogComponent,
        VacancyListingCreateComponent,
        VacancyListingDeleteDialogComponent,
        VacancyListingPopupComponent,
        Autosize,
        VacancyListingDeletePopupComponent,
    ],
    entryComponents: [
        VacancyListingComponent,
        VacancyListingDialogComponent,
        VacancyListingPopupComponent,
        VacancyListingDeleteDialogComponent,
        VacancyListingDeletePopupComponent,
    ],
    providers: [
        VacancyListingService,
        VacancyListingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppVacancyListingModule {}
