import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DegreeComponent } from './degree.component';
import { DegreeDetailComponent } from './degree-detail.component';
import { DegreePopupComponent } from './degree-dialog.component';
import { DegreeDeletePopupComponent } from './degree-delete-dialog.component';

export const degreeRoute: Routes = [
    {
        path: 'degree',
        component: DegreeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.degree.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'degree/:id',
        component: DegreeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.degree.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const degreePopupRoute: Routes = [
    {
        path: 'degree-new',
        component: DegreePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.degree.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'degree/:id/edit',
        component: DegreePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.degree.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'degree/:id/delete',
        component: DegreeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.degree.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
