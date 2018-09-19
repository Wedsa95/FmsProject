/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerComplianceComponent } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance.component';
import { EmployeerComplianceService } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance.service';
import { EmployeerCompliance } from '../../../../../../main/webapp/app/entities/employeer-compliance/employeer-compliance.model';

describe('Component Tests', () => {

    describe('EmployeerCompliance Management Component', () => {
        let comp: EmployeerComplianceComponent;
        let fixture: ComponentFixture<EmployeerComplianceComponent>;
        let service: EmployeerComplianceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerComplianceComponent],
                providers: [
                    EmployeerComplianceService
                ]
            })
            .overrideTemplate(EmployeerComplianceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerComplianceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerComplianceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmployeerCompliance(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employeerCompliances[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
