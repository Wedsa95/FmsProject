import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { VacancyListing } from './vacancy-listing.model';
import { Skill } from '../skill/skill.model';
import { Degree } from '../degree/degree.model';
import { Branch } from '../branch/branch.model';

import { VacancyListingService } from './vacancy-listing.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-vacancy',
    templateUrl: './vacancy-listing.component.html'
})
export class VacancyListingComponent implements OnInit, OnDestroy {
vacancies: VacancyListing[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vacancyService: VacancyListingService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.vacancyService.query().subscribe(
            (res: HttpResponse<VacancyListing[]>) => {
                this.vacancies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVacancies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VacancyListing) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInVacancies() {
        this.eventSubscriber = this.eventManager.subscribe('vacancyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
