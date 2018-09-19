/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { PresentationDetailComponent } from '../../../../../../main/webapp/app/entities/presentation/presentation-detail.component';
import { PresentationService } from '../../../../../../main/webapp/app/entities/presentation/presentation.service';
import { Presentation } from '../../../../../../main/webapp/app/entities/presentation/presentation.model';

describe('Component Tests', () => {

    describe('Presentation Management Detail Component', () => {
        let comp: PresentationDetailComponent;
        let fixture: ComponentFixture<PresentationDetailComponent>;
        let service: PresentationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [PresentationDetailComponent],
                providers: [
                    PresentationService
                ]
            })
            .overrideTemplate(PresentationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PresentationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresentationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Presentation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.presentation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
