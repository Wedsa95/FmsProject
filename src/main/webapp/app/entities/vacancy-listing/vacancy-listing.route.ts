import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VacancyListingComponent } from './vacancy-listing.component';
import { VacancyListingDetailComponent } from './vacancy-listing-detail.component';
import { VacancyListingPopupComponent } from './vacancy-listing-dialog.component';
import { VacancyListingDeletePopupComponent } from './vacancy-listing-delete-dialog.component';

export const vacancyListingRoute: Routes = [
    {
        path: 'vacancy-listing',
        component: VacancyListingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vacancy-listing/:id',
        component: VacancyListingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vacancyListingPopupRoute: Routes = [
    {
        path: 'vacancy-listing-new',
        component: VacancyListingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vacancy-listing/:id/edit',
        component: VacancyListingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vacancy-listing/:id/delete',
        component: VacancyListingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
