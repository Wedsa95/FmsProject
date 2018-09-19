/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { DegreeDetailComponent } from '../../../../../../main/webapp/app/entities/degree/degree-detail.component';
import { DegreeService } from '../../../../../../main/webapp/app/entities/degree/degree.service';
import { Degree } from '../../../../../../main/webapp/app/entities/degree/degree.model';

describe('Component Tests', () => {

    describe('Degree Management Detail Component', () => {
        let comp: DegreeDetailComponent;
        let fixture: ComponentFixture<DegreeDetailComponent>;
        let service: DegreeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [DegreeDetailComponent],
                providers: [
                    DegreeService
                ]
            })
            .overrideTemplate(DegreeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DegreeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DegreeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Degree(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.degree).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
