/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { ReferenceComponent } from '../../../../../../main/webapp/app/entities/reference/reference.component';
import { ReferenceService } from '../../../../../../main/webapp/app/entities/reference/reference.service';
import { Reference } from '../../../../../../main/webapp/app/entities/reference/reference.model';

describe('Component Tests', () => {

    describe('Reference Management Component', () => {
        let comp: ReferenceComponent;
        let fixture: ComponentFixture<ReferenceComponent>;
        let service: ReferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [ReferenceComponent],
                providers: [
                    ReferenceService
                ]
            })
            .overrideTemplate(ReferenceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReferenceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Reference(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.references[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
