import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Email } from './email.model';
import { EmailService } from './email.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-email',
    templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit, OnDestroy {
emails: Email[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emailService: EmailService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emailService.query().subscribe(
            (res: HttpResponse<Email[]>) => {
                this.emails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Email) {
        return item.id;
    }
    registerChangeInEmails() {
        this.eventSubscriber = this.eventManager.subscribe('emailListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
