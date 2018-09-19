import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmployeerCompliance } from './employeer-compliance.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmployeerCompliance>;

@Injectable()
export class EmployeerComplianceService {

    private resourceUrl =  SERVER_API_URL + 'api/employeer-compliances';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(employeerCompliance: EmployeerCompliance): Observable<EntityResponseType> {
        const copy = this.convert(employeerCompliance);
        return this.http.post<EmployeerCompliance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(employeerCompliance: EmployeerCompliance): Observable<EntityResponseType> {
        const copy = this.convert(employeerCompliance);
        return this.http.put<EmployeerCompliance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmployeerCompliance>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmployeerCompliance[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmployeerCompliance[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmployeerCompliance[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmployeerCompliance = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmployeerCompliance[]>): HttpResponse<EmployeerCompliance[]> {
        const jsonResponse: EmployeerCompliance[] = res.body;
        const body: EmployeerCompliance[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmployeerCompliance.
     */
    private convertItemFromServer(employeerCompliance: EmployeerCompliance): EmployeerCompliance {
        const copy: EmployeerCompliance = Object.assign({}, employeerCompliance);
        copy.dateCompliance = this.dateUtils
            .convertLocalDateFromServer(employeerCompliance.dateCompliance);
        return copy;
    }

    /**
     * Convert a EmployeerCompliance to a JSON which can be sent to the server.
     */
    private convert(employeerCompliance: EmployeerCompliance): EmployeerCompliance {
        const copy: EmployeerCompliance = Object.assign({}, employeerCompliance);
        copy.dateCompliance = this.dateUtils
            .convertLocalDateToServer(employeerCompliance.dateCompliance);
        return copy;
    }
}
