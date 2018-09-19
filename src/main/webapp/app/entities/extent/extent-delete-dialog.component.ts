import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Extent } from './extent.model';
import { ExtentPopupService } from './extent-popup.service';
import { ExtentService } from './extent.service';

@Component({
    selector: 'jhi-extent-delete-dialog',
    templateUrl: './extent-delete-dialog.component.html'
})
export class ExtentDeleteDialogComponent {

    extent: Extent;

    constructor(
        private extentService: ExtentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.extentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'extentListModification',
                content: 'Deleted an extent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-extent-delete-popup',
    template: ''
})
export class ExtentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extentPopupService: ExtentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.extentPopupService
                .open(ExtentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
