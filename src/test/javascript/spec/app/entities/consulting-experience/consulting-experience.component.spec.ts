/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { ConsultingExperienceComponent } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience.component';
import { ConsultingExperienceService } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience.service';
import { ConsultingExperience } from '../../../../../../main/webapp/app/entities/consulting-experience/consulting-experience.model';

describe('Component Tests', () => {

    describe('ConsultingExperience Management Component', () => {
        let comp: ConsultingExperienceComponent;
        let fixture: ComponentFixture<ConsultingExperienceComponent>;
        let service: ConsultingExperienceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ConsultingExperienceComponent],
                providers: [
                    ConsultingExperienceService
                ]
            })
            .overrideTemplate(ConsultingExperienceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConsultingExperienceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultingExperienceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ConsultingExperience(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.consultingExperiences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
