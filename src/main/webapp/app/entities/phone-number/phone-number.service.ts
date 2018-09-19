import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PhoneNumber } from './phone-number.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PhoneNumber>;

@Injectable()
export class PhoneNumberService {

    private resourceUrl =  SERVER_API_URL + 'api/phone-numbers';

    constructor(private http: HttpClient) { }

    create(phoneNumber: PhoneNumber): Observable<EntityResponseType> {
        const copy = this.convert(phoneNumber);
        return this.http.post<PhoneNumber>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(phoneNumber: PhoneNumber): Observable<EntityResponseType> {
        const copy = this.convert(phoneNumber);
        return this.http.put<PhoneNumber>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PhoneNumber>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PhoneNumber[]>> {
        const options = createRequestOption(req);
        return this.http.get<PhoneNumber[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PhoneNumber[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PhoneNumber = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PhoneNumber[]>): HttpResponse<PhoneNumber[]> {
        const jsonResponse: PhoneNumber[] = res.body;
        const body: PhoneNumber[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PhoneNumber.
     */
    private convertItemFromServer(phoneNumber: PhoneNumber): PhoneNumber {
        const copy: PhoneNumber = Object.assign({}, phoneNumber);
        return copy;
    }

    /**
     * Convert a PhoneNumber to a JSON which can be sent to the server.
     */
    private convert(phoneNumber: PhoneNumber): PhoneNumber {
        const copy: PhoneNumber = Object.assign({}, phoneNumber);
        return copy;
    }
}
