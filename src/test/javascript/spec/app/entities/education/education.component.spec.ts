/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { EducationComponent } from '../../../../../../main/webapp/app/entities/education/education.component';
import { EducationService } from '../../../../../../main/webapp/app/entities/education/education.service';
import { Education } from '../../../../../../main/webapp/app/entities/education/education.model';

describe('Component Tests', () => {

    describe('Education Management Component', () => {
        let comp: EducationComponent;
        let fixture: ComponentFixture<EducationComponent>;
        let service: EducationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EducationComponent],
                providers: [
                    EducationService
                ]
            })
            .overrideTemplate(EducationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Education(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.educations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
