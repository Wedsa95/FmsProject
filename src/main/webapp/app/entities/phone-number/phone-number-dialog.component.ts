import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhoneNumber } from './phone-number.model';
import { PhoneNumberPopupService } from './phone-number-popup.service';
import { PhoneNumberService } from './phone-number.service';
import { Jobseeker, JobseekerService } from '../jobseeker';

@Component({
    selector: 'jhi-phone-number-dialog',
    templateUrl: './phone-number-dialog.component.html'
})
export class PhoneNumberDialogComponent implements OnInit {

    phoneNumber: PhoneNumber;
    isSaving: boolean;

    jobseekers: Jobseeker[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private phoneNumberService: PhoneNumberService,
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
        if (this.phoneNumber.id !== undefined) {
            this.subscribeToSaveResponse(
                this.phoneNumberService.update(this.phoneNumber));
        } else {
            this.subscribeToSaveResponse(
                this.phoneNumberService.create(this.phoneNumber));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PhoneNumber>>) {
        result.subscribe((res: HttpResponse<PhoneNumber>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PhoneNumber) {
        this.eventManager.broadcast({ name: 'phoneNumberListModification', content: 'OK'});
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
    selector: 'jhi-phone-number-popup',
    template: ''
})
export class PhoneNumberPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phoneNumberPopupService: PhoneNumberPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.phoneNumberPopupService
                    .open(PhoneNumberDialogComponent as Component, params['id']);
            } else {
                this.phoneNumberPopupService
                    .open(PhoneNumberDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
