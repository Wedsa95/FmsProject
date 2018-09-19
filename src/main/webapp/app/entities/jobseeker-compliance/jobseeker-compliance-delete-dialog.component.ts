import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobseekerCompliance } from './jobseeker-compliance.model';
import { JobseekerCompliancePopupService } from './jobseeker-compliance-popup.service';
import { JobseekerComplianceService } from './jobseeker-compliance.service';

@Component({
    selector: 'jhi-jobseeker-compliance-delete-dialog',
    templateUrl: './jobseeker-compliance-delete-dialog.component.html'
})
export class JobseekerComplianceDeleteDialogComponent {

    jobseekerCompliance: JobseekerCompliance;

    constructor(
        private jobseekerComplianceService: JobseekerComplianceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobseekerComplianceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jobseekerComplianceListModification',
                content: 'Deleted an jobseekerCompliance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jobseeker-compliance-delete-popup',
    template: ''
})
export class JobseekerComplianceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobseekerCompliancePopupService: JobseekerCompliancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jobseekerCompliancePopupService
                .open(JobseekerComplianceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
