import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Education } from './education.model';
import { EducationPopupService } from './education-popup.service';
import { EducationService } from './education.service';
import { Jobseeker, JobseekerService } from '../jobseeker';
import { Degree, DegreeService } from '../degree';

@Component({
    selector: 'jhi-education-dialog',
    templateUrl: './education-dialog.component.html'
})
export class EducationDialogComponent implements OnInit {

    education: Education;
    isSaving: boolean;

    jobseekers: Jobseeker[];

    degrees: Degree[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private educationService: EducationService,
        private jobseekerService: JobseekerService,
        private degreeService: DegreeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jobseekerService.query()
            .subscribe((res: HttpResponse<Jobseeker[]>) => { this.jobseekers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.degreeService
            .query({filter: 'education-is-null'})
            .subscribe((res: HttpResponse<Degree[]>) => {
                if (!this.education.degree || !this.education.degree.id) {
                    this.degrees = res.body;
                } else {
                    this.degreeService
                        .find(this.education.degree.id)
                        .subscribe((subRes: HttpResponse<Degree>) => {
                            this.degrees = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.education.id !== undefined) {
            this.subscribeToSaveResponse(
                this.educationService.update(this.education));
        } else {
            this.subscribeToSaveResponse(
                this.educationService.create(this.education));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Education>>) {
        result.subscribe((res: HttpResponse<Education>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Education) {
        this.eventManager.broadcast({ name: 'educationListModification', content: 'OK'});
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

    trackDegreeById(index: number, item: Degree) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-education-popup',
    template: ''
})
export class EducationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationPopupService: EducationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.educationPopupService
                    .open(EducationDialogComponent as Component, params['id']);
            } else {
                this.educationPopupService
                    .open(EducationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
