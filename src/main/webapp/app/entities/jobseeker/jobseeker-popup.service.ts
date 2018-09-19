import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Jobseeker } from './jobseeker.model';
import { JobseekerService } from './jobseeker.service';

@Injectable()
export class JobseekerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jobseekerService: JobseekerService

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
                this.jobseekerService.find(id)
                    .subscribe((jobseekerResponse: HttpResponse<Jobseeker>) => {
                        const jobseeker: Jobseeker = jobseekerResponse.body;
                        if (jobseeker.regestrationDate) {
                            jobseeker.regestrationDate = {
                                year: jobseeker.regestrationDate.getFullYear(),
                                month: jobseeker.regestrationDate.getMonth() + 1,
                                day: jobseeker.regestrationDate.getDate()
                            };
                        }
                        if (jobseeker.birthYear) {
                            jobseeker.birthYear = {
                                year: jobseeker.birthYear.getFullYear(),
                                month: jobseeker.birthYear.getMonth() + 1,
                                day: jobseeker.birthYear.getDate()
                            };
                        }
                        if (jobseeker.lastActive) {
                            jobseeker.lastActive = {
                                year: jobseeker.lastActive.getFullYear(),
                                month: jobseeker.lastActive.getMonth() + 1,
                                day: jobseeker.lastActive.getDate()
                            };
                        }
                        this.ngbModalRef = this.jobseekerModalRef(component, jobseeker);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobseekerModalRef(component, new Jobseeker());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobseekerModalRef(component: Component, jobseeker: Jobseeker): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jobseeker = jobseeker;
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
