import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FmsAppSharedModule } from '../../shared';
import {
    PhoneNumberService,
    PhoneNumberPopupService,
    PhoneNumberComponent,
    PhoneNumberDetailComponent,
    PhoneNumberDialogComponent,
    PhoneNumberPopupComponent,
    PhoneNumberDeletePopupComponent,
    PhoneNumberDeleteDialogComponent,
    phoneNumberRoute,
    phoneNumberPopupRoute,
} from './';

const ENTITY_STATES = [
    ...phoneNumberRoute,
    ...phoneNumberPopupRoute,
];

@NgModule({
    imports: [
        FmsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PhoneNumberComponent,
        PhoneNumberDetailComponent,
        PhoneNumberDialogComponent,
        PhoneNumberDeleteDialogComponent,
        PhoneNumberPopupComponent,
        PhoneNumberDeletePopupComponent,
    ],
    entryComponents: [
        PhoneNumberComponent,
        PhoneNumberDialogComponent,
        PhoneNumberPopupComponent,
        PhoneNumberDeleteDialogComponent,
        PhoneNumberDeletePopupComponent,
    ],
    providers: [
        PhoneNumberService,
        PhoneNumberPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FmsAppPhoneNumberModule {}
