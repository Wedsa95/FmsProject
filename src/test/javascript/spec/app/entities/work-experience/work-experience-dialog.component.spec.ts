/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { WorkExperienceDialogComponent } from '../../../../../../main/webapp/app/entities/work-experience/work-experience-dialog.component';
import { WorkExperienceService } from '../../../../../../main/webapp/app/entities/work-experience/work-experience.service';
import { WorkExperience } from '../../../../../../main/webapp/app/entities/work-experience/work-experience.model';
import { JobseekerService } from '../../../../../../main/webapp/app/entities/jobseeker';

describe('Component Tests', () => {

    describe('WorkExperience Management Dialog Component', () => {
        let comp: WorkExperienceDialogComponent;
        let fixture: ComponentFixture<WorkExperienceDialogComponent>;
        let service: WorkExperienceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [WorkExperienceDialogComponent],
                providers: [
                    JobseekerService,
                    WorkExperienceService
                ]
            })
            .overrideTemplate(WorkExperienceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkExperienceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkExperienceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WorkExperience(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.workExperience = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workExperienceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WorkExperience();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.workExperience = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workExperienceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
