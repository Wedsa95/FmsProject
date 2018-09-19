/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { VacancyComponent } from '../../../../../../main/webapp/app/entities/vacancy/vacancy.component';
import { VacancyService } from '../../../../../../main/webapp/app/entities/vacancy/vacancy.service';
import { Vacancy } from '../../../../../../main/webapp/app/entities/vacancy/vacancy.model';

describe('Component Tests', () => {

    describe('Vacancy Management Component', () => {
        let comp: VacancyComponent;
        let fixture: ComponentFixture<VacancyComponent>;
        let service: VacancyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [VacancyComponent],
                providers: [
                    VacancyService
                ]
            })
            .overrideTemplate(VacancyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VacancyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacancyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Vacancy(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vacancies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
