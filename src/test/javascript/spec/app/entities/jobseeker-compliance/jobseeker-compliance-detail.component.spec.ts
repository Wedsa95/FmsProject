/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerComplianceDetailComponent } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance-detail.component';
import { JobseekerComplianceService } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance.service';
import { JobseekerCompliance } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance.model';

describe('Component Tests', () => {

    describe('JobseekerCompliance Management Detail Component', () => {
        let comp: JobseekerComplianceDetailComponent;
        let fixture: ComponentFixture<JobseekerComplianceDetailComponent>;
        let service: JobseekerComplianceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerComplianceDetailComponent],
                providers: [
                    JobseekerComplianceService
                ]
            })
            .overrideTemplate(JobseekerComplianceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerComplianceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerComplianceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobseekerCompliance(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobseekerCompliance).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
