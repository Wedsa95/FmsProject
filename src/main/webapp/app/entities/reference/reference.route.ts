import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReferenceComponent } from './reference.component';
import { ReferenceDetailComponent } from './reference-detail.component';
import { ReferencePopupComponent } from './reference-dialog.component';
import { ReferenceDeletePopupComponent } from './reference-delete-dialog.component';

export const referenceRoute: Routes = [
    {
        path: 'reference',
        component: ReferenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.reference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reference/:id',
        component: ReferenceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.reference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const referencePopupRoute: Routes = [
    {
        path: 'reference-new',
        component: ReferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.reference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reference/:id/edit',
        component: ReferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.reference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reference/:id/delete',
        component: ReferenceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.reference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
