import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeerCompliance } from './employeer-compliance.model';
import { EmployeerComplianceService } from './employeer-compliance.service';

@Component({
    selector: 'jhi-employeer-compliance-detail',
    templateUrl: './employeer-compliance-detail.component.html'
})
export class EmployeerComplianceDetailComponent implements OnInit, OnDestroy {

    employeerCompliance: EmployeerCompliance;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private employeerComplianceService: EmployeerComplianceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmployeerCompliances();
    }

    load(id) {
        this.employeerComplianceService.find(id)
            .subscribe((employeerComplianceResponse: HttpResponse<EmployeerCompliance>) => {
                this.employeerCompliance = employeerComplianceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployeerCompliances() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeerComplianceListModification',
            (response) => this.load(this.employeerCompliance.id)
        );
    }
}
