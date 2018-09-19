/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerComplianceDetailComponent } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance-detail.component';
import { EmployeerComplianceService } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance.service';
import { EmployeerCompliance } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance.model';

describe('Component Tests', () => {

    describe('EmployeerCompliance Management Detail Component', () => {
        let comp: EmployeerComplianceDetailComponent;
        let fixture: ComponentFixture<EmployeerComplianceDetailComponent>;
        let service: EmployeerComplianceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerComplianceDetailComponent],
                providers: [
                    EmployeerComplianceService
                ]
            })
            .overrideTemplate(EmployeerComplianceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerComplianceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerComplianceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EmployeerCompliance(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employeerCompliance).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
