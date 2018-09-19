/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { JobseekerComplianceComponent } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance.component';
import { JobseekerComplianceService } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance.service';
import { JobseekerCompliance } from '../../../../../../main/webapp/app/entities/jobseeker-compliance/jobseeker-compliance.model';

describe('Component Tests', () => {

    describe('JobseekerCompliance Management Component', () => {
        let comp: JobseekerComplianceComponent;
        let fixture: ComponentFixture<JobseekerComplianceComponent>;
        let service: JobseekerComplianceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [JobseekerComplianceComponent],
                providers: [
                    JobseekerComplianceService
                ]
            })
            .overrideTemplate(JobseekerComplianceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobseekerComplianceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobseekerComplianceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JobseekerCompliance(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobseekerCompliances[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
