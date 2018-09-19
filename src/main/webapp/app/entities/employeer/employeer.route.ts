import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeerComponent } from './employeer.component';
import { EmployeerDetailComponent } from './employeer-detail.component';
import { EmployeerPopupComponent } from './employeer-dialog.component';
import { EmployeerDeletePopupComponent } from './employeer-delete-dialog.component';

export const employeerRoute: Routes = [
    {
        path: 'employeer',
        component: EmployeerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employeer/:id',
        component: EmployeerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeerPopupRoute: Routes = [
    {
        path: 'employeer-new',
        component: EmployeerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employeer/:id/edit',
        component: EmployeerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employeer/:id/delete',
        component: EmployeerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
