import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Reference } from './reference.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Reference>;

@Injectable()
export class ReferenceService {

    private resourceUrl =  SERVER_API_URL + 'api/references';

    constructor(private http: HttpClient) { }

    create(reference: Reference): Observable<EntityResponseType> {
        const copy = this.convert(reference);
        return this.http.post<Reference>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reference: Reference): Observable<EntityResponseType> {
        const copy = this.convert(reference);
        return this.http.put<Reference>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Reference>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Reference[]>> {
        const options = createRequestOption(req);
        return this.http.get<Reference[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Reference[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Reference = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Reference[]>): HttpResponse<Reference[]> {
        const jsonResponse: Reference[] = res.body;
        const body: Reference[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Reference.
     */
    private convertItemFromServer(reference: Reference): Reference {
        const copy: Reference = Object.assign({}, reference);
        return copy;
    }

    /**
     * Convert a Reference to a JSON which can be sent to the server.
     */
    private convert(reference: Reference): Reference {
        const copy: Reference = Object.assign({}, reference);
        return copy;
    }
}
