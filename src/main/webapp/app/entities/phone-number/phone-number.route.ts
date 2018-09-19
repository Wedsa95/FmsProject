import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PhoneNumberComponent } from './phone-number.component';
import { PhoneNumberDetailComponent } from './phone-number-detail.component';
import { PhoneNumberPopupComponent } from './phone-number-dialog.component';
import { PhoneNumberDeletePopupComponent } from './phone-number-delete-dialog.component';

export const phoneNumberRoute: Routes = [
    {
        path: 'phone-number',
        component: PhoneNumberComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.phoneNumber.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'phone-number/:id',
        component: PhoneNumberDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.phoneNumber.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phoneNumberPopupRoute: Routes = [
    {
        path: 'phone-number-new',
        component: PhoneNumberPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.phoneNumber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone-number/:id/edit',
        component: PhoneNumberPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.phoneNumber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone-number/:id/delete',
        component: PhoneNumberDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.phoneNumber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
