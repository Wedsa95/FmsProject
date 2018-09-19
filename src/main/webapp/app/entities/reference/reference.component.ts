import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Reference } from './reference.model';
import { ReferenceService } from './reference.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-reference',
    templateUrl: './reference.component.html'
})
export class ReferenceComponent implements OnInit, OnDestroy {
references: Reference[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private referenceService: ReferenceService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.referenceService.query().subscribe(
            (res: HttpResponse<Reference[]>) => {
                this.references = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Reference) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInReferences() {
        this.eventSubscriber = this.eventManager.subscribe('referenceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
