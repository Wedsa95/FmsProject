import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Branch } from './branch.model';
import { BranchPopupService } from './branch-popup.service';
import { BranchService } from './branch.service';
import { Jobseeker, JobseekerService } from '../jobseeker';
import { Vacancy, VacancyService } from '../vacancy';

@Component({
    selector: 'jhi-branch-dialog',
    templateUrl: './branch-dialog.component.html'
})
export class BranchDialogComponent implements OnInit {

    branch: Branch;
    isSaving: boolean;

    jobseekers: Jobseeker[];

    vacancies: Vacancy[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private branchService: BranchService,
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
        if (this.branch.id !== undefined) {
            this.subscribeToSaveResponse(
                this.branchService.update(this.branch));
        } else {
            this.subscribeToSaveResponse(
                this.branchService.create(this.branch));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Branch>>) {
        result.subscribe((res: HttpResponse<Branch>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Branch) {
        this.eventManager.broadcast({ name: 'branchListModification', content: 'OK'});
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
    selector: 'jhi-branch-popup',
    template: ''
})
export class BranchPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private branchPopupService: BranchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.branchPopupService
                    .open(BranchDialogComponent as Component, params['id']);
            } else {
                this.branchPopupService
                    .open(BranchDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
