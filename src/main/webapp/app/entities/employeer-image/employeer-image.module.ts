import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    EmployeerImageService,
    EmployeerImagePopupService,
    EmployeerImageComponent,
    EmployeerImageDetailComponent,
    EmployeerImageDialogComponent,
    EmployeerImagePopupComponent,
    EmployeerImageDeletePopupComponent,
    EmployeerImageDeleteDialogComponent,
    employeerImageRoute,
    employeerImagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeerImageRoute,
    ...employeerImagePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeerImageComponent,
        EmployeerImageDetailComponent,
        EmployeerImageDialogComponent,
        EmployeerImageDeleteDialogComponent,
        EmployeerImagePopupComponent,
        EmployeerImageDeletePopupComponent,
    ],
    entryComponents: [
        EmployeerImageComponent,
        EmployeerImageDialogComponent,
        EmployeerImagePopupComponent,
        EmployeerImageDeleteDialogComponent,
        EmployeerImageDeletePopupComponent,
    ],
    providers: [
        EmployeerImageService,
        EmployeerImagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppEmployeerImageModule {}
