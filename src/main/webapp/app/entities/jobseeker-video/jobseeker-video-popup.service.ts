import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JobseekerVideo } from './jobseeker-video.model';
import { JobseekerVideoService } from './jobseeker-video.service';

@Injectable()
export class JobseekerVideoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jobseekerVideoService: JobseekerVideoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jobseekerVideoService.find(id)
                    .subscribe((jobseekerVideoResponse: HttpResponse<JobseekerVideo>) => {
                        const jobseekerVideo: JobseekerVideo = jobseekerVideoResponse.body;
                        this.ngbModalRef = this.jobseekerVideoModalRef(component, jobseekerVideo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobseekerVideoModalRef(component, new JobseekerVideo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobseekerVideoModalRef(component: Component, jobseekerVideo: JobseekerVideo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jobseekerVideo = jobseekerVideo;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
