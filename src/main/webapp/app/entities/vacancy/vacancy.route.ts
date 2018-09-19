import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VacancyComponent } from './vacancy.component';
import { VacancyDetailComponent } from './vacancy-detail.component';
import { VacancyPopupComponent } from './vacancy-dialog.component';
import { VacancyDeletePopupComponent } from './vacancy-delete-dialog.component';

export const vacancyRoute: Routes = [
    {
        path: 'vacancy',
        component: VacancyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vacancy/:id',
        component: VacancyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vacancyPopupRoute: Routes = [
    {
        path: 'vacancy-new',
        component: VacancyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vacancy/:id/edit',
        component: VacancyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vacancy/:id/delete',
        component: VacancyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.vacancy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
