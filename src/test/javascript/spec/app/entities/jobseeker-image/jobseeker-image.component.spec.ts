/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerImageComponent } from '../../../../../../main/webapp/app/entities/jobseeker-image/jobseeker-image.component';
import { JobseekerImageService } from '../../../../../../main/webapp/app/entities/jobseeker-image/jobseeker-image.service';
import { JobseekerImage } from '../../../../../../main/webapp/app/entities/jobseeker-image/jobseeker-image.model';

describe('Component Tests', () => {

    describe('JobseekerImage Management Component', () => {
        let comp: JobseekerImageComponent;
        let fixture: ComponentFixture<JobseekerImageComponent>;
        let service: JobseekerImageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerImageComponent],
                providers: [
                    JobseekerImageService
                ]
            })
            .overrideTemplate(JobseekerImageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerImageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerImageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JobseekerImage(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobseekerImages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
