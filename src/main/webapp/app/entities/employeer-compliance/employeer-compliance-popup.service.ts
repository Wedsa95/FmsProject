import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EmployeerCompliance } from './employeer-compliance.model';
import { EmployeerComplianceService } from './employeer-compliance.service';

@Injectable()
export class EmployeerCompliancePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private employeerComplianceService: EmployeerComplianceService

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
                this.employeerComplianceService.find(id)
                    .subscribe((employeerComplianceResponse: HttpResponse<EmployeerCompliance>) => {
                        const employeerCompliance: EmployeerCompliance = employeerComplianceResponse.body;
                        if (employeerCompliance.dateCompliance) {
                            employeerCompliance.dateCompliance = {
                                year: employeerCompliance.dateCompliance.getFullYear(),
                                month: employeerCompliance.dateCompliance.getMonth() + 1,
                                day: employeerCompliance.dateCompliance.getDate()
                            };
                        }
                        this.ngbModalRef = this.employeerComplianceModalRef(component, employeerCompliance);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeerComplianceModalRef(component, new EmployeerCompliance());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    employeerComplianceModalRef(component: Component, employeerCompliance: EmployeerCompliance): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employeerCompliance = employeerCompliance;
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
