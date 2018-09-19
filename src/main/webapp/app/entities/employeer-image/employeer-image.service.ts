import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EmployeerImage } from './employeer-image.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmployeerImage>;

@Injectable()
export class EmployeerImageService {

    private resourceUrl =  SERVER_API_URL + 'api/employeer-images';

    constructor(private http: HttpClient) { }

    create(employeerImage: EmployeerImage): Observable<EntityResponseType> {
        const copy = this.convert(employeerImage);
        return this.http.post<EmployeerImage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(employeerImage: EmployeerImage): Observable<EntityResponseType> {
        const copy = this.convert(employeerImage);
        return this.http.put<EmployeerImage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmployeerImage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmployeerImage[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmployeerImage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmployeerImage[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmployeerImage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmployeerImage[]>): HttpResponse<EmployeerImage[]> {
        const jsonResponse: EmployeerImage[] = res.body;
        const body: EmployeerImage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmployeerImage.
     */
    private convertItemFromServer(employeerImage: EmployeerImage): EmployeerImage {
        const copy: EmployeerImage = Object.assign({}, employeerImage);
        return copy;
    }

    /**
     * Convert a EmployeerImage to a JSON which can be sent to the server.
     */
    private convert(employeerImage: EmployeerImage): EmployeerImage {
        const copy: EmployeerImage = Object.assign({}, employeerImage);
        return copy;
    }
}
