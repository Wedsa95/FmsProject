import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Presentation } from './presentation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Presentation>;

@Injectable()
export class PresentationService {

    private resourceUrl =  SERVER_API_URL + 'api/presentations';

    constructor(private http: HttpClient) { }

    create(presentation: Presentation): Observable<EntityResponseType> {
        const copy = this.convert(presentation);
        return this.http.post<Presentation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(presentation: Presentation): Observable<EntityResponseType> {
        const copy = this.convert(presentation);
        return this.http.put<Presentation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Presentation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Presentation[]>> {
        const options = createRequestOption(req);
        return this.http.get<Presentation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Presentation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Presentation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Presentation[]>): HttpResponse<Presentation[]> {
        const jsonResponse: Presentation[] = res.body;
        const body: Presentation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Presentation.
     */
    private convertItemFromServer(presentation: Presentation): Presentation {
        const copy: Presentation = Object.assign({}, presentation);
        return copy;
    }

    /**
     * Convert a Presentation to a JSON which can be sent to the server.
     */
    private convert(presentation: Presentation): Presentation {
        const copy: Presentation = Object.assign({}, presentation);
        return copy;
    }
}
