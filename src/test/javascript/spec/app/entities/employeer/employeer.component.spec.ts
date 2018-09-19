/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FmsAppTestModule } from '../../../test.module';
import { EmployeerComponent } from '../../../../../../main/webapp/app/entities/employeer/employeer.component';
import { EmployeerService } from '../../../../../../main/webapp/app/entities/employeer/employeer.service';
import { Employeer } from '../../../../../../main/webapp/app/entities/employeer/employeer.model';

describe('Component Tests', () => {

    describe('Employeer Management Component', () => {
        let comp: EmployeerComponent;
        let fixture: ComponentFixture<EmployeerComponent>;
        let service: EmployeerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FmsAppTestModule],
                declarations: [EmployeerComponent],
                providers: [
                    EmployeerService
                ]
            })
            .overrideTemplate(EmployeerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Employeer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employeers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
