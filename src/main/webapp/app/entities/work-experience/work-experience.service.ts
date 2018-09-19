import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { WorkExperience } from './work-experience.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<WorkExperience>;

@Injectable()
export class WorkExperienceService {

    private resourceUrl =  SERVER_API_URL + 'api/work-experiences';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(workExperience: WorkExperience): Observable<EntityResponseType> {
        const copy = this.convert(workExperience);
        return this.http.post<WorkExperience>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(workExperience: WorkExperience): Observable<EntityResponseType> {
        const copy = this.convert(workExperience);
        return this.http.put<WorkExperience>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WorkExperience>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WorkExperience[]>> {
        const options = createRequestOption(req);
        return this.http.get<WorkExperience[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WorkExperience[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WorkExperience = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WorkExperience[]>): HttpResponse<WorkExperience[]> {
        const jsonResponse: WorkExperience[] = res.body;
        const body: WorkExperience[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WorkExperience.
     */
    private convertItemFromServer(workExperience: WorkExperience): WorkExperience {
        const copy: WorkExperience = Object.assign({}, workExperience);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(workExperience.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateFromServer(workExperience.endDate);
        return copy;
    }

    /**
     * Convert a WorkExperience to a JSON which can be sent to the server.
     */
    private convert(workExperience: WorkExperience): WorkExperience {
        const copy: WorkExperience = Object.assign({}, workExperience);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(workExperience.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(workExperience.endDate);
        return copy;
    }
}
