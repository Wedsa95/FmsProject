import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Extent } from './extent.model';
import { ExtentService } from './extent.service';

@Component({
    selector: 'jhi-extent-detail',
    templateUrl: './extent-detail.component.html'
})
export class ExtentDetailComponent implements OnInit, OnDestroy {

    extent: Extent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private extentService: ExtentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExtents();
    }

    load(id) {
        this.extentService.find(id)
            .subscribe((extentResponse: HttpResponse<Extent>) => {
                this.extent = extentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExtents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'extentListModification',
            (response) => this.load(this.extent.id)
        );
    }
}
