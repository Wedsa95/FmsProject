import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Email } from './email.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Email>;

@Injectable()
export class EmailService {

    private resourceUrl =  SERVER_API_URL + 'api/emails';

    constructor(private http: HttpClient) { }

    create(email: Email): Observable<EntityResponseType> {
        const copy = this.convert(email);
        return this.http.post<Email>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(email: Email): Observable<EntityResponseType> {
        const copy = this.convert(email);
        return this.http.put<Email>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Email>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Email[]>> {
        const options = createRequestOption(req);
        return this.http.get<Email[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Email[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Email = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Email[]>): HttpResponse<Email[]> {
        const jsonResponse: Email[] = res.body;
        const body: Email[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Email.
     */
    private convertItemFromServer(email: Email): Email {
        const copy: Email = Object.assign({}, email);
        return copy;
    }

    /**
     * Convert a Email to a JSON which can be sent to the server.
     */
    private convert(email: Email): Email {
        const copy: Email = Object.assign({}, email);
        return copy;
    }
}
