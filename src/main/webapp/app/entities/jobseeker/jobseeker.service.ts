import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Jobseeker } from './jobseeker.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Jobseeker>;

@Injectable()
export class JobseekerService {

    private resourceUrl =  SERVER_API_URL + 'api/jobseekers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(jobseeker: Jobseeker): Observable<EntityResponseType> {
        const copy = this.convert(jobseeker);
        return this.http.post<Jobseeker>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobseeker: Jobseeker): Observable<EntityResponseType> {
        const copy = this.convert(jobseeker);
        return this.http.put<Jobseeker>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Jobseeker>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Jobseeker[]>> {
        const options = createRequestOption(req);
        return this.http.get<Jobseeker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Jobseeker[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Jobseeker = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Jobseeker[]>): HttpResponse<Jobseeker[]> {
        const jsonResponse: Jobseeker[] = res.body;
        const body: Jobseeker[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Jobseeker.
     */
    private convertItemFromServer(jobseeker: Jobseeker): Jobseeker {
        const copy: Jobseeker = Object.assign({}, jobseeker);
        copy.regestrationDate = this.dateUtils
            .convertLocalDateFromServer(jobseeker.regestrationDate);
        copy.birthYear = this.dateUtils
            .convertLocalDateFromServer(jobseeker.birthYear);
        copy.lastActive = this.dateUtils
            .convertLocalDateFromServer(jobseeker.lastActive);
        return copy;
    }

    /**
     * Convert a Jobseeker to a JSON which can be sent to the server.
     */
    private convert(jobseeker: Jobseeker): Jobseeker {
        const copy: Jobseeker = Object.assign({}, jobseeker);
        copy.regestrationDate = this.dateUtils
            .convertLocalDateToServer(jobseeker.regestrationDate);
        copy.birthYear = this.dateUtils
            .convertLocalDateToServer(jobseeker.birthYear);
        copy.lastActive = this.dateUtils
            .convertLocalDateToServer(jobseeker.lastActive);
        return copy;
    }
}
