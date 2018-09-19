import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeerImageComponent } from './employeer-image.component';
import { EmployeerImageDetailComponent } from './employeer-image-detail.component';
import { EmployeerImagePopupComponent } from './employeer-image-dialog.component';
import { EmployeerImageDeletePopupComponent } from './employeer-image-delete-dialog.component';

export const employeerImageRoute: Routes = [
    {
        path: 'employeer-image',
        component: EmployeerImageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerImage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employeer-image/:id',
        component: EmployeerImageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerImage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeerImagePopupRoute: Routes = [
    {
        path: 'employeer-image-new',
        component: EmployeerImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employeer-image/:id/edit',
        component: EmployeerImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employeer-image/:id/delete',
        component: EmployeerImageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
