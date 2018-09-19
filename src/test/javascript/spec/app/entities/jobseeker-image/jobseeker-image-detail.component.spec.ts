/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerImageDetailComponent } from '../../../../../../main/webapp/app/entities/jobseeker-image/jobseeker-image-detail.component';
import { JobseekerImageService } from '../../../../../../main/webapp/app/entities/jobseeker-image/jobseeker-image.service';
import { JobseekerImage } from '../../../../../../main/webapp/app/entities/jobseeker-image/jobseeker-image.model';

describe('Component Tests', () => {

    describe('JobseekerImage Management Detail Component', () => {
        let comp: JobseekerImageDetailComponent;
        let fixture: ComponentFixture<JobseekerImageDetailComponent>;
        let service: JobseekerImageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerImageDetailComponent],
                providers: [
                    JobseekerImageService
                ]
            })
            .overrideTemplate(JobseekerImageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerImageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerImageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobseekerImage(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobseekerImage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
