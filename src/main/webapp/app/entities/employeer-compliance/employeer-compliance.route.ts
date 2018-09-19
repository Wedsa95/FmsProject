import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeerComplianceComponent } from './employeer-compliance.component';
import { EmployeerComplianceDetailComponent } from './employeer-compliance-detail.component';
import { EmployeerCompliancePopupComponent } from './employeer-compliance-dialog.component';
import { EmployeerComplianceDeletePopupComponent } from './employeer-compliance-delete-dialog.component';

export const employeerComplianceRoute: Routes = [
    {
        path: 'employeer-compliance',
        component: EmployeerComplianceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employeer-compliance/:id',
        component: EmployeerComplianceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeerCompliancePopupRoute: Routes = [
    {
        path: 'employeer-compliance-new',
        component: EmployeerCompliancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employeer-compliance/:id/edit',
        component: EmployeerCompliancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employeer-compliance/:id/delete',
        component: EmployeerComplianceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fmsApp.employeerCompliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
