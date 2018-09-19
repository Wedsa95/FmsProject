/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { VacancyDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/vacancy/vacancy-delete-dialog.component';
import { VacancyService } from '../../../../../../main/webapp/app/entities/vacancy/vacancy.service';

describe('Component Tests', () => {

    describe('Vacancy Management Delete Component', () => {
        let comp: VacancyDeleteDialogComponent;
        let fixture: ComponentFixture<VacancyDeleteDialogComponent>;
        let service: VacancyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [VacancyDeleteDialogComponent],
                providers: [
                    VacancyService
                ]
            })
            .overrideTemplate(VacancyDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VacancyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacancyService);
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
