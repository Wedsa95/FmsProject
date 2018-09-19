/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerDetailComponent } from '../../../../../../main/webapp/app/entities/employeer/employeer-detail.component';
import { EmployeerService } from '../../../../../../main/webapp/app/entities/employeer/employeer.service';
import { Employeer } from '../../../../../../main/webapp/app/entities/employeer/employeer.model';

describe('Component Tests', () => {

    describe('Employeer Management Detail Component', () => {
        let comp: EmployeerDetailComponent;
        let fixture: ComponentFixture<EmployeerDetailComponent>;
        let service: EmployeerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerDetailComponent],
                providers: [
                    EmployeerService
                ]
            })
            .overrideTemplate(EmployeerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Employeer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employeer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
