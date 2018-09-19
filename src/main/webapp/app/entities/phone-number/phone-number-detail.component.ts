import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PhoneNumber } from './phone-number.model';
import { PhoneNumberService } from './phone-number.service';

@Component({
    selector: 'jhi-phone-number-detail',
    templateUrl: './phone-number-detail.component.html'
})
export class PhoneNumberDetailComponent implements OnInit, OnDestroy {

    phoneNumber: PhoneNumber;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private phoneNumberService: PhoneNumberService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPhoneNumbers();
    }

    load(id) {
        this.phoneNumberService.find(id)
            .subscribe((phoneNumberResponse: HttpResponse<PhoneNumber>) => {
                this.phoneNumber = phoneNumberResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPhoneNumbers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'phoneNumberListModification',
            (response) => this.load(this.phoneNumber.id)
        );
    }
}
