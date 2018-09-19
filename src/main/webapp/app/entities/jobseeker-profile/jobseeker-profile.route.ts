import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JobseekerProfileComponent } from './jobseeker-profile.component';
import { JobseekerProfileDetailComponent } from './jobseeker-profile-detail.component';
import { JobseekerPopupComponent } from './jobseeker-profile-dialog.component';
import { JobseekerDeletePopupComponent } from './jobseeker-profile-delete-dialog.component';

export const jobseekerProfileRoute: Routes = [
    {
        path: 'jobseeker-profile',
        component: JobseekerProfileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jobseeker-profile/:id',
        component: JobseekerProfileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobseekerPopupRoute: Routes = [
    {
        path: 'jobseeker-profile-new',
        component: JobseekerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker-profile/:id/edit',
        component: JobseekerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker-profile/:id/delete',
        component: JobseekerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseeker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
