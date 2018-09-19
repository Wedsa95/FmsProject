import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Extent } from './extent.model';
import { ExtentPopupService } from './extent-popup.service';
import { ExtentService } from './extent.service';
import { Jobseeker, JobseekerService } from '../jobseeker';
import { Vacancy, VacancyService } from '../vacancy';

@Component({
    selector: 'jhi-extent-dialog',
    templateUrl: './extent-dialog.component.html'
})
export class ExtentDialogComponent implements OnInit {

    extent: Extent;
    isSaving: boolean;

    jobseekers: Jobseeker[];

    vacancies: Vacancy[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private extentService: ExtentService,
        private jobseekerService: JobseekerService,
        private vacancyService: VacancyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jobseekerService.query()
            .subscribe((res: HttpResponse<Jobseeker[]>) => { this.jobseekers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.vacancyService.query()
            .subscribe((res: HttpResponse<Vacancy[]>) => { this.vacancies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.extent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.extentService.update(this.extent));
        } else {
            this.subscribeToSaveResponse(
                this.extentService.create(this.extent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Extent>>) {
        result.subscribe((res: HttpResponse<Extent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Extent) {
        this.eventManager.broadcast({ name: 'extentListModification', content: 'OK'});
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

    trackVacancyById(index: number, item: Vacancy) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-extent-popup',
    template: ''
})
export class ExtentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extentPopupService: ExtentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.extentPopupService
                    .open(ExtentDialogComponent as Component, params['id']);
            } else {
                this.extentPopupService
                    .open(ExtentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
