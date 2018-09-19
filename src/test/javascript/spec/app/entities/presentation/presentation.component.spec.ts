/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { PresentationComponent } from '../../../../../../main/webapp/app/entities/presentation/presentation.component';
import { PresentationService } from '../../../../../../main/webapp/app/entities/presentation/presentation.service';
import { Presentation } from '../../../../../../main/webapp/app/entities/presentation/presentation.model';

describe('Component Tests', () => {

    describe('Presentation Management Component', () => {
        let comp: PresentationComponent;
        let fixture: ComponentFixture<PresentationComponent>;
        let service: PresentationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [PresentationComponent],
                providers: [
                    PresentationService
                ]
            })
            .overrideTemplate(PresentationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PresentationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresentationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Presentation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.presentations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
