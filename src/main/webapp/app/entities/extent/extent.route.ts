import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExtentComponent } from './extent.component';
import { ExtentDetailComponent } from './extent-detail.component';
import { ExtentPopupComponent } from './extent-dialog.component';
import { ExtentDeletePopupComponent } from './extent-delete-dialog.component';

export const extentRoute: Routes = [
    {
        path: 'extent',
        component: ExtentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.extent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'extent/:id',
        component: ExtentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.extent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const extentPopupRoute: Routes = [
    {
        path: 'extent-new',
        component: ExtentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.extent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extent/:id/edit',
        component: ExtentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.extent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extent/:id/delete',
        component: ExtentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.extent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
