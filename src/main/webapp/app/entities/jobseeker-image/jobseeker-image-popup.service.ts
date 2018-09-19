import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JobseekerImage } from './jobseeker-image.model';
import { JobseekerImageService } from './jobseeker-image.service';

@Injectable()
export class JobseekerImagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jobseekerImageService: JobseekerImageService

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
                this.jobseekerImageService.find(id)
                    .subscribe((jobseekerImageResponse: HttpResponse<JobseekerImage>) => {
                        const jobseekerImage: JobseekerImage = jobseekerImageResponse.body;
                        this.ngbModalRef = this.jobseekerImageModalRef(component, jobseekerImage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobseekerImageModalRef(component, new JobseekerImage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobseekerImageModalRef(component: Component, jobseekerImage: JobseekerImage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jobseekerImage = jobseekerImage;
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
