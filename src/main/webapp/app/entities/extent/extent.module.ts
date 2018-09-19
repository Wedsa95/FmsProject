import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    ExtentService,
    ExtentPopupService,
    ExtentComponent,
    ExtentDetailComponent,
    ExtentDialogComponent,
    ExtentPopupComponent,
    ExtentDeletePopupComponent,
    ExtentDeleteDialogComponent,
    extentRoute,
    extentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...extentRoute,
    ...extentPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExtentComponent,
        ExtentDetailComponent,
        ExtentDialogComponent,
        ExtentDeleteDialogComponent,
        ExtentPopupComponent,
        ExtentDeletePopupComponent,
    ],
    entryComponents: [
        ExtentComponent,
        ExtentDialogComponent,
        ExtentPopupComponent,
        ExtentDeleteDialogComponent,
        ExtentDeletePopupComponent,
    ],
    providers: [
        ExtentService,
        ExtentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppExtentModule {}
