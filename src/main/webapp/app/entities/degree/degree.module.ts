import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    DegreeService,
    DegreePopupService,
    DegreeComponent,
    DegreeDetailComponent,
    DegreeDialogComponent,
    DegreePopupComponent,
    DegreeDeletePopupComponent,
    DegreeDeleteDialogComponent,
    degreeRoute,
    degreePopupRoute,
} from './';

const ENTITY_STATES = [
    ...degreeRoute,
    ...degreePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DegreeComponent,
        DegreeDetailComponent,
        DegreeDialogComponent,
        DegreeDeleteDialogComponent,
        DegreePopupComponent,
        DegreeDeletePopupComponent,
    ],
    entryComponents: [
        DegreeComponent,
        DegreeDialogComponent,
        DegreePopupComponent,
        DegreeDeleteDialogComponent,
        DegreeDeletePopupComponent,
    ],
    providers: [
        DegreeService,
        DegreePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppDegreeModule {}
