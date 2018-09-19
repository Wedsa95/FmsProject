import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Skill } from './skill.model';
import { SkillPopupService } from './skill-popup.service';
import { SkillService } from './skill.service';
import { Jobseeker, JobseekerService } from '../jobseeker';
import { Vacancy, VacancyService } from '../vacancy';

@Component({
    selector: 'jhi-skill-dialog',
    templateUrl: './skill-dialog.component.html'
})
export class SkillDialogComponent implements OnInit {

    skill: Skill;
    isSaving: boolean;

    jobseekers: Jobseeker[];

    vacancies: Vacancy[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private skillService: SkillService,
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
        if (this.skill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skillService.update(this.skill));
        } else {
            this.subscribeToSaveResponse(
                this.skillService.create(this.skill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Skill>>) {
        result.subscribe((res: HttpResponse<Skill>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Skill) {
        this.eventManager.broadcast({ name: 'skillListModification', content: 'OK'});
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
    selector: 'jhi-skill-popup',
    template: ''
})
export class SkillPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillPopupService: SkillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.skillPopupService
                    .open(SkillDialogComponent as Component, params['id']);
            } else {
                this.skillPopupService
                    .open(SkillDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
