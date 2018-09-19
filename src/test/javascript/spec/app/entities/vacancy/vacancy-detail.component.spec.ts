/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { VacancyDetailComponent } from '../../../../../../main/webapp/app/entities/vacancy/vacancy-detail.component';
import { VacancyService } from '../../../../../../main/webapp/app/entities/vacancy/vacancy.service';
import { Vacancy } from '../../../../../../main/webapp/app/entities/vacancy/vacancy.model';

describe('Component Tests', () => {

    describe('Vacancy Management Detail Component', () => {
        let comp: VacancyDetailComponent;
        let fixture: ComponentFixture<VacancyDetailComponent>;
        let service: VacancyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [VacancyDetailComponent],
                providers: [
                    VacancyService
                ]
            })
            .overrideTemplate(VacancyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VacancyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacancyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Vacancy(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vacancy).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
