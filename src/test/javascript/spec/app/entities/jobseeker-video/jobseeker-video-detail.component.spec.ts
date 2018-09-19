/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerVideoDetailComponent } from '../../../../../../main/webapp/app/entities/jobseeker-video/jobseeker-video-detail.component';
import { JobseekerVideoService } from '../../../../../../main/webapp/app/entities/jobseeker-video/jobseeker-video.service';
import { JobseekerVideo } from '../../../../../../main/webapp/app/entities/jobseeker-video/jobseeker-video.model';

describe('Component Tests', () => {

    describe('JobseekerVideo Management Detail Component', () => {
        let comp: JobseekerVideoDetailComponent;
        let fixture: ComponentFixture<JobseekerVideoDetailComponent>;
        let service: JobseekerVideoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerVideoDetailComponent],
                providers: [
                    JobseekerVideoService
                ]
            })
            .overrideTemplate(JobseekerVideoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerVideoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerVideoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobseekerVideo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobseekerVideo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
