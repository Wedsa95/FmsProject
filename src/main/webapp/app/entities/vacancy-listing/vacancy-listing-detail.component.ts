import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { VacancyListing } from './vacancy-listing.model';
import { VacancyListingService } from './vacancy-listing.service';

@Component({
    selector: 'jhi-vacancy-listing-detail',
    templateUrl: './vacancy-listing-detail.component.html'
})
export class VacancyListingDetailComponent implements OnInit, OnDestroy {

    vacancy: VacancyListing;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    ratingCubes: string;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private vacancyService: VacancyListingService,
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
            .subscribe((vacancyResponse: HttpResponse<VacancyListing>) => {
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
