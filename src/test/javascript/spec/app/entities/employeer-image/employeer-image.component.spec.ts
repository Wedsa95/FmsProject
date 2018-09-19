/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerImageComponent } from '../../../../../../main/webapp/app/entities/employeer-image/employeer-image.component';
import { EmployeerImageService } from '../../../../../../main/webapp/app/entities/employeer-image/employeer-image.service';
import { EmployeerImage } from '../../../../../../main/webapp/app/entities/employeer-image/employeer-image.model';

describe('Component Tests', () => {

    describe('EmployeerImage Management Component', () => {
        let comp: EmployeerImageComponent;
        let fixture: ComponentFixture<EmployeerImageComponent>;
        let service: EmployeerImageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerImageComponent],
                providers: [
                    EmployeerImageService
                ]
            })
            .overrideTemplate(EmployeerImageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerImageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerImageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmployeerImage(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employeerImages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
