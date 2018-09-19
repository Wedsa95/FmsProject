/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { ConsultingExperienceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience-delete-dialog.component';
import { ConsultingExperienceService } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience.service';

describe('Component Tests', () => {

    describe('ConsultingExperience Management Delete Component', () => {
        let comp: ConsultingExperienceDeleteDialogComponent;
        let fixture: ComponentFixture<ConsultingExperienceDeleteDialogComponent>;
        let service: ConsultingExperienceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ConsultingExperienceDeleteDialogComponent],
                providers: [
                    ConsultingExperienceService
                ]
            })
            .overrideTemplate(ConsultingExperienceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConsultingExperienceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultingExperienceService);
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
