import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Jobseeker } from './jobseeker.model';
import { JobseekerService } from './jobseeker.service';

@Component({
    selector: 'jhi-jobseeker-detail',
    templateUrl: './jobseeker-detail.component.html'
})
export class JobseekerDetailComponent implements OnInit, OnDestroy {

    jobseeker: Jobseeker;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobseekerService: JobseekerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobseekers();
    }

    load(id) {
        this.jobseekerService.find(id)
            .subscribe((jobseekerResponse: HttpResponse<Jobseeker>) => {
                this.jobseeker = jobseekerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobseekers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobseekerListModification',
            (response) => this.load(this.jobseeker.id)
        );
    }
}
