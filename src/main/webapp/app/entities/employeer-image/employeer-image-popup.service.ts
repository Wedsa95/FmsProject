import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EmployeerImage } from './employeer-image.model';
import { EmployeerImageService } from './employeer-image.service';

@Injectable()
export class EmployeerImagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private employeerImageService: EmployeerImageService

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
                this.employeerImageService.find(id)
                    .subscribe((employeerImageResponse: HttpResponse<EmployeerImage>) => {
                        const employeerImage: EmployeerImage = employeerImageResponse.body;
                        this.ngbModalRef = this.employeerImageModalRef(component, employeerImage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeerImageModalRef(component, new EmployeerImage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    employeerImageModalRef(component: Component, employeerImage: EmployeerImage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employeerImage = employeerImage;
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
