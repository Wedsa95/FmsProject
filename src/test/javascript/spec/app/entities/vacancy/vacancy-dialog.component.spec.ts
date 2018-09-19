/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { VacancyDialogComponent } from '../../../../../../main/webapp/app/entities/vacancy/vacancy-dialog.component';
import { VacancyService } from '../../../../../../main/webapp/app/entities/vacancy/vacancy.service';
import { Vacancy } from '../../../../../../main/webapp/app/entities/vacancy/vacancy.model';
import { EmployeerService } from '../../../../../../main/webapp/app/entities/employeer';
import { DegreeService } from '../../../../../../main/webapp/app/entities/degree';
import { ConsultingExperienceService } from '../../../../../../main/webapp/app/entities/consulting-experience';

describe('Component Tests', () => {

    describe('Vacancy Management Dialog Component', () => {
        let comp: VacancyDialogComponent;
        let fixture: ComponentFixture<VacancyDialogComponent>;
        let service: VacancyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [VacancyDialogComponent],
                providers: [
                    EmployeerService,
                    DegreeService,
                    ConsultingExperienceService,
                    VacancyService
                ]
            })
            .overrideTemplate(VacancyDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VacancyDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacancyService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Vacancy(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.vacancy = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'vacancyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Vacancy();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.vacancy = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'vacancyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
