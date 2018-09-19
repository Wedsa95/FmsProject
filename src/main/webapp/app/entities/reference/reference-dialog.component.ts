import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Reference } from './reference.model';
import { ReferencePopupService } from './reference-popup.service';
import { ReferenceService } from './reference.service';
import { Jobseeker, JobseekerService } from '../jobseeker';

@Component({
    selector: 'jhi-reference-dialog',
    templateUrl: './reference-dialog.component.html'
})
export class ReferenceDialogComponent implements OnInit {

    reference: Reference;
    isSaving: boolean;

    jobseekers: Jobseeker[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private referenceService: ReferenceService,
        private jobseekerService: JobseekerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jobseekerService.query()
            .subscribe((res: HttpResponse<Jobseeker[]>) => { this.jobseekers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reference.id !== undefined) {
            this.subscribeToSaveResponse(
                this.referenceService.update(this.reference));
        } else {
            this.subscribeToSaveResponse(
                this.referenceService.create(this.reference));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Reference>>) {
        result.subscribe((res: HttpResponse<Reference>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Reference) {
        this.eventManager.broadcast({ name: 'referenceListModification', content: 'OK'});
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
    selector: 'jhi-reference-popup',
    template: ''
})
export class ReferencePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private referencePopupService: ReferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.referencePopupService
                    .open(ReferenceDialogComponent as Component, params['id']);
            } else {
                this.referencePopupService
                    .open(ReferenceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
