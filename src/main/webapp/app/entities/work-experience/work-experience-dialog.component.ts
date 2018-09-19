import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { WorkExperience } from './work-experience.model';
import { WorkExperiencePopupService } from './work-experience-popup.service';
import { WorkExperienceService } from './work-experience.service';
import { Jobseeker, JobseekerService } from '../jobseeker';

@Component({
    selector: 'jhi-work-experience-dialog',
    templateUrl: './work-experience-dialog.component.html'
})
export class WorkExperienceDialogComponent implements OnInit {

    workExperience: WorkExperience;
    isSaving: boolean;

    jobseekers: Jobseeker[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private workExperienceService: WorkExperienceService,
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
        if (this.workExperience.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workExperienceService.update(this.workExperience));
        } else {
            this.subscribeToSaveResponse(
                this.workExperienceService.create(this.workExperience));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WorkExperience>>) {
        result.subscribe((res: HttpResponse<WorkExperience>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WorkExperience) {
        this.eventManager.broadcast({ name: 'workExperienceListModification', content: 'OK'});
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
    selector: 'jhi-work-experience-popup',
    template: ''
})
export class WorkExperiencePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workExperiencePopupService: WorkExperiencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.workExperiencePopupService
                    .open(WorkExperienceDialogComponent as Component, params['id']);
            } else {
                this.workExperiencePopupService
                    .open(WorkExperienceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
