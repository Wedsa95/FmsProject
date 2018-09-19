import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JobseekerImage } from './jobseeker-image.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobseekerImage>;

@Injectable()
export class JobseekerImageService {

    private resourceUrl =  SERVER_API_URL + 'api/jobseeker-images';

    constructor(private http: HttpClient) { }

    create(jobseekerImage: JobseekerImage): Observable<EntityResponseType> {
        const copy = this.convert(jobseekerImage);
        return this.http.post<JobseekerImage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobseekerImage: JobseekerImage): Observable<EntityResponseType> {
        const copy = this.convert(jobseekerImage);
        return this.http.put<JobseekerImage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JobseekerImage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobseekerImage[]>> {
        const options = createRequestOption(req);
        return this.http.get<JobseekerImage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobseekerImage[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobseekerImage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JobseekerImage[]>): HttpResponse<JobseekerImage[]> {
        const jsonResponse: JobseekerImage[] = res.body;
        const body: JobseekerImage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JobseekerImage.
     */
    private convertItemFromServer(jobseekerImage: JobseekerImage): JobseekerImage {
        const copy: JobseekerImage = Object.assign({}, jobseekerImage);
        return copy;
    }

    /**
     * Convert a JobseekerImage to a JSON which can be sent to the server.
     */
    private convert(jobseekerImage: JobseekerImage): JobseekerImage {
        const copy: JobseekerImage = Object.assign({}, jobseekerImage);
        return copy;
    }
}
