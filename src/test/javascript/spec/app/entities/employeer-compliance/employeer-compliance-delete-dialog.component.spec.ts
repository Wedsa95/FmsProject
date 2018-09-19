/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerComplianceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance-delete-dialog.component';
import { EmployeerComplianceService } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance.service';

describe('Component Tests', () => {

    describe('EmployeerCompliance Management Delete Component', () => {
        let comp: EmployeerComplianceDeleteDialogComponent;
        let fixture: ComponentFixture<EmployeerComplianceDeleteDialogComponent>;
        let service: EmployeerComplianceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerComplianceDeleteDialogComponent],
                providers: [
                    EmployeerComplianceService
                ]
            })
            .overrideTemplate(EmployeerComplianceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerComplianceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerComplianceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
