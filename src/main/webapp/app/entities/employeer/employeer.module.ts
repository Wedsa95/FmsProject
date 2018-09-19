import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import { FmsAppAdminModule } from '../../admin/admin.module';
import {
    EmployeerService,
    EmployeerPopupService,
    EmployeerComponent,
    EmployeerDetailComponent,
    EmployeerDialogComponent,
    EmployeerPopupComponent,
    EmployeerDeletePopupComponent,
    EmployeerDeleteDialogComponent,
    employeerRoute,
    employeerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeerRoute,
    ...employeerPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        FmsAppAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeerComponent,
        EmployeerDetailComponent,
        EmployeerDialogComponent,
        EmployeerDeleteDialogComponent,
        EmployeerPopupComponent,
        EmployeerDeletePopupComponent,
    ],
    entryComponents: [
        EmployeerComponent,
        EmployeerDialogComponent,
        EmployeerPopupComponent,
        EmployeerDeleteDialogComponent,
        EmployeerDeletePopupComponent,
    ],
    providers: [
        EmployeerService,
        EmployeerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppEmployeerModule {}
