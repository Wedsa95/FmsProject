import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConsultingExperience } from './consulting-experience.model';
import { ConsultingExperiencePopupService } from './consulting-experience-popup.service';
import { ConsultingExperienceService } from './consulting-experience.service';
import { Jobseeker, JobseekerService } from '../jobseeker';

@Component({
    selector: 'jhi-consulting-experience-dialog',
    templateUrl: './consulting-experience-dialog.component.html'
})
export class ConsultingExperienceDialogComponent implements OnInit {

    consultingExperience: ConsultingExperience;
    isSaving: boolean;

    jobseekers: Jobseeker[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private consultingExperienceService: ConsultingExperienceService,
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
        if (this.consultingExperience.id !== undefined) {
            this.subscribeToSaveResponse(
                this.consultingExperienceService.update(this.consultingExperience));
        } else {
            this.subscribeToSaveResponse(
                this.consultingExperienceService.create(this.consultingExperience));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ConsultingExperience>>) {
        result.subscribe((res: HttpResponse<ConsultingExperience>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ConsultingExperience) {
        this.eventManager.broadcast({ name: 'consultingExperienceListModification', content: 'OK'});
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
    selector: 'jhi-consulting-experience-popup',
    template: ''
})
export class ConsultingExperiencePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private consultingExperiencePopupService: ConsultingExperiencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.consultingExperiencePopupService
                    .open(ConsultingExperienceDialogComponent as Component, params['id']);
            } else {
                this.consultingExperiencePopupService
                    .open(ConsultingExperienceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
