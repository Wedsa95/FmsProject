import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Employeer } from './employeer-profile.model';
import { EmployeerProfileService } from './employeer-profile.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-employeer',
    templateUrl: './employeer-profile.component.html'
})
export class EmployeerProfileComponent implements OnInit, OnDestroy {
    employeer: Employeer;
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private employeerService: EmployeerProfileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.employeerService.current().subscribe(
            (res: HttpResponse<Employeer>) => {
                this.employeer = res.body;
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
