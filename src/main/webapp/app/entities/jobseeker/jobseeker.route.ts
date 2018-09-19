import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JobseekerComponent } from './jobseeker.component';
import { JobseekerDetailComponent } from './jobseeker-detail.component';
import { JobseekerPopupComponent } from './jobseeker-dialog.component';
import { JobseekerDeletePopupComponent } from './jobseeker-delete-dialog.component';

export const jobseekerRoute: Routes = [
    {
        path: 'jobseeker',
        component: JobseekerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jobseeker/:id',
        component: JobseekerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobseekerPopupRoute: Routes = [
    {
        path: 'jobseeker-new',
        component: JobseekerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker/:id/edit',
        component: JobseekerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker/:id/delete',
        component: JobseekerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
