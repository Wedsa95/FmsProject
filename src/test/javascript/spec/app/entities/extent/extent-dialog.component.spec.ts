/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { ExtentDialogComponent } from '../../../../../../main/webapp/app/entities/extent/extent-dialog.component';
import { ExtentService } from '../../../../../../main/webapp/app/entities/extent/extent.service';
import { Extent } from '../../../../../../main/webapp/app/entities/extent/extent.model';
import { JobseekerService } from '../../../../../../main/webapp/app/entities/jobseeker';
import { VacancyService } from '../../../../../../main/webapp/app/entities/vacancy';

describe('Component Tests', () => {

    describe('Extent Management Dialog Component', () => {
        let comp: ExtentDialogComponent;
        let fixture: ComponentFixture<ExtentDialogComponent>;
        let service: ExtentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ExtentDialogComponent],
                providers: [
                    JobseekerService,
                    VacancyService,
                    ExtentService
                ]
            })
            .overrideTemplate(ExtentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Extent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.extent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'extentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Extent();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.extent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'extentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
