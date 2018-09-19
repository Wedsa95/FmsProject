import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    ConsultingExperienceService,
    ConsultingExperiencePopupService,
    ConsultingExperienceComponent,
    ConsultingExperienceDetailComponent,
    ConsultingExperienceDialogComponent,
    ConsultingExperiencePopupComponent,
    ConsultingExperienceDeletePopupComponent,
    ConsultingExperienceDeleteDialogComponent,
    consultingExperienceRoute,
    consultingExperiencePopupRoute,
} from './';

const ENTITY_STATES = [
    ...consultingExperienceRoute,
    ...consultingExperiencePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConsultingExperienceComponent,
        ConsultingExperienceDetailComponent,
        ConsultingExperienceDialogComponent,
        ConsultingExperienceDeleteDialogComponent,
        ConsultingExperiencePopupComponent,
        ConsultingExperienceDeletePopupComponent,
    ],
    entryComponents: [
        ConsultingExperienceComponent,
        ConsultingExperienceDialogComponent,
        ConsultingExperiencePopupComponent,
        ConsultingExperienceDeleteDialogComponent,
        ConsultingExperienceDeletePopupComponent,
    ],
    providers: [
        ConsultingExperienceService,
        ConsultingExperiencePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppConsultingExperienceModule {}
