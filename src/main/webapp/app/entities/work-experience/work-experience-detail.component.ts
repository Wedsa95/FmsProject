import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { WorkExperience } from './work-experience.model';
import { WorkExperienceService } from './work-experience.service';

@Component({
    selector: 'jhi-work-experience-detail',
    templateUrl: './work-experience-detail.component.html'
})
export class WorkExperienceDetailComponent implements OnInit, OnDestroy {

    workExperience: WorkExperience;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private workExperienceService: WorkExperienceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWorkExperiences();
    }

    load(id) {
        this.workExperienceService.find(id)
            .subscribe((workExperienceResponse: HttpResponse<WorkExperience>) => {
                this.workExperience = workExperienceResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWorkExperiences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'workExperienceListModification',
            (response) => this.load(this.workExperience.id)
        );
    }
}
