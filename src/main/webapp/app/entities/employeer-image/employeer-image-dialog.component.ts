import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmployeerImage } from './employeer-image.model';
import { EmployeerImagePopupService } from './employeer-image-popup.service';
import { EmployeerImageService } from './employeer-image.service';
import { Employeer, EmployeerService } from '../employeer';

@Component({
    selector: 'jhi-employeer-image-dialog',
    templateUrl: './employeer-image-dialog.component.html'
})
export class EmployeerImageDialogComponent implements OnInit {

    employeerImage: EmployeerImage;
    isSaving: boolean;

    employeers: Employeer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private employeerImageService: EmployeerImageService,
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
        if (this.employeerImage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeerImageService.update(this.employeerImage));
        } else {
            this.subscribeToSaveResponse(
                this.employeerImageService.create(this.employeerImage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EmployeerImage>>) {
        result.subscribe((res: HttpResponse<EmployeerImage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EmployeerImage) {
        this.eventManager.broadcast({ name: 'employeerImageListModification', content: 'OK'});
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
    selector: 'jhi-employeer-image-popup',
    template: ''
})
export class EmployeerImagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeerImagePopupService: EmployeerImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.employeerImagePopupService
                    .open(EmployeerImageDialogComponent as Component, params['id']);
            } else {
                this.employeerImagePopupService
                    .open(EmployeerImageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
