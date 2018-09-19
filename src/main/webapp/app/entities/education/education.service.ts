import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Education } from './education.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Education>;

@Injectable()
export class EducationService {

    private resourceUrl =  SERVER_API_URL + 'api/educations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(education: Education): Observable<EntityResponseType> {
        const copy = this.convert(education);
        return this.http.post<Education>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(education: Education): Observable<EntityResponseType> {
        const copy = this.convert(education);
        return this.http.put<Education>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Education>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Education[]>> {
        const options = createRequestOption(req);
        return this.http.get<Education[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Education[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Education = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Education[]>): HttpResponse<Education[]> {
        const jsonResponse: Education[] = res.body;
        const body: Education[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Education.
     */
    private convertItemFromServer(education: Education): Education {
        const copy: Education = Object.assign({}, education);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(education.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateFromServer(education.endDate);
        return copy;
    }

    /**
     * Convert a Education to a JSON which can be sent to the server.
     */
    private convert(education: Education): Education {
        const copy: Education = Object.assign({}, education);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(education.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(education.endDate);
        return copy;
    }
}
