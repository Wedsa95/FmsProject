import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Presentation } from './presentation.model';
import { PresentationPopupService } from './presentation-popup.service';
import { PresentationService } from './presentation.service';

@Component({
    selector: 'jhi-presentation-delete-dialog',
    templateUrl: './presentation-delete-dialog.component.html'
})
export class PresentationDeleteDialogComponent {

    presentation: Presentation;

    constructor(
        private presentationService: PresentationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.presentationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'presentationListModification',
                content: 'Deleted an presentation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-presentation-delete-popup',
    template: ''
})
export class PresentationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private presentationPopupService: PresentationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.presentationPopupService
                .open(PresentationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
