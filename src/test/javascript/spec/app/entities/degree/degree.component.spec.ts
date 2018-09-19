/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { DegreeComponent } from '../../../../../../main/webapp/app/entities/degree/degree.component';
import { DegreeService } from '../../../../../../main/webapp/app/entities/degree/degree.service';
import { Degree } from '../../../../../../main/webapp/app/entities/degree/degree.model';

describe('Component Tests', () => {

    describe('Degree Management Component', () => {
        let comp: DegreeComponent;
        let fixture: ComponentFixture<DegreeComponent>;
        let service: DegreeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [DegreeComponent],
                providers: [
                    DegreeService
                ]
            })
            .overrideTemplate(DegreeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DegreeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DegreeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Degree(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.degrees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
