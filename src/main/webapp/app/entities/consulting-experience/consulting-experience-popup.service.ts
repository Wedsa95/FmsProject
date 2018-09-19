import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ConsultingExperience } from './consulting-experience.model';
import { ConsultingExperienceService } from './consulting-experience.service';

@Injectable()
export class ConsultingExperiencePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private consultingExperienceService: ConsultingExperienceService

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
                this.consultingExperienceService.find(id)
                    .subscribe((consultingExperienceResponse: HttpResponse<ConsultingExperience>) => {
                        const consultingExperience: ConsultingExperience = consultingExperienceResponse.body;
                        this.ngbModalRef = this.consultingExperienceModalRef(component, consultingExperience);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.consultingExperienceModalRef(component, new ConsultingExperience());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    consultingExperienceModalRef(component: Component, consultingExperience: ConsultingExperience): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.consultingExperience = consultingExperience;
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
