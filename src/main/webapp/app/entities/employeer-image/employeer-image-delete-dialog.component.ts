import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeerImage } from './employeer-image.model';
import { EmployeerImagePopupService } from './employeer-image-popup.service';
import { EmployeerImageService } from './employeer-image.service';

@Component({
    selector: 'jhi-employeer-image-delete-dialog',
    templateUrl: './employeer-image-delete-dialog.component.html'
})
export class EmployeerImageDeleteDialogComponent {

    employeerImage: EmployeerImage;

    constructor(
        private employeerImageService: EmployeerImageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeerImageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employeerImageListModification',
                content: 'Deleted an employeerImage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employeer-image-delete-popup',
    template: ''
})
export class EmployeerImageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeerImagePopupService: EmployeerImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.employeerImagePopupService
                .open(EmployeerImageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
