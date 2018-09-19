import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { WorkExperience } from './work-experience.model';
import { WorkExperienceService } from './work-experience.service';

@Injectable()
export class WorkExperiencePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private workExperienceService: WorkExperienceService

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
                this.workExperienceService.find(id)
                    .subscribe((workExperienceResponse: HttpResponse<WorkExperience>) => {
                        const workExperience: WorkExperience = workExperienceResponse.body;
                        if (workExperience.startDate) {
                            workExperience.startDate = {
                                year: workExperience.startDate.getFullYear(),
                                month: workExperience.startDate.getMonth() + 1,
                                day: workExperience.startDate.getDate()
                            };
                        }
                        if (workExperience.endDate) {
                            workExperience.endDate = {
                                year: workExperience.endDate.getFullYear(),
                                month: workExperience.endDate.getMonth() + 1,
                                day: workExperience.endDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.workExperienceModalRef(component, workExperience);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.workExperienceModalRef(component, new WorkExperience());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    workExperienceModalRef(component: Component, workExperience: WorkExperience): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.workExperience = workExperience;
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
