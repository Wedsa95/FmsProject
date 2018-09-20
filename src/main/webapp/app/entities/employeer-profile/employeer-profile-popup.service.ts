import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Employeer } from './employeer-profile.model';
import { EmployeerProfileService } from './employeer-profile.service';

@Injectable()
export class EmployeerProfilePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private employeerService: EmployeerProfileService

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
                this.employeerService.find(id)
                    .subscribe((employeerResponse: HttpResponse<Employeer>) => {
                        const employeer: Employeer = employeerResponse.body;
                        if (employeer.lastActive) {
                            employeer.lastActive = {
                                year: employeer.lastActive.getFullYear(),
                                month: employeer.lastActive.getMonth() + 1,
                                day: employeer.lastActive.getDate()
                            };
                        }
                        this.ngbModalRef = this.employeerModalRef(component, employeer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeerModalRef(component, new Employeer());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    employeerModalRef(component: Component, employeer: Employeer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employeer = employeer;
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
