/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerComplianceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance-delete-dialog.component';
import { JobseekerComplianceService } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance.service';

describe('Component Tests', () => {

    describe('JobseekerCompliance Management Delete Component', () => {
        let comp: JobseekerComplianceDeleteDialogComponent;
        let fixture: ComponentFixture<JobseekerComplianceDeleteDialogComponent>;
        let service: JobseekerComplianceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerComplianceDeleteDialogComponent],
                providers: [
                    JobseekerComplianceService
                ]
            })
            .overrideTemplate(JobseekerComplianceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerComplianceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerComplianceService);
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
