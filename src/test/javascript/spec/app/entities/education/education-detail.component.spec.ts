/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { EducationDetailComponent } from '../../../../../../main/webapp/app/entities/education/education-detail.component';
import { EducationService } from '../../../../../../main/webapp/app/entities/education/education.service';
import { Education } from '../../../../../../main/webapp/app/entities/education/education.model';

describe('Component Tests', () => {

    describe('Education Management Detail Component', () => {
        let comp: EducationDetailComponent;
        let fixture: ComponentFixture<EducationDetailComponent>;
        let service: EducationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EducationDetailComponent],
                providers: [
                    EducationService
                ]
            })
            .overrideTemplate(EducationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Education(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.education).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
