/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerComplianceDialogComponent } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance-dialog.component';
import { EmployeerComplianceService } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance.service';
import { EmployeerCompliance } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance.model';
import { EmployeerService } from '../../../../../../main/webapp/app/entities/employeer';

describe('Component Tests', () => {

    describe('EmployeerCompliance Management Dialog Component', () => {
        let comp: EmployeerComplianceDialogComponent;
        let fixture: ComponentFixture<EmployeerComplianceDialogComponent>;
        let service: EmployeerComplianceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerComplianceDialogComponent],
                providers: [
                    EmployeerService,
                    EmployeerComplianceService
                ]
            })
            .overrideTemplate(EmployeerComplianceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerComplianceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerComplianceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmployeerCompliance(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.employeerCompliance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'employeerComplianceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmployeerCompliance();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.employeerCompliance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'employeerComplianceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
