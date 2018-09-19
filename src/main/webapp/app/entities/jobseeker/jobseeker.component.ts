import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Jobseeker } from './jobseeker.model';
import { JobseekerService } from './jobseeker.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-jobseeker',
    templateUrl: './jobseeker.component.html'
})
export class JobseekerComponent implements OnInit, OnDestroy {
jobseekers: Jobseeker[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jobseekerService: JobseekerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jobseekerService.query().subscribe(
            (res: HttpResponse<Jobseeker[]>) => {
                this.jobseekers = res.body;
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
