import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmployeerImage } from './employeer-image.model';
import { EmployeerImageService } from './employeer-image.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-employeer-image',
    templateUrl: './employeer-image.component.html'
})
export class EmployeerImageComponent implements OnInit, OnDestroy {
employeerImages: EmployeerImage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private employeerImageService: EmployeerImageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.employeerImageService.query().subscribe(
            (res: HttpResponse<EmployeerImage[]>) => {
                this.employeerImages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployeerImages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmployeerImage) {
        return item.id;
    }
    registerChangeInEmployeerImages() {
        this.eventSubscriber = this.eventManager.subscribe('employeerImageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
