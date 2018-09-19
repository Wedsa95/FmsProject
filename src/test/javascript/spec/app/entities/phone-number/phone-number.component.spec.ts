/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { PhoneNumberComponent } from '../../../../../../main/webapp/app/entities/phone-number/phone-number.component';
import { PhoneNumberService } from '../../../../../../main/webapp/app/entities/phone-number/phone-number.service';
import { PhoneNumber } from '../../../../../../main/webapp/app/entities/phone-number/phone-number.model';

describe('Component Tests', () => {

    describe('PhoneNumber Management Component', () => {
        let comp: PhoneNumberComponent;
        let fixture: ComponentFixture<PhoneNumberComponent>;
        let service: PhoneNumberService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [PhoneNumberComponent],
                providers: [
                    PhoneNumberService
                ]
            })
            .overrideTemplate(PhoneNumberComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneNumberComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneNumberService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PhoneNumber(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.phoneNumbers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
