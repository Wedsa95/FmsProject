import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Jobseeker } from './jobseeker.model';
import { JobseekerPopupService } from './jobseeker-popup.service';
import { JobseekerService } from './jobseeker.service';
import { User, UserService } from '../../shared';
import { JobseekerImage, JobseekerImageService } from '../jobseeker-image';
import { JobseekerVideo, JobseekerVideoService } from '../jobseeker-video';
import { Presentation, PresentationService } from '../presentation';

@Component({
    selector: 'jhi-jobseeker-dialog',
    templateUrl: './jobseeker-dialog.component.html'
})
export class JobseekerDialogComponent implements OnInit {

    jobseeker: Jobseeker;
    isSaving: boolean;

    users: User[];

    images: JobseekerImage[];

    videos: JobseekerVideo[];

    presentations: Presentation[];
    regestrationDateDp: any;
    birthYearDp: any;
    lastActiveDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobseekerService: JobseekerService,
        private userService: UserService,
        private jobseekerImageService: JobseekerImageService,
        private jobseekerVideoService: JobseekerVideoService,
        private presentationService: PresentationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jobseekerImageService
            .query({filter: 'jobseeker-is-null'})
            .subscribe((res: HttpResponse<JobseekerImage[]>) => {
                if (!this.jobseeker.image || !this.jobseeker.image.id) {
                    this.images = res.body;
                } else {
                    this.jobseekerImageService
                        .find(this.jobseeker.image.id)
                        .subscribe((subRes: HttpResponse<JobseekerImage>) => {
                            this.images = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jobseekerVideoService
            .query({filter: 'jobseeker-is-null'})
            .subscribe((res: HttpResponse<JobseekerVideo[]>) => {
                if (!this.jobseeker.video || !this.jobseeker.video.id) {
                    this.videos = res.body;
                } else {
                    this.jobseekerVideoService
                        .find(this.jobseeker.video.id)
                        .subscribe((subRes: HttpResponse<JobseekerVideo>) => {
                            this.videos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.presentationService
            .query({filter: 'jobseeker-is-null'})
            .subscribe((res: HttpResponse<Presentation[]>) => {
                if (!this.jobseeker.presentation || !this.jobseeker.presentation.id) {
                    this.presentations = res.body;
                } else {
                    this.presentationService
                        .find(this.jobseeker.presentation.id)
                        .subscribe((subRes: HttpResponse<Presentation>) => {
                            this.presentations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jobseeker.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobseekerService.update(this.jobseeker));
        } else {
            this.subscribeToSaveResponse(
                this.jobseekerService.create(this.jobseeker));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Jobseeker>>) {
        result.subscribe((res: HttpResponse<Jobseeker>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Jobseeker) {
        this.eventManager.broadcast({ name: 'jobseekerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackJobseekerImageById(index: number, item: JobseekerImage) {
        return item.id;
    }

    trackJobseekerVideoById(index: number, item: JobseekerVideo) {
        return item.id;
    }

    trackPresentationById(index: number, item: Presentation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-jobseeker-popup',
    template: ''
})
export class JobseekerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobseekerPopupService: JobseekerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobseekerPopupService
                    .open(JobseekerDialogComponent as Component, params['id']);
            } else {
                this.jobseekerPopupService
                    .open(JobseekerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
