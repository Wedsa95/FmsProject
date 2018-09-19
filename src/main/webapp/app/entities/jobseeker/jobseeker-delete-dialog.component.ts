import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Jobseeker } from './jobseeker.model';
import { JobseekerPopupService } from './jobseeker-popup.service';
import { JobseekerService } from './jobseeker.service';

@Component({
    selector: 'jhi-jobseeker-delete-dialog',
    templateUrl: './jobseeker-delete-dialog.component.html'
})
export class JobseekerDeleteDialogComponent {

    jobseeker: Jobseeker;

    constructor(
        private jobseekerService: JobseekerService,
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
        private jobseekerPopupService: JobseekerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jobseekerPopupService
                .open(JobseekerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
