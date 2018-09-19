import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeerImage } from './employeer-image.model';
import { EmployeerImageService } from './employeer-image.service';

@Component({
    selector: 'jhi-employeer-image-detail',
    templateUrl: './employeer-image-detail.component.html'
})
export class EmployeerImageDetailComponent implements OnInit, OnDestroy {

    employeerImage: EmployeerImage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private employeerImageService: EmployeerImageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmployeerImages();
    }

    load(id) {
        this.employeerImageService.find(id)
            .subscribe((employeerImageResponse: HttpResponse<EmployeerImage>) => {
                this.employeerImage = employeerImageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployeerImages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeerImageListModification',
            (response) => this.load(this.employeerImage.id)
        );
    }
}
