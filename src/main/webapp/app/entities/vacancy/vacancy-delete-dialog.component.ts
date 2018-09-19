import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Vacancy } from './vacancy.model';
import { VacancyPopupService } from './vacancy-popup.service';
import { VacancyService } from './vacancy.service';

@Component({
    selector: 'jhi-vacancy-delete-dialog',
    templateUrl: './vacancy-delete-dialog.component.html'
})
export class VacancyDeleteDialogComponent {

    vacancy: Vacancy;

    constructor(
        private vacancyService: VacancyService,
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
                name: 'vacancyListModification',
                content: 'Deleted an vacancy'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vacancy-delete-popup',
    template: ''
})
export class VacancyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vacancyPopupService: VacancyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vacancyPopupService
                .open(VacancyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
