import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Email } from './email.model';
import { EmailPopupService } from './email-popup.service';
import { EmailService } from './email.service';
import { Jobseeker, JobseekerService } from '../jobseeker';

@Component({
    selector: 'jhi-email-dialog',
    templateUrl: './email-dialog.component.html'
})
export class EmailDialogComponent implements OnInit {

    email: Email;
    isSaving: boolean;

    jobseekers: Jobseeker[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emailService: EmailService,
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
        if (this.email.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emailService.update(this.email));
        } else {
            this.subscribeToSaveResponse(
                this.emailService.create(this.email));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Email>>) {
        result.subscribe((res: HttpResponse<Email>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Email) {
        this.eventManager.broadcast({ name: 'emailListModification', content: 'OK'});
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
    selector: 'jhi-email-popup',
    template: ''
})
export class EmailPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emailPopupService: EmailPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emailPopupService
                    .open(EmailDialogComponent as Component, params['id']);
            } else {
                this.emailPopupService
                    .open(EmailDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
