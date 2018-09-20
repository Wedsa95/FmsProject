import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Employeer } from './employeer-profile.model';
import { EmployeerProfileService } from './employeer-profile.service';

@Component({
    selector: 'jhi-employeer-profile-detail',
    templateUrl: './employeer-profile-detail.component.html'
})
export class EmployeerProfileDetailComponent implements OnInit, OnDestroy {

    employeer: Employeer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private employeerService: EmployeerProfileService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmployeers();
    }

    load(id) {
        this.employeerService.find(id)
            .subscribe((employeerResponse: HttpResponse<Employeer>) => {
                this.employeer = employeerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployeers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeerProfileListModification',
            (response) => this.load(this.employeer.id)
        );
    }
}
