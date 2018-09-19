/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerVideoComponent } from '../../../../../../main/webapp/app/entities/jobseeker-video/jobseeker-video.component';
import { JobseekerVideoService } from '../../../../../../main/webapp/app/entities/jobseeker-video/jobseeker-video.service';
import { JobseekerVideo } from '../../../../../../main/webapp/app/entities/jobseeker-video/jobseeker-video.model';

describe('Component Tests', () => {

    describe('JobseekerVideo Management Component', () => {
        let comp: JobseekerVideoComponent;
        let fixture: ComponentFixture<JobseekerVideoComponent>;
        let service: JobseekerVideoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerVideoComponent],
                providers: [
                    JobseekerVideoService
                ]
            })
            .overrideTemplate(JobseekerVideoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerVideoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerVideoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JobseekerVideo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobseekerVideos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
