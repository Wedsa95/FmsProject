/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { WorkExperienceDetailComponent } from '../../../../../../main/webapp/app/entities/work-experience/work-experience-detail.component';
import { WorkExperienceService } from '../../../../../../main/webapp/app/entities/work-experience/work-experience.service';
import { WorkExperience } from '../../../../../../main/webapp/app/entities/work-experience/work-experience.model';

describe('Component Tests', () => {

    describe('WorkExperience Management Detail Component', () => {
        let comp: WorkExperienceDetailComponent;
        let fixture: ComponentFixture<WorkExperienceDetailComponent>;
        let service: WorkExperienceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [WorkExperienceDetailComponent],
                providers: [
                    WorkExperienceService
                ]
            })
            .overrideTemplate(WorkExperienceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkExperienceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkExperienceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new WorkExperience(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.workExperience).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
