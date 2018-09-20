import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeerProfileComponent } from './employeer-profile.component';
import { EmployeerProfileDetailComponent } from './employeer-profile-detail.component';
import { EmployeerProfilePopupComponent } from './employeer-profile-dialog.component';
import { EmployeerProfileDeletePopupComponent } from './employeer-profile-delete-dialog.component';

export const employeerProfileRoute: Routes = [
    {
        path: 'employeer-profile',
        component: EmployeerProfileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer-profile.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employeer-profile/:id',
        component: EmployeerProfileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer-profile.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeerProfilePopupRoute: Routes = [
    {
        path: 'employeer-profile-new',
        component: EmployeerProfilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer-profile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employeer-profile/:id/edit',
        component: EmployeerProfilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer-profile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employeer-profile/:id/delete',
        component: EmployeerProfileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer-profile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
