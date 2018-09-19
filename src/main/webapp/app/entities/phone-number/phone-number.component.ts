import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhoneNumber } from './phone-number.model';
import { PhoneNumberService } from './phone-number.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-phone-number',
    templateUrl: './phone-number.component.html'
})
export class PhoneNumberComponent implements OnInit, OnDestroy {
phoneNumbers: PhoneNumber[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private phoneNumberService: PhoneNumberService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.phoneNumberService.query().subscribe(
            (res: HttpResponse<PhoneNumber[]>) => {
                this.phoneNumbers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPhoneNumbers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PhoneNumber) {
        return item.id;
    }
    registerChangeInPhoneNumbers() {
        this.eventSubscriber = this.eventManager.subscribe('phoneNumberListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
