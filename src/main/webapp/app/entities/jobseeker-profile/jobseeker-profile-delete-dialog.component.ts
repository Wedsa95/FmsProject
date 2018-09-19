import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Jobseeker } from './jobseeker-profile.model';
import { JobseekerProfilePopupService } from './jobseeker-profile-popup.service';
import { JobseekerProfileService } from './jobseeker-profile.service';

@Component({
    selector: 'jhi-jobseeker-delete-dialog',
    templateUrl: './jobseeker-profile-delete-dialog.component.html'
})
export class JobseekerProfileDeleteDialogComponent {

    jobseeker: Jobseeker;

    constructor(
        private jobseekerService: JobseekerProfileService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobseekerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jobseekerListModification',
                content: 'Deleted an jobseeker'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jobseeker-delete-popup',
    template: ''
})
export class JobseekerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobseekerPopupService: JobseekerProfilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jobseekerPopupService
                .open(JobseekerProfileDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
