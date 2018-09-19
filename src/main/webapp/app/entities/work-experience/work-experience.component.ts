import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { WorkExperience } from './work-experience.model';
import { WorkExperienceService } from './work-experience.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-work-experience',
    templateUrl: './work-experience.component.html'
})
export class WorkExperienceComponent implements OnInit, OnDestroy {
workExperiences: WorkExperience[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private workExperienceService: WorkExperienceService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.workExperienceService.query().subscribe(
            (res: HttpResponse<WorkExperience[]>) => {
                this.workExperiences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkExperiences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WorkExperience) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInWorkExperiences() {
        this.eventSubscriber = this.eventManager.subscribe('workExperienceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
