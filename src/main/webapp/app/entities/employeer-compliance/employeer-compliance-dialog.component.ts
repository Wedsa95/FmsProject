import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmployeerCompliance } from './employeer-compliance.model';
import { EmployeerCompliancePopupService } from './employeer-compliance-popup.service';
import { EmployeerComplianceService } from './employeer-compliance.service';
import { Employeer, EmployeerService } from '../employeer';

@Component({
    selector: 'jhi-employeer-compliance-dialog',
    templateUrl: './employeer-compliance-dialog.component.html'
})
export class EmployeerComplianceDialogComponent implements OnInit {

    employeerCompliance: EmployeerCompliance;
    isSaving: boolean;

    employeers: Employeer[];
    dateComplianceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private employeerComplianceService: EmployeerComplianceService,
        private employeerService: EmployeerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeerService.query()
            .subscribe((res: HttpResponse<Employeer[]>) => { this.employeers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.employeerCompliance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeerComplianceService.update(this.employeerCompliance));
        } else {
            this.subscribeToSaveResponse(
                this.employeerComplianceService.create(this.employeerCompliance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EmployeerCompliance>>) {
        result.subscribe((res: HttpResponse<EmployeerCompliance>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EmployeerCompliance) {
        this.eventManager.broadcast({ name: 'employeerComplianceListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-employeer-compliance-popup',
    template: ''
})
export class EmployeerCompliancePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeerCompliancePopupService: EmployeerCompliancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.employeerCompliancePopupService
                    .open(EmployeerComplianceDialogComponent as Component, params['id']);
            } else {
                this.employeerCompliancePopupService
                    .open(EmployeerComplianceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
