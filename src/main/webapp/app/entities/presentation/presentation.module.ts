import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    PresentationService,
    PresentationPopupService,
    PresentationComponent,
    PresentationDetailComponent,
    PresentationDialogComponent,
    PresentationPopupComponent,
    PresentationDeletePopupComponent,
    PresentationDeleteDialogComponent,
    presentationRoute,
    presentationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...presentationRoute,
    ...presentationPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PresentationComponent,
        PresentationDetailComponent,
        PresentationDialogComponent,
        PresentationDeleteDialogComponent,
        PresentationPopupComponent,
        PresentationDeletePopupComponent,
    ],
    entryComponents: [
        PresentationComponent,
        PresentationDialogComponent,
        PresentationPopupComponent,
        PresentationDeleteDialogComponent,
        PresentationDeletePopupComponent,
    ],
    providers: [
        PresentationService,
        PresentationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppPresentationModule {}
