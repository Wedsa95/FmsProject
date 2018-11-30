import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Jobseeker } from './jobseeker-profile.model';
import { Education } from '../education/education.model';
import { JobseekerProfileService } from './jobseeker-profile.service';
import { Principal } from '../../shared';
import { WorkExperience } from '../work-experience/work-experience.model';
import { DurationPipe } from '../../shared/util-pipes/duration.pipe';
import { Degree, DegreeService } from '../degree';
import { ConsultingExperience, ConsultingExperienceService } from '../consulting-experience';

@Component({
    selector: 'jhi-jobseeker-private',
    templateUrl: './jobseeker-profile-private.component.html'
})
export class JobseekerProfilePrivateComponent implements OnInit, OnDestroy {
    jobseeker: Jobseeker;
    currentAccount: any;
    eventSubscriber: Subscription;
    educationDuration: any[];
    workExperienceDurration: any[];

    constructor(
        private jobseekerService: JobseekerProfileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jobseekerService.current().subscribe(
            (res: HttpResponse<Jobseeker>) => {
                this.jobseeker = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJobseekers();
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Jobseeker) {
        return item.id;
    }
    registerChangeInJobseekers() {
        this.eventSubscriber = this.eventManager.subscribe('jobseekerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
