import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Degree } from './degree.model';
import { DegreeService } from './degree.service';

@Component({
    selector: 'jhi-degree-detail',
    templateUrl: './degree-detail.component.html'
})
export class DegreeDetailComponent implements OnInit, OnDestroy {

    degree: Degree;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private degreeService: DegreeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDegrees();
    }

    load(id) {
        this.degreeService.find(id)
            .subscribe((degreeResponse: HttpResponse<Degree>) => {
                this.degree = degreeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDegrees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'degreeListModification',
            (response) => this.load(this.degree.id)
        );
    }
}
