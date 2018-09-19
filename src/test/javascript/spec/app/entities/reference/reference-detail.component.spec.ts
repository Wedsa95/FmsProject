/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { ReferenceDetailComponent } from '../../../../../../main/webapp/app/entities/reference/reference-detail.component';
import { ReferenceService } from '../../../../../../main/webapp/app/entities/reference/reference.service';
import { Reference } from '../../../../../../main/webapp/app/entities/reference/reference.model';

describe('Component Tests', () => {

    describe('Reference Management Detail Component', () => {
        let comp: ReferenceDetailComponent;
        let fixture: ComponentFixture<ReferenceDetailComponent>;
        let service: ReferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ReferenceDetailComponent],
                providers: [
                    ReferenceService
                ]
            })
            .overrideTemplate(ReferenceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReferenceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Reference(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reference).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
