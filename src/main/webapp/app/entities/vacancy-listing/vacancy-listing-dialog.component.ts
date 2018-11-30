import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { VacancyListing } from './vacancy-listing.model';
import { VacancyListingPopupService } from './vacancy-listing-popup.service';
import { VacancyListingService } from './vacancy-listing.service';
import { Employeer, EmployeerService } from '../employeer';
import { Degree, DegreeService } from '../degree';
import { ConsultingExperience, ConsultingExperienceService } from '../consulting-experience';
import { Language, LanguageService } from '../language';
import { Autosize } from 'angular2-autosize';

@Component({
    selector: 'jhi-vacancy-listing-dialog',
    templateUrl: './vacancy-listing-dialog.component.html'
})
export class VacancyListingDialogComponent implements OnInit {

    vacancy: VacancyListing;
    isSaving: boolean;
    employeers: Employeer[];
    degrees: Degree[];
    languages: Language[];
    consultingexperiences: ConsultingExperience[];
    uploadDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private vacancyService: VacancyListingService,
        private languageService: LanguageService,
        private employeerService: EmployeerService,
        private degreeService: DegreeService,
        private consultingExperienceService: ConsultingExperienceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeerService.query()
            .subscribe((res: HttpResponse<Employeer[]>) => { this.employeers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.degreeService
            .query({filter: 'vacancy-is-null'})
            .subscribe((res: HttpResponse<Degree[]>) => {
                if (!this.vacancy.degree || !this.vacancy.degree.id) {
                    this.degrees = res.body;
                } else {
                    this.degreeService
                        .find(this.vacancy.degree.id)
                        .subscribe((subRes: HttpResponse<Degree>) => {
                            this.degrees = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.consultingExperienceService
            .query({filter: 'vacancy-is-null'})
            .subscribe((res: HttpResponse<ConsultingExperience[]>) => {
                if (!this.vacancy.consultingExperience || !this.vacancy.consultingExperience.id) {
                    this.consultingexperiences = res.body;
                } else {
                    this.consultingExperienceService
                        .find(this.vacancy.consultingExperience.id)
                        .subscribe((subRes: HttpResponse<ConsultingExperience>) => {
                            this.consultingexperiences = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.vacancy.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vacancyService.update(this.vacancy));
        } else {
            this.subscribeToSaveResponse(
                this.vacancyService.create(this.vacancy));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VacancyListing>>) {
        result.subscribe((res: HttpResponse<VacancyListing>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VacancyListing) {
        this.eventManager.broadcast({ name: 'vacancyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmployeerById(index: number, item: Employeer) {
        return item.id;
    }

    trackDegreeById(index: number, item: Degree) {
        return item.id;
    }

    trackConsultingExperienceById(index: number, item: ConsultingExperience) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vacancy-listing-popup',
    template: ''
})
export class VacancyListingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vacancyPopupService: VacancyListingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vacancyPopupService
                    .open(VacancyListingDialogComponent as Component, params['id']);
            } else {
                this.vacancyPopupService
                    .open(VacancyListingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
