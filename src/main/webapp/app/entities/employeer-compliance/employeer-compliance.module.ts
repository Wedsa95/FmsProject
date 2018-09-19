import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    EmployeerComplianceService,
    EmployeerCompliancePopupService,
    EmployeerComplianceComponent,
    EmployeerComplianceDetailComponent,
    EmployeerComplianceDialogComponent,
    EmployeerCompliancePopupComponent,
    EmployeerComplianceDeletePopupComponent,
    EmployeerComplianceDeleteDialogComponent,
    employeerComplianceRoute,
    employeerCompliancePopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeerComplianceRoute,
    ...employeerCompliancePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeerComplianceComponent,
        EmployeerComplianceDetailComponent,
        EmployeerComplianceDialogComponent,
        EmployeerComplianceDeleteDialogComponent,
        EmployeerCompliancePopupComponent,
        EmployeerComplianceDeletePopupComponent,
    ],
    entryComponents: [
        EmployeerComplianceComponent,
        EmployeerComplianceDialogComponent,
        EmployeerCompliancePopupComponent,
        EmployeerComplianceDeleteDialogComponent,
        EmployeerComplianceDeletePopupComponent,
    ],
    providers: [
        EmployeerComplianceService,
        EmployeerCompliancePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppEmployeerComplianceModule {}
