import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PresentationComponent } from './presentation.component';
import { PresentationDetailComponent } from './presentation-detail.component';
import { PresentationPopupComponent } from './presentation-dialog.component';
import { PresentationDeletePopupComponent } from './presentation-delete-dialog.component';

export const presentationRoute: Routes = [
    {
        path: 'presentation',
        component: PresentationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'presentation/:id',
        component: PresentationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presentationPopupRoute: Routes = [
    {
        path: 'presentation-new',
        component: PresentationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'presentation/:id/edit',
        component: PresentationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'presentation/:id/delete',
        component: PresentationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
