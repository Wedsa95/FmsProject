import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobseekerVideo } from './jobseeker-video.model';
import { JobseekerVideoPopupService } from './jobseeker-video-popup.service';
import { JobseekerVideoService } from './jobseeker-video.service';

@Component({
    selector: 'jhi-jobseeker-video-delete-dialog',
    templateUrl: './jobseeker-video-delete-dialog.component.html'
})
export class JobseekerVideoDeleteDialogComponent {

    jobseekerVideo: JobseekerVideo;

    constructor(
        private jobseekerVideoService: JobseekerVideoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobseekerVideoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jobseekerVideoListModification',
                content: 'Deleted an jobseekerVideo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jobseeker-video-delete-popup',
    template: ''
})
export class JobseekerVideoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobseekerVideoPopupService: JobseekerVideoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jobseekerVideoPopupService
                .open(JobseekerVideoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
