import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ConsultingExperience } from './consulting-experience.model';
import { ConsultingExperienceService } from './consulting-experience.service';

@Component({
    selector: 'jhi-consulting-experience-detail',
    templateUrl: './consulting-experience-detail.component.html'
})
export class ConsultingExperienceDetailComponent implements OnInit, OnDestroy {

    consultingExperience: ConsultingExperience;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private consultingExperienceService: ConsultingExperienceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConsultingExperiences();
    }

    load(id) {
        this.consultingExperienceService.find(id)
            .subscribe((consultingExperienceResponse: HttpResponse<ConsultingExperience>) => {
                this.consultingExperience = consultingExperienceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConsultingExperiences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'consultingExperienceListModification',
            (response) => this.load(this.consultingExperience.id)
        );
    }
}
