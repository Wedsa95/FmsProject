/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerDetailComponent } from '../../../../../../main/webapp/app/entities/jobseeker/jobseeker-detail.component';
import { JobseekerService } from '../../../../../../main/webapp/app/entities/jobseeker/jobseeker.service';
import { Jobseeker } from '../../../../../../main/webapp/app/entities/jobseeker/jobseeker.model';

describe('Component Tests', () => {

    describe('Jobseeker Management Detail Component', () => {
        let comp: JobseekerDetailComponent;
        let fixture: ComponentFixture<JobseekerDetailComponent>;
        let service: JobseekerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerDetailComponent],
                providers: [
                    JobseekerService
                ]
            })
            .overrideTemplate(JobseekerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Jobseeker(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobseeker).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
