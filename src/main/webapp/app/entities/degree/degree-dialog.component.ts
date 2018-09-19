import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Degree } from './degree.model';
import { DegreePopupService } from './degree-popup.service';
import { DegreeService } from './degree.service';

@Component({
    selector: 'jhi-degree-dialog',
    templateUrl: './degree-dialog.component.html'
})
export class DegreeDialogComponent implements OnInit {

    degree: Degree;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private degreeService: DegreeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.degree.id !== undefined) {
            this.subscribeToSaveResponse(
                this.degreeService.update(this.degree));
        } else {
            this.subscribeToSaveResponse(
                this.degreeService.create(this.degree));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Degree>>) {
        result.subscribe((res: HttpResponse<Degree>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Degree) {
        this.eventManager.broadcast({ name: 'degreeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-degree-popup',
    template: ''
})
export class DegreePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private degreePopupService: DegreePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.degreePopupService
                    .open(DegreeDialogComponent as Component, params['id']);
            } else {
                this.degreePopupService
                    .open(DegreeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
