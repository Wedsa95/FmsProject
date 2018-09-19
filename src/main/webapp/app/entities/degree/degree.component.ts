import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Degree } from './degree.model';
import { DegreeService } from './degree.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-degree',
    templateUrl: './degree.component.html'
})
export class DegreeComponent implements OnInit, OnDestroy {
degrees: Degree[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private degreeService: DegreeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.degreeService.query().subscribe(
            (res: HttpResponse<Degree[]>) => {
                this.degrees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDegrees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Degree) {
        return item.id;
    }
    registerChangeInDegrees() {
        this.eventSubscriber = this.eventManager.subscribe('degreeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
