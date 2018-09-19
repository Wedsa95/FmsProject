import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JobseekerImageComponent } from './jobseeker-image.component';
import { JobseekerImageDetailComponent } from './jobseeker-image-detail.component';
import { JobseekerImagePopupComponent } from './jobseeker-image-dialog.component';
import { JobseekerImageDeletePopupComponent } from './jobseeker-image-delete-dialog.component';

export const jobseekerImageRoute: Routes = [
    {
        path: 'jobseeker-image',
        component: JobseekerImageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerImage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jobseeker-image/:id',
        component: JobseekerImageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerImage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobseekerImagePopupRoute: Routes = [
    {
        path: 'jobseeker-image-new',
        component: JobseekerImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker-image/:id/edit',
        component: JobseekerImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker-image/:id/delete',
        component: JobseekerImageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
