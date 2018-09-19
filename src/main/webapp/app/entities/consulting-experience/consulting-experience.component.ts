import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConsultingExperience } from './consulting-experience.model';
import { ConsultingExperienceService } from './consulting-experience.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-consulting-experience',
    templateUrl: './consulting-experience.component.html'
})
export class ConsultingExperienceComponent implements OnInit, OnDestroy {
consultingExperiences: ConsultingExperience[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private consultingExperienceService: ConsultingExperienceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.consultingExperienceService.query().subscribe(
            (res: HttpResponse<ConsultingExperience[]>) => {
                this.consultingExperiences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInConsultingExperiences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ConsultingExperience) {
        return item.id;
    }
    registerChangeInConsultingExperiences() {
        this.eventSubscriber = this.eventManager.subscribe('consultingExperienceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
