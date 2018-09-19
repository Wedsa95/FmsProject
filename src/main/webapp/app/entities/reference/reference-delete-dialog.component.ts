import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Reference } from './reference.model';
import { ReferencePopupService } from './reference-popup.service';
import { ReferenceService } from './reference.service';

@Component({
    selector: 'jhi-reference-delete-dialog',
    templateUrl: './reference-delete-dialog.component.html'
})
export class ReferenceDeleteDialogComponent {

    reference: Reference;

    constructor(
        private referenceService: ReferenceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.referenceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'referenceListModification',
                content: 'Deleted an reference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reference-delete-popup',
    template: ''
})
export class ReferenceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private referencePopupService: ReferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.referencePopupService
                .open(ReferenceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
