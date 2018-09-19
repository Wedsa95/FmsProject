import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Extent } from './extent.model';
import { ExtentService } from './extent.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-extent',
    templateUrl: './extent.component.html'
})
export class ExtentComponent implements OnInit, OnDestroy {
extents: Extent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private extentService: ExtentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.extentService.query().subscribe(
            (res: HttpResponse<Extent[]>) => {
                this.extents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExtents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Extent) {
        return item.id;
    }
    registerChangeInExtents() {
        this.eventSubscriber = this.eventManager.subscribe('extentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
