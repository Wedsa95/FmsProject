import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ConsultingExperience } from './consulting-experience.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ConsultingExperience>;

@Injectable()
export class ConsultingExperienceService {

    private resourceUrl =  SERVER_API_URL + 'api/consulting-experiences';

    constructor(private http: HttpClient) { }

    create(consultingExperience: ConsultingExperience): Observable<EntityResponseType> {
        const copy = this.convert(consultingExperience);
        return this.http.post<ConsultingExperience>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(consultingExperience: ConsultingExperience): Observable<EntityResponseType> {
        const copy = this.convert(consultingExperience);
        return this.http.put<ConsultingExperience>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ConsultingExperience>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ConsultingExperience[]>> {
        const options = createRequestOption(req);
        return this.http.get<ConsultingExperience[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ConsultingExperience[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ConsultingExperience = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ConsultingExperience[]>): HttpResponse<ConsultingExperience[]> {
        const jsonResponse: ConsultingExperience[] = res.body;
        const body: ConsultingExperience[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ConsultingExperience.
     */
    private convertItemFromServer(consultingExperience: ConsultingExperience): ConsultingExperience {
        const copy: ConsultingExperience = Object.assign({}, consultingExperience);
        return copy;
    }

    /**
     * Convert a ConsultingExperience to a JSON which can be sent to the server.
     */
    private convert(consultingExperience: ConsultingExperience): ConsultingExperience {
        const copy: ConsultingExperience = Object.assign({}, consultingExperience);
        return copy;
    }
}
