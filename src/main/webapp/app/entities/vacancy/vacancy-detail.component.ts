import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Vacancy } from './vacancy.model';
import { VacancyService } from './vacancy.service';

@Component({
    selector: 'jhi-vacancy-detail',
    templateUrl: './vacancy-detail.component.html'
})
export class VacancyDetailComponent implements OnInit, OnDestroy {

    vacancy: Vacancy;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private vacancyService: VacancyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVacancies();
    }

    load(id) {
        this.vacancyService.find(id)
            .subscribe((vacancyResponse: HttpResponse<Vacancy>) => {
                this.vacancy = vacancyResponse.body;
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

    registerChangeInVacancies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vacancyListModification',
            (response) => this.load(this.vacancy.id)
        );
    }
}
