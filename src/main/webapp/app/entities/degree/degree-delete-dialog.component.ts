import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Degree } from './degree.model';
import { DegreePopupService } from './degree-popup.service';
import { DegreeService } from './degree.service';

@Component({
    selector: 'jhi-degree-delete-dialog',
    templateUrl: './degree-delete-dialog.component.html'
})
export class DegreeDeleteDialogComponent {

    degree: Degree;

    constructor(
        private degreeService: DegreeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.degreeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'degreeListModification',
                content: 'Deleted an degree'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-degree-delete-popup',
    template: ''
})
export class DegreeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private degreePopupService: DegreePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.degreePopupService
                .open(DegreeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
