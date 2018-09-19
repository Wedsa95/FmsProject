import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeerCompliance } from './employeer-compliance.model';
import { EmployeerCompliancePopupService } from './employeer-compliance-popup.service';
import { EmployeerComplianceService } from './employeer-compliance.service';

@Component({
    selector: 'jhi-employeer-compliance-delete-dialog',
    templateUrl: './employeer-compliance-delete-dialog.component.html'
})
export class EmployeerComplianceDeleteDialogComponent {

    employeerCompliance: EmployeerCompliance;

    constructor(
        private employeerComplianceService: EmployeerComplianceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeerComplianceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employeerComplianceListModification',
                content: 'Deleted an employeerCompliance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employeer-compliance-delete-popup',
    template: ''
})
export class EmployeerComplianceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeerCompliancePopupService: EmployeerCompliancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.employeerCompliancePopupService
                .open(EmployeerComplianceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
