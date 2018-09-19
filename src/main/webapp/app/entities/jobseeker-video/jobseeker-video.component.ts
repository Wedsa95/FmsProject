import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobseekerVideo } from './jobseeker-video.model';
import { JobseekerVideoService } from './jobseeker-video.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-jobseeker-video',
    templateUrl: './jobseeker-video.component.html'
})
export class JobseekerVideoComponent implements OnInit, OnDestroy {
jobseekerVideos: JobseekerVideo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jobseekerVideoService: JobseekerVideoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jobseekerVideoService.query().subscribe(
            (res: HttpResponse<JobseekerVideo[]>) => {
                this.jobseekerVideos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJobseekerVideos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JobseekerVideo) {
        return item.id;
    }
    registerChangeInJobseekerVideos() {
        this.eventSubscriber = this.eventManager.subscribe('jobseekerVideoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
