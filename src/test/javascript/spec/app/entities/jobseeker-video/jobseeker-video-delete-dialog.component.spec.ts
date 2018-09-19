/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerVideoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/jobseeker-video/jobseeker-video-delete-dialog.component';
import { JobseekerVideoService } from '../../../../../../main/webapp/app/entities/jobseeker-video/jobseeker-video.service';

describe('Component Tests', () => {

    describe('JobseekerVideo Management Delete Component', () => {
        let comp: JobseekerVideoDeleteDialogComponent;
        let fixture: ComponentFixture<JobseekerVideoDeleteDialogComponent>;
        let service: JobseekerVideoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerVideoDeleteDialogComponent],
                providers: [
                    JobseekerVideoService
                ]
            })
            .overrideTemplate(JobseekerVideoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerVideoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerVideoService);
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
