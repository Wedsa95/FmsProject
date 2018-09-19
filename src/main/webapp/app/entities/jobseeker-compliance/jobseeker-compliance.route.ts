import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JobseekerComplianceComponent } from './jobseeker-compliance.component';
import { JobseekerComplianceDetailComponent } from './jobseeker-compliance-detail.component';
import { JobseekerCompliancePopupComponent } from './jobseeker-compliance-dialog.component';
import { JobseekerComplianceDeletePopupComponent } from './jobseeker-compliance-delete-dialog.component';

export const jobseekerComplianceRoute: Routes = [
    {
        path: 'jobseeker-compliance',
        component: JobseekerComplianceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jobseeker-compliance/:id',
        component: JobseekerComplianceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobseekerCompliancePopupRoute: Routes = [
    {
        path: 'jobseeker-compliance-new',
        component: JobseekerCompliancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker-compliance/:id/edit',
        component: JobseekerCompliancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobseeker-compliance/:id/delete',
        component: JobseekerComplianceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.jobseekerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
