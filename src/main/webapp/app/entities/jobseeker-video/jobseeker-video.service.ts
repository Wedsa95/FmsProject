import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JobseekerVideo } from './jobseeker-video.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobseekerVideo>;

@Injectable()
export class JobseekerVideoService {

    private resourceUrl =  SERVER_API_URL + 'api/jobseeker-videos';

    constructor(private http: HttpClient) { }

    create(jobseekerVideo: JobseekerVideo): Observable<EntityResponseType> {
        const copy = this.convert(jobseekerVideo);
        return this.http.post<JobseekerVideo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobseekerVideo: JobseekerVideo): Observable<EntityResponseType> {
        const copy = this.convert(jobseekerVideo);
        return this.http.put<JobseekerVideo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JobseekerVideo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobseekerVideo[]>> {
        const options = createRequestOption(req);
        return this.http.get<JobseekerVideo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobseekerVideo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobseekerVideo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JobseekerVideo[]>): HttpResponse<JobseekerVideo[]> {
        const jsonResponse: JobseekerVideo[] = res.body;
        const body: JobseekerVideo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JobseekerVideo.
     */
    private convertItemFromServer(jobseekerVideo: JobseekerVideo): JobseekerVideo {
        const copy: JobseekerVideo = Object.assign({}, jobseekerVideo);
        return copy;
    }

    /**
     * Convert a JobseekerVideo to a JSON which can be sent to the server.
     */
    private convert(jobseekerVideo: JobseekerVideo): JobseekerVideo {
        const copy: JobseekerVideo = Object.assign({}, jobseekerVideo);
        return copy;
    }
}
