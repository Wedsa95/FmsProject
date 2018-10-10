import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import { IconLevelPipe } from '../../shared/util-pipes/icon-level.pipe';
import {
    VacancyListingService,
    VacancyListingPopupService,
    VacancyListingComponent,
    VacancyListingDetailComponent,
    VacancyListingDialogComponent,
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
        VacancyListingDeleteDialogComponent,
        VacancyListingPopupComponent,
        IconLevelPipe,
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
