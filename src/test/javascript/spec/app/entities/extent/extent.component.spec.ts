/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { ExtentComponent } from '../../../../../../main/webapp/app/entities/extent/extent.component';
import { ExtentService } from '../../../../../../main/webapp/app/entities/extent/extent.service';
import { Extent } from '../../../../../../main/webapp/app/entities/extent/extent.model';

describe('Component Tests', () => {

    describe('Extent Management Component', () => {
        let comp: ExtentComponent;
        let fixture: ComponentFixture<ExtentComponent>;
        let service: ExtentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ExtentComponent],
                providers: [
                    ExtentService
                ]
            })
            .overrideTemplate(ExtentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Extent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.extents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
