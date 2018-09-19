import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { JobseekerCompliance } from './jobseeker-compliance.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobseekerCompliance>;

@Injectable()
export class JobseekerComplianceService {

    private resourceUrl =  SERVER_API_URL + 'api/jobseeker-compliances';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(jobseekerCompliance: JobseekerCompliance): Observable<EntityResponseType> {
        const copy = this.convert(jobseekerCompliance);
        return this.http.post<JobseekerCompliance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobseekerCompliance: JobseekerCompliance): Observable<EntityResponseType> {
        const copy = this.convert(jobseekerCompliance);
        return this.http.put<JobseekerCompliance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JobseekerCompliance>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobseekerCompliance[]>> {
        const options = createRequestOption(req);
        return this.http.get<JobseekerCompliance[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobseekerCompliance[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobseekerCompliance = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JobseekerCompliance[]>): HttpResponse<JobseekerCompliance[]> {
        const jsonResponse: JobseekerCompliance[] = res.body;
        const body: JobseekerCompliance[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JobseekerCompliance.
     */
    private convertItemFromServer(jobseekerCompliance: JobseekerCompliance): JobseekerCompliance {
        const copy: JobseekerCompliance = Object.assign({}, jobseekerCompliance);
        copy.dateCompliance = this.dateUtils
            .convertLocalDateFromServer(jobseekerCompliance.dateCompliance);
        return copy;
    }

    /**
     * Convert a JobseekerCompliance to a JSON which can be sent to the server.
     */
    private convert(jobseekerCompliance: JobseekerCompliance): JobseekerCompliance {
        const copy: JobseekerCompliance = Object.assign({}, jobseekerCompliance);
        copy.dateCompliance = this.dateUtils
            .convertLocalDateToServer(jobseekerCompliance.dateCompliance);
        return copy;
    }
}
