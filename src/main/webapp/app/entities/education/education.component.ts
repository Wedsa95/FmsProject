import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Education } from './education.model';
import { EducationService } from './education.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-education',
    templateUrl: './education.component.html'
})
export class EducationComponent implements OnInit, OnDestroy {
educations: Education[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private educationService: EducationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.educationService.query().subscribe(
            (res: HttpResponse<Education[]>) => {
                this.educations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEducations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Education) {
        return item.id;
    }
    registerChangeInEducations() {
        this.eventSubscriber = this.eventManager.subscribe('educationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
