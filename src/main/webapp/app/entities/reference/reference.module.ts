import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    ReferenceService,
    ReferencePopupService,
    ReferenceComponent,
    ReferenceDetailComponent,
    ReferenceDialogComponent,
    ReferencePopupComponent,
    ReferenceDeletePopupComponent,
    ReferenceDeleteDialogComponent,
    referenceRoute,
    referencePopupRoute,
} from './';

const ENTITY_STATES = [
    ...referenceRoute,
    ...referencePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReferenceComponent,
        ReferenceDetailComponent,
        ReferenceDialogComponent,
        ReferenceDeleteDialogComponent,
        ReferencePopupComponent,
        ReferenceDeletePopupComponent,
    ],
    entryComponents: [
        ReferenceComponent,
        ReferenceDialogComponent,
        ReferencePopupComponent,
        ReferenceDeleteDialogComponent,
        ReferenceDeletePopupComponent,
    ],
    providers: [
        ReferenceService,
        ReferencePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppReferenceModule {}
