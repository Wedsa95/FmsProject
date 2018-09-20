import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import { FmsAppAdminModule } from '../../admin/admin.module';
import {
    EmployeerProfileService,
    EmployeerProfilePopupService,
    EmployeerProfileComponent,
    EmployeerProfileDetailComponent,
    EmployeerProfileDialogComponent,
    EmployeerProfilePopupComponent,
    EmployeerProfileDeletePopupComponent,
    EmployeerProfileDeleteDialogComponent,
    employeerProfileRoute,
    employeerProfilePopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeerProfileRoute,
    ...employeerProfilePopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        FmsAppAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeerProfileComponent,
        EmployeerProfileDetailComponent,
        EmployeerProfileDialogComponent,
        EmployeerProfileDeleteDialogComponent,
        EmployeerProfilePopupComponent,
        EmployeerProfileDeletePopupComponent,
    ],
    entryComponents: [
        EmployeerProfileComponent,
        EmployeerProfileDialogComponent,
        EmployeerProfilePopupComponent,
        EmployeerProfileDeleteDialogComponent,
        EmployeerProfileDeletePopupComponent,
    ],
    providers: [
        EmployeerProfileService,
        EmployeerProfilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppEmployeerProfileModule {}
