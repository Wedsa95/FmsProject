/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { WorkExperienceComponent } from '../../../../../../main/webapp/app/entities/work-experience/work-experience.component';
import { WorkExperienceService } from '../../../../../../main/webapp/app/entities/work-experience/work-experience.service';
import { WorkExperience } from '../../../../../../main/webapp/app/entities/work-experience/work-experience.model';

describe('Component Tests', () => {

    describe('WorkExperience Management Component', () => {
        let comp: WorkExperienceComponent;
        let fixture: ComponentFixture<WorkExperienceComponent>;
        let service: WorkExperienceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [WorkExperienceComponent],
                providers: [
                    WorkExperienceService
                ]
            })
            .overrideTemplate(WorkExperienceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkExperienceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkExperienceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new WorkExperience(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.workExperiences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
