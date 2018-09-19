import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobseekerImage } from './jobseeker-image.model';
import { JobseekerImageService } from './jobseeker-image.service';

@Component({
    selector: 'jhi-jobseeker-image-detail',
    templateUrl: './jobseeker-image-detail.component.html'
})
export class JobseekerImageDetailComponent implements OnInit, OnDestroy {

    jobseekerImage: JobseekerImage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobseekerImageService: JobseekerImageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobseekerImages();
    }

    load(id) {
        this.jobseekerImageService.find(id)
            .subscribe((jobseekerImageResponse: HttpResponse<JobseekerImage>) => {
                this.jobseekerImage = jobseekerImageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobseekerImages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobseekerImageListModification',
            (response) => this.load(this.jobseekerImage.id)
        );
    }
}
