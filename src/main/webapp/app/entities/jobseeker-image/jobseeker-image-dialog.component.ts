import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobseekerImage } from './jobseeker-image.model';
import { JobseekerImagePopupService } from './jobseeker-image-popup.service';
import { JobseekerImageService } from './jobseeker-image.service';

@Component({
    selector: 'jhi-jobseeker-image-dialog',
    templateUrl: './jobseeker-image-dialog.component.html'
})
export class JobseekerImageDialogComponent implements OnInit {

    jobseekerImage: JobseekerImage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jobseekerImageService: JobseekerImageService,
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
        if (this.jobseekerImage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobseekerImageService.update(this.jobseekerImage));
        } else {
            this.subscribeToSaveResponse(
                this.jobseekerImageService.create(this.jobseekerImage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobseekerImage>>) {
        result.subscribe((res: HttpResponse<JobseekerImage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobseekerImage) {
        this.eventManager.broadcast({ name: 'jobseekerImageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-jobseeker-image-popup',
    template: ''
})
export class JobseekerImagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobseekerImagePopupService: JobseekerImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobseekerImagePopupService
                    .open(JobseekerImageDialogComponent as Component, params['id']);
            } else {
                this.jobseekerImagePopupService
                    .open(JobseekerImageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
