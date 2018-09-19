import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobseekerVideo } from './jobseeker-video.model';
import { JobseekerVideoPopupService } from './jobseeker-video-popup.service';
import { JobseekerVideoService } from './jobseeker-video.service';

@Component({
    selector: 'jhi-jobseeker-video-dialog',
    templateUrl: './jobseeker-video-dialog.component.html'
})
export class JobseekerVideoDialogComponent implements OnInit {

    jobseekerVideo: JobseekerVideo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jobseekerVideoService: JobseekerVideoService,
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
        if (this.jobseekerVideo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobseekerVideoService.update(this.jobseekerVideo));
        } else {
            this.subscribeToSaveResponse(
                this.jobseekerVideoService.create(this.jobseekerVideo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobseekerVideo>>) {
        result.subscribe((res: HttpResponse<JobseekerVideo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobseekerVideo) {
        this.eventManager.broadcast({ name: 'jobseekerVideoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-jobseeker-video-popup',
    template: ''
})
export class JobseekerVideoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobseekerVideoPopupService: JobseekerVideoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobseekerVideoPopupService
                    .open(JobseekerVideoDialogComponent as Component, params['id']);
            } else {
                this.jobseekerVideoPopupService
                    .open(JobseekerVideoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
