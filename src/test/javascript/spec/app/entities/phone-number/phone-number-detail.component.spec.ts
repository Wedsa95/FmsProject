/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { PhoneNumberDetailComponent } from '../../../../../../main/webapp/app/entities/phone-number/phone-number-detail.component';
import { PhoneNumberService } from '../../../../../../main/webapp/app/entities/phone-number/phone-number.service';
import { PhoneNumber } from '../../../../../../main/webapp/app/entities/phone-number/phone-number.model';

describe('Component Tests', () => {

    describe('PhoneNumber Management Detail Component', () => {
        let comp: PhoneNumberDetailComponent;
        let fixture: ComponentFixture<PhoneNumberDetailComponent>;
        let service: PhoneNumberService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [PhoneNumberDetailComponent],
                providers: [
                    PhoneNumberService
                ]
            })
            .overrideTemplate(PhoneNumberDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneNumberDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneNumberService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PhoneNumber(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.phoneNumber).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
