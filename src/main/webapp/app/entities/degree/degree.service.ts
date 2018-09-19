import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Degree } from './degree.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Degree>;

@Injectable()
export class DegreeService {

    private resourceUrl =  SERVER_API_URL + 'api/degrees';

    constructor(private http: HttpClient) { }

    create(degree: Degree): Observable<EntityResponseType> {
        const copy = this.convert(degree);
        return this.http.post<Degree>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(degree: Degree): Observable<EntityResponseType> {
        const copy = this.convert(degree);
        return this.http.put<Degree>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Degree>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Degree[]>> {
        const options = createRequestOption(req);
        return this.http.get<Degree[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Degree[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Degree = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Degree[]>): HttpResponse<Degree[]> {
        const jsonResponse: Degree[] = res.body;
        const body: Degree[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Degree.
     */
    private convertItemFromServer(degree: Degree): Degree {
        const copy: Degree = Object.assign({}, degree);
        return copy;
    }

    /**
     * Convert a Degree to a JSON which can be sent to the server.
     */
    private convert(degree: Degree): Degree {
        const copy: Degree = Object.assign({}, degree);
        return copy;
    }
}
