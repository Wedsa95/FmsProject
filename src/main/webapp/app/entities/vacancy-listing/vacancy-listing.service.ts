import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { VacancyListing } from './vacancy-listing.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VacancyListing>;

@Injectable()
export class VacancyListingService {

    private resourceUrl =  SERVER_API_URL + 'api/vacancies';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(vacancy: VacancyListing): Observable<EntityResponseType> {
        const copy = this.convert(vacancy);
        return this.http.post<VacancyListing>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vacancy: VacancyListing): Observable<EntityResponseType> {
        const copy = this.convert(vacancy);
        return this.http.put<VacancyListing>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VacancyListing>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VacancyListing[]>> {
        const options = createRequestOption(req);
        return this.http.get<VacancyListing[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VacancyListing[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VacancyListing = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VacancyListing[]>): HttpResponse<VacancyListing[]> {
        const jsonResponse: VacancyListing[] = res.body;
        const body: VacancyListing[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Vacancy.
     */
    private convertItemFromServer(vacancy: VacancyListing): VacancyListing {
        const copy: VacancyListing = Object.assign({}, vacancy);
        copy.uploadDate = this.dateUtils
            .convertLocalDateFromServer(vacancy.uploadDate);
        return copy;
    }

    /**
     * Convert a Vacancy to a JSON which can be sent to the server.
     */
    private convert(vacancy: VacancyListing): VacancyListing {
        const copy: VacancyListing = Object.assign({}, vacancy);
        copy.uploadDate = this.dateUtils
            .convertLocalDateToServer(vacancy.uploadDate);
        return copy;
    }
}
