import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Employeer } from './employeer-profile.model';
import { EmployeerProfilePopupService } from './employeer-profile-popup.service';
import { EmployeerProfileService } from './employeer-profile.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-employeer-profile-dialog',
    templateUrl: './employeer-profile-dialog.component.html'
})
export class EmployeerProfileDialogComponent implements OnInit {

    employeer: Employeer;
    isSaving: boolean;

    users: User[];
    lastActiveDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private employeerService: EmployeerProfileService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.employeer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeerService.update(this.employeer));
        } else {
            this.subscribeToSaveResponse(
                this.employeerService.create(this.employeer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Employeer>>) {
        result.subscribe((res: HttpResponse<Employeer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Employeer) {
        this.eventManager.broadcast({ name: 'employeerProfileListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-employeer-profile-popup',
    template: ''
})
export class EmployeerProfilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeerPopupService: EmployeerProfilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.employeerPopupService
                    .open(EmployeerProfileDialogComponent as Component, params['id']);
            } else {
                this.employeerPopupService
                    .open(EmployeerProfileDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
