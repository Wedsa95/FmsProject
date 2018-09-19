import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobseekerImage } from './jobseeker-image.model';
import { JobseekerImagePopupService } from './jobseeker-image-popup.service';
import { JobseekerImageService } from './jobseeker-image.service';

@Component({
    selector: 'jhi-jobseeker-image-delete-dialog',
    templateUrl: './jobseeker-image-delete-dialog.component.html'
})
export class JobseekerImageDeleteDialogComponent {

    jobseekerImage: JobseekerImage;

    constructor(
        private jobseekerImageService: JobseekerImageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobseekerImageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jobseekerImageListModification',
                content: 'Deleted an jobseekerImage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jobseeker-image-delete-popup',
    template: ''
})
export class JobseekerImageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobseekerImagePopupService: JobseekerImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jobseekerImagePopupService
                .open(JobseekerImageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
