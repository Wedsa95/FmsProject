import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobseekerVideo } from './jobseeker-video.model';
import { JobseekerVideoService } from './jobseeker-video.service';

@Component({
    selector: 'jhi-jobseeker-video-detail',
    templateUrl: './jobseeker-video-detail.component.html'
})
export class JobseekerVideoDetailComponent implements OnInit, OnDestroy {

    jobseekerVideo: JobseekerVideo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobseekerVideoService: JobseekerVideoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobseekerVideos();
    }

    load(id) {
        this.jobseekerVideoService.find(id)
            .subscribe((jobseekerVideoResponse: HttpResponse<JobseekerVideo>) => {
                this.jobseekerVideo = jobseekerVideoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobseekerVideos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobseekerVideoListModification',
            (response) => this.load(this.jobseekerVideo.id)
        );
    }
}
