/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { ExtentDetailComponent } from '../../../../../../main/webapp/app/entities/extent/extent-detail.component';
import { ExtentService } from '../../../../../../main/webapp/app/entities/extent/extent.service';
import { Extent } from '../../../../../../main/webapp/app/entities/extent/extent.model';

describe('Component Tests', () => {

    describe('Extent Management Detail Component', () => {
        let comp: ExtentDetailComponent;
        let fixture: ComponentFixture<ExtentDetailComponent>;
        let service: ExtentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ExtentDetailComponent],
                providers: [
                    ExtentService
                ]
            })
            .overrideTemplate(ExtentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Extent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.extent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
