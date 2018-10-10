import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VacancyListing } from './vacancy-listing.model';
import { VacancyListingPopupService } from './vacancy-listing-popup.service';
import { VacancyListingService } from './vacancy-listing.service';

@Component({
    selector: 'jhi-vacancy-listing-delete-dialog',
    templateUrl: './vacancy-listing-delete-dialog.component.html'
})
export class VacancyListingDeleteDialogComponent {

    vacancy: VacancyListing;

    constructor(
        private vacancyService: VacancyListingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vacancyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vacancyListingListModification',
                content: 'Deleted an vacancy'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vacancy-listing-delete-popup',
    template: ''
})
export class VacancyListingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vacancyPopupService: VacancyListingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vacancyPopupService
                .open(VacancyListingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
