import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Vacancy } from './vacancy.model';
import { VacancyService } from './vacancy.service';

@Injectable()
export class VacancyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private vacancyService: VacancyService

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
                this.vacancyService.find(id)
                    .subscribe((vacancyResponse: HttpResponse<Vacancy>) => {
                        const vacancy: Vacancy = vacancyResponse.body;
                        if (vacancy.uploadDate) {
                            vacancy.uploadDate = {
                                year: vacancy.uploadDate.getFullYear(),
                                month: vacancy.uploadDate.getMonth() + 1,
                                day: vacancy.uploadDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.vacancyModalRef(component, vacancy);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.vacancyModalRef(component, new Vacancy());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vacancyModalRef(component: Component, vacancy: Vacancy): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vacancy = vacancy;
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
