/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerImageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/employeer-image/employeer-image-delete-dialog.component';
import { EmployeerImageService } from '../../../../../../main/webapp/app/entities/employeer-image/employeer-image.service';

describe('Component Tests', () => {

    describe('EmployeerImage Management Delete Component', () => {
        let comp: EmployeerImageDeleteDialogComponent;
        let fixture: ComponentFixture<EmployeerImageDeleteDialogComponent>;
        let service: EmployeerImageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerImageDeleteDialogComponent],
                providers: [
                    EmployeerImageService
                ]
            })
            .overrideTemplate(EmployeerImageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerImageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerImageService);
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
