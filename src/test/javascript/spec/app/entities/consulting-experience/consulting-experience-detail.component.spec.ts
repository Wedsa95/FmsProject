/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { ConsultingExperienceDetailComponent } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience-detail.component';
import { ConsultingExperienceService } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience.service';
import { ConsultingExperience } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience.model';

describe('Component Tests', () => {

    describe('ConsultingExperience Management Detail Component', () => {
        let comp: ConsultingExperienceDetailComponent;
        let fixture: ComponentFixture<ConsultingExperienceDetailComponent>;
        let service: ConsultingExperienceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ConsultingExperienceDetailComponent],
                providers: [
                    ConsultingExperienceService
                ]
            })
            .overrideTemplate(ConsultingExperienceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConsultingExperienceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultingExperienceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ConsultingExperience(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.consultingExperience).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
