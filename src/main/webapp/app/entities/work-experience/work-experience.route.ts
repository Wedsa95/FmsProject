import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WorkExperienceComponent } from './work-experience.component';
import { WorkExperienceDetailComponent } from './work-experience-detail.component';
import { WorkExperiencePopupComponent } from './work-experience-dialog.component';
import { WorkExperienceDeletePopupComponent } from './work-experience-delete-dialog.component';

export const workExperienceRoute: Routes = [
    {
        path: 'work-experience',
        component: WorkExperienceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'work-experience/:id',
        component: WorkExperienceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workExperiencePopupRoute: Routes = [
    {
        path: 'work-experience-new',
        component: WorkExperiencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-experience/:id/edit',
        component: WorkExperiencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-experience/:id/delete',
        component: WorkExperienceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
