/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { EmailDetailComponent } from '../../../../../../main/webapp/app/entities/email/email-detail.component';
import { EmailService } from '../../../../../../main/webapp/app/entities/email/email.service';
import { Email } from '../../../../../../main/webapp/app/entities/email/email.model';

describe('Component Tests', () => {

    describe('Email Management Detail Component', () => {
        let comp: EmailDetailComponent;
        let fixture: ComponentFixture<EmailDetailComponent>;
        let service: EmailService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmailDetailComponent],
                providers: [
                    EmailService
                ]
            })
            .overrideTemplate(EmailDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Email(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.email).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
