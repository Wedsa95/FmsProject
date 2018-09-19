import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Employeer } from './employeer.model';
import { EmployeerPopupService } from './employeer-popup.service';
import { EmployeerService } from './employeer.service';

@Component({
    selector: 'jhi-employeer-delete-dialog',
    templateUrl: './employeer-delete-dialog.component.html'
})
export class EmployeerDeleteDialogComponent {

    employeer: Employeer;

    constructor(
        private employeerService: EmployeerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employeerListModification',
                content: 'Deleted an employeer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employeer-delete-popup',
    template: ''
})
export class EmployeerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeerPopupService: EmployeerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.employeerPopupService
                .open(EmployeerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
