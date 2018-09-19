import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobseekerCompliance } from './jobseeker-compliance.model';
import { JobseekerComplianceService } from './jobseeker-compliance.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-jobseeker-compliance',
    templateUrl: './jobseeker-compliance.component.html'
})
export class JobseekerComplianceComponent implements OnInit, OnDestroy {
jobseekerCompliances: JobseekerCompliance[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jobseekerComplianceService: JobseekerComplianceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jobseekerComplianceService.query().subscribe(
            (res: HttpResponse<JobseekerCompliance[]>) => {
                this.jobseekerCompliances = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJobseekerCompliances();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JobseekerCompliance) {
        return item.id;
    }
    registerChangeInJobseekerCompliances() {
        this.eventSubscriber = this.eventManager.subscribe('jobseekerComplianceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
