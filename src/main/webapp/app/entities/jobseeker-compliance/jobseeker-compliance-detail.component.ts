import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobseekerCompliance } from './jobseeker-compliance.model';
import { JobseekerComplianceService } from './jobseeker-compliance.service';

@Component({
    selector: 'jhi-jobseeker-compliance-detail',
    templateUrl: './jobseeker-compliance-detail.component.html'
})
export class JobseekerComplianceDetailComponent implements OnInit, OnDestroy {

    jobseekerCompliance: JobseekerCompliance;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobseekerComplianceService: JobseekerComplianceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobseekerCompliances();
    }

    load(id) {
        this.jobseekerComplianceService.find(id)
            .subscribe((jobseekerComplianceResponse: HttpResponse<JobseekerCompliance>) => {
                this.jobseekerCompliance = jobseekerComplianceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobseekerCompliances() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobseekerComplianceListModification',
            (response) => this.load(this.jobseekerCompliance.id)
        );
    }
}
