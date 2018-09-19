import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WorkExperience } from './work-experience.model';
import { WorkExperiencePopupService } from './work-experience-popup.service';
import { WorkExperienceService } from './work-experience.service';

@Component({
    selector: 'jhi-work-experience-delete-dialog',
    templateUrl: './work-experience-delete-dialog.component.html'
})
export class WorkExperienceDeleteDialogComponent {

    workExperience: WorkExperience;

    constructor(
        private workExperienceService: WorkExperienceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workExperienceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'workExperienceListModification',
                content: 'Deleted an workExperience'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-work-experience-delete-popup',
    template: ''
})
export class WorkExperienceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workExperiencePopupService: WorkExperiencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.workExperiencePopupService
                .open(WorkExperienceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
