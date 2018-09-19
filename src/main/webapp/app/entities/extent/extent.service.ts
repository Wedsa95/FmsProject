import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Extent } from './extent.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Extent>;

@Injectable()
export class ExtentService {

    private resourceUrl =  SERVER_API_URL + 'api/extents';

    constructor(private http: HttpClient) { }

    create(extent: Extent): Observable<EntityResponseType> {
        const copy = this.convert(extent);
        return this.http.post<Extent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(extent: Extent): Observable<EntityResponseType> {
        const copy = this.convert(extent);
        return this.http.put<Extent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Extent>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Extent[]>> {
        const options = createRequestOption(req);
        return this.http.get<Extent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Extent[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Extent = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Extent[]>): HttpResponse<Extent[]> {
        const jsonResponse: Extent[] = res.body;
        const body: Extent[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Extent.
     */
    private convertItemFromServer(extent: Extent): Extent {
        const copy: Extent = Object.assign({}, extent);
        return copy;
    }

    /**
     * Convert a Extent to a JSON which can be sent to the server.
     */
    private convert(extent: Extent): Extent {
        const copy: Extent = Object.assign({}, extent);
        return copy;
    }
}
