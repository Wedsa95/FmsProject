import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ConsultingExperience } from './consulting-experience.model';
import { ConsultingExperiencePopupService } from './consulting-experience-popup.service';
import { ConsultingExperienceService } from './consulting-experience.service';

@Component({
    selector: 'jhi-consulting-experience-delete-dialog',
    templateUrl: './consulting-experience-delete-dialog.component.html'
})
export class ConsultingExperienceDeleteDialogComponent {

    consultingExperience: ConsultingExperience;

    constructor(
        private consultingExperienceService: ConsultingExperienceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.consultingExperienceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'consultingExperienceListModification',
                content: 'Deleted an consultingExperience'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-consulting-experience-delete-popup',
    template: ''
})
export class ConsultingExperienceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private consultingExperiencePopupService: ConsultingExperiencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.consultingExperiencePopupService
                .open(ConsultingExperienceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
