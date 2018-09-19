/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerComplianceDialogComponent } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance-dialog.component';
import { JobseekerComplianceService } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance.service';
import { JobseekerCompliance } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance.model';
import { JobseekerService } from '../../../../../../main/webapp/app/entities/jobseeker';

describe('Component Tests', () => {

    describe('JobseekerCompliance Management Dialog Component', () => {
        let comp: JobseekerComplianceDialogComponent;
        let fixture: ComponentFixture<JobseekerComplianceDialogComponent>;
        let service: JobseekerComplianceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerComplianceDialogComponent],
                providers: [
                    JobseekerService,
                    JobseekerComplianceService
                ]
            })
            .overrideTemplate(JobseekerComplianceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerComplianceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerComplianceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JobseekerCompliance(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jobseekerCompliance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jobseekerComplianceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JobseekerCompliance();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jobseekerCompliance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jobseekerComplianceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
