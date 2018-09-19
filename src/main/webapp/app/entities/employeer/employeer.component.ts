import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Employeer } from './employeer.model';
import { EmployeerService } from './employeer.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-employeer',
    templateUrl: './employeer.component.html'
})
export class EmployeerComponent implements OnInit, OnDestroy {
employeers: Employeer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private employeerService: EmployeerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.employeerService.query().subscribe(
            (res: HttpResponse<Employeer[]>) => {
                this.employeers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployeers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Employeer) {
        return item.id;
    }
    registerChangeInEmployeers() {
        this.eventSubscriber = this.eventManager.subscribe('employeerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
