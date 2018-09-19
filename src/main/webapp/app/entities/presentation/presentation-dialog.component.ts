import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Presentation } from './presentation.model';
import { PresentationPopupService } from './presentation-popup.service';
import { PresentationService } from './presentation.service';

@Component({
    selector: 'jhi-presentation-dialog',
    templateUrl: './presentation-dialog.component.html'
})
export class PresentationDialogComponent implements OnInit {

    presentation: Presentation;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private presentationService: PresentationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.presentation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.presentationService.update(this.presentation));
        } else {
            this.subscribeToSaveResponse(
                this.presentationService.create(this.presentation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Presentation>>) {
        result.subscribe((res: HttpResponse<Presentation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Presentation) {
        this.eventManager.broadcast({ name: 'presentationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-presentation-popup',
    template: ''
})
export class PresentationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private presentationPopupService: PresentationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.presentationPopupService
                    .open(PresentationDialogComponent as Component, params['id']);
            } else {
                this.presentationPopupService
                    .open(PresentationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
