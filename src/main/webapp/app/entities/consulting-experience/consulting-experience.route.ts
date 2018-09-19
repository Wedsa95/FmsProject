import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ConsultingExperienceComponent } from './consulting-experience.component';
import { ConsultingExperienceDetailComponent } from './consulting-experience-detail.component';
import { ConsultingExperiencePopupComponent } from './consulting-experience-dialog.component';
import { ConsultingExperienceDeletePopupComponent } from './consulting-experience-delete-dialog.component';

export const consultingExperienceRoute: Routes = [
    {
        path: 'consulting-experience',
        component: ConsultingExperienceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.consultingExperience.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'consulting-experience/:id',
        component: ConsultingExperienceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.consultingExperience.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consultingExperiencePopupRoute: Routes = [
    {
        path: 'consulting-experience-new',
        component: ConsultingExperiencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.consultingExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'consulting-experience/:id/edit',
        component: ConsultingExperiencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.consultingExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'consulting-experience/:id/delete',
        component: ConsultingExperienceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.consultingExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
