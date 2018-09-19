import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobseekerCompliance } from './jobseeker-compliance.model';
import { JobseekerCompliancePopupService } from './jobseeker-compliance-popup.service';
import { JobseekerComplianceService } from './jobseeker-compliance.service';
import { Jobseeker, JobseekerService } from '../jobseeker';

@Component({
    selector: 'jhi-jobseeker-compliance-dialog',
    templateUrl: './jobseeker-compliance-dialog.component.html'
})
export class JobseekerComplianceDialogComponent implements OnInit {

    jobseekerCompliance: JobseekerCompliance;
    isSaving: boolean;

    jobseekers: Jobseeker[];
    dateComplianceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobseekerComplianceService: JobseekerComplianceService,
        private jobseekerService: JobseekerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jobseekerService.query()
            .subscribe((res: HttpResponse<Jobseeker[]>) => { this.jobseekers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jobseekerCompliance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobseekerComplianceService.update(this.jobseekerCompliance));
        } else {
            this.subscribeToSaveResponse(
                this.jobseekerComplianceService.create(this.jobseekerCompliance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobseekerCompliance>>) {
        result.subscribe((res: HttpResponse<JobseekerCompliance>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobseekerCompliance) {
        this.eventManager.broadcast({ name: 'jobseekerComplianceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJobseekerById(index: number, item: Jobseeker) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-jobseeker-compliance-popup',
    template: ''
})
export class JobseekerCompliancePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobseekerCompliancePopupService: JobseekerCompliancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobseekerCompliancePopupService
                    .open(JobseekerComplianceDialogComponent as Component, params['id']);
            } else {
                this.jobseekerCompliancePopupService
                    .open(JobseekerComplianceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
