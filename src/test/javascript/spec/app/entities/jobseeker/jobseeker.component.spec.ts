/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerComponent } from '../../../../../../main/webapp/app/entities/jobseeker/jobseeker.component';
import { JobseekerService } from '../../../../../../main/webapp/app/entities/jobseeker/jobseeker.service';
import { Jobseeker } from '../../../../../../main/webapp/app/entities/jobseeker/jobseeker.model';

describe('Component Tests', () => {

    describe('Jobseeker Management Component', () => {
        let comp: JobseekerComponent;
        let fixture: ComponentFixture<JobseekerComponent>;
        let service: JobseekerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerComponent],
                providers: [
                    JobseekerService
                ]
            })
            .overrideTemplate(JobseekerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Jobseeker(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobseekers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
