import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SkillComponent } from './skill.component';
import { SkillDetailComponent } from './skill-detail.component';
import { SkillPopupComponent } from './skill-dialog.component';
import { SkillDeletePopupComponent } from './skill-delete-dialog.component';

export const skillRoute: Routes = [
    {
        path: 'skill',
        component: SkillComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'skill/:id',
        component: SkillDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skillPopupRoute: Routes = [
    {
        path: 'skill-new',
        component: SkillPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skill/:id/edit',
        component: SkillPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skill/:id/delete',
        component: SkillDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.skill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
