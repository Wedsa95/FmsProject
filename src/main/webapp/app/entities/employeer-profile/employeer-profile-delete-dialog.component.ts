import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Employeer } from './employeer-profile.model';
import { EmployeerProfilePopupService } from './employeer-profile-popup.service';
import { EmployeerProfileService } from './employeer-profile.service';

@Component({
    selector: 'jhi-employeer-delete-dialog',
    templateUrl: './employeer-profile-delete-dialog.component.html'
})
export class EmployeerProfileDeleteDialogComponent {

    employeer: Employeer;

    constructor(
        private employeerProfileService: EmployeerProfileService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeerProfileService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employeerListModification',
                content: 'Deleted an employeer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employeer-profile-delete-popup',
    template: ''
})
export class EmployeerProfileDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeerPopupService: EmployeerProfilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.employeerPopupService
                .open(EmployeerProfileDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
