/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { ConsultingExperienceDialogComponent } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience-dialog.component';
import { ConsultingExperienceService } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience.service';
import { ConsultingExperience } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience.model';
import { JobseekerService } from '../../../../../../main/webapp/app/entities/jobseeker';

describe('Component Tests', () => {

    describe('ConsultingExperience Management Dialog Component', () => {
        let comp: ConsultingExperienceDialogComponent;
        let fixture: ComponentFixture<ConsultingExperienceDialogComponent>;
        let service: ConsultingExperienceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ConsultingExperienceDialogComponent],
                providers: [
                    JobseekerService,
                    ConsultingExperienceService
                ]
            })
            .overrideTemplate(ConsultingExperienceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConsultingExperienceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultingExperienceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ConsultingExperience(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.consultingExperience = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'consultingExperienceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ConsultingExperience();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.consultingExperience = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'consultingExperienceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
