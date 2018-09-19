import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Presentation } from './presentation.model';
import { PresentationService } from './presentation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-presentation',
    templateUrl: './presentation.component.html'
})
export class PresentationComponent implements OnInit, OnDestroy {
presentations: Presentation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private presentationService: PresentationService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.presentationService.query().subscribe(
            (res: HttpResponse<Presentation[]>) => {
                this.presentations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPresentations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Presentation) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInPresentations() {
        this.eventSubscriber = this.eventManager.subscribe('presentationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
