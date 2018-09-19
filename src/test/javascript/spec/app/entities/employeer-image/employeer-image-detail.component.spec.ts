/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerImageDetailComponent } from '../../../../../../main/webapp/app/entities/employeer-image/employeer-image-detail.component';
import { EmployeerImageService } from '../../../../../../main/webapp/app/entities/employeer-image/employeer-image.service';
import { EmployeerImage } from '../../../../../../main/webapp/app/entities/employeer-image/employeer-image.model';

describe('Component Tests', () => {

    describe('EmployeerImage Management Detail Component', () => {
        let comp: EmployeerImageDetailComponent;
        let fixture: ComponentFixture<EmployeerImageDetailComponent>;
        let service: EmployeerImageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerImageDetailComponent],
                providers: [
                    EmployeerImageService
                ]
            })
            .overrideTemplate(EmployeerImageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerImageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerImageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EmployeerImage(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employeerImage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
