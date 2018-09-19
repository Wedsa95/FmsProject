import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JobseekerVideoComponent } from './jobseeker-video.component';
import { JobseekerVideoDetailComponent } from './jobseeker-video-detail.component';
import { JobseekerVideoPopupComponent } from './jobseeker-video-dialog.component';
import { JobseekerVideoDeletePopupComponent } from './jobseeker-video-delete-dialog.component';

export const jobseekerVideoRoute: Routes = [
    {
        path: 'jobseeker-video',
        component: JobseekerVideoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerVideo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jobseeker-video/:id',
        component: JobseekerVideoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerVideo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobseekerVideoPopupRoute: Routes = [
    {
        path: 'jobseeker-video-new',
        component: JobseekerVideoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerVideo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker-video/:id/edit',
        component: JobseekerVideoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerVideo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker-video/:id/delete',
        component: JobseekerVideoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerVideo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
