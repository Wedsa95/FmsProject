import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Employeer } from './employeer-profile.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Employeer>;

@Injectable()
export class EmployeerProfileService {

    private resourceUrl =  SERVER_API_URL + 'api/employeers';
    private resourceCurrentUrl =  SERVER_API_URL + 'api/employeer';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(employeer: Employeer): Observable<EntityResponseType> {
        const copy = this.convert(employeer);
        return this.http.post<Employeer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(employeer: Employeer): Observable<EntityResponseType> {
        const copy = this.convert(employeer);
        return this.http.put<Employeer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Employeer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    current(): Observable<EntityResponseType> {
        return this.http.get<Employeer>(this.resourceCurrentUrl, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Employeer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Employeer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Employeer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Employeer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Employeer[]>): HttpResponse<Employeer[]> {
        const jsonResponse: Employeer[] = res.body;
        const body: Employeer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Employeer.
     */
    private convertItemFromServer(employeer: Employeer): Employeer {
        const copy: Employeer = Object.assign({}, employeer);
        copy.lastActive = this.dateUtils
            .convertLocalDateFromServer(employeer.lastActive);
        return copy;
    }

    /**
     * Convert a Employeer to a JSON which can be sent to the server.
     */
    private convert(employeer: Employeer): Employeer {
        const copy: Employeer = Object.assign({}, employeer);
        copy.lastActive = this.dateUtils
            .convertLocalDateToServer(employeer.lastActive);
        return copy;
    }
}
