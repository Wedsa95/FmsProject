import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JobseekerCompliance } from './jobseeker-compliance.model';
import { JobseekerComplianceService } from './jobseeker-compliance.service';

@Injectable()
export class JobseekerCompliancePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jobseekerComplianceService: JobseekerComplianceService

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
                this.jobseekerComplianceService.find(id)
                    .subscribe((jobseekerComplianceResponse: HttpResponse<JobseekerCompliance>) => {
                        const jobseekerCompliance: JobseekerCompliance = jobseekerComplianceResponse.body;
                        if (jobseekerCompliance.dateCompliance) {
                            jobseekerCompliance.dateCompliance = {
                                year: jobseekerCompliance.dateCompliance.getFullYear(),
                                month: jobseekerCompliance.dateCompliance.getMonth() + 1,
                                day: jobseekerCompliance.dateCompliance.getDate()
                            };
                        }
                        this.ngbModalRef = this.jobseekerComplianceModalRef(component, jobseekerCompliance);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobseekerComplianceModalRef(component, new JobseekerCompliance());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobseekerComplianceModalRef(component: Component, jobseekerCompliance: JobseekerCompliance): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jobseekerCompliance = jobseekerCompliance;
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
