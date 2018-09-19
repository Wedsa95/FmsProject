import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Vacancy } from './vacancy.model';
import { VacancyService } from './vacancy.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-vacancy',
    templateUrl: './vacancy.component.html'
})
export class VacancyComponent implements OnInit, OnDestroy {
vacancies: Vacancy[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vacancyService: VacancyService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.vacancyService.query().subscribe(
            (res: HttpResponse<Vacancy[]>) => {
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

    trackId(index: number, item: Vacancy) {
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
