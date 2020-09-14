import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { Infringement} from './infringement.model';
import {createRequestOption} from '../../shared';
import {catchError} from 'rxjs/operators';

export type EntityResponseType = HttpResponse<Infringement>;
export type UploadResponseType = HttpResponse<number>;

@Injectable({providedIn: 'root'})
export class InfringementService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/infringements';

    constructor(private http: HttpClient) {
    }

    create(infringement: Infringement): Observable<EntityResponseType> {
        const copy = this.convert(infringement);
        return this.http.post<Infringement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    deActive(infringement: Infringement): Observable<EntityResponseType> {
        const copy = this.convert(infringement);
        return this.http.put<Infringement>(`${this.resourceUrl}/${infringement.id}/de-active`, copy, {observe: 'response'});
    }

    update(infringement: Infringement): Observable<EntityResponseType> {
        const copy = this.convert(infringement);
        return this.http.put<Infringement>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Infringement>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Infringement[]>> {
        const options = createRequestOption(req);
        return this.http.get<Infringement[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Infringement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    postFile(fileToUpload: File): Observable<UploadResponseType> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post<number>('/api/media/upload', formData, {observe: 'response'});

    }

    downloadFile(fileId: number): Observable<HttpResponse<any>> {
        return this.http.get(`/api/media/download/${fileId}`, {responseType: 'blob', observe: 'response'})
            .pipe(catchError(this.parseErrorBlob));

    }

    infringementReport(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.resourceUrl +  `/${id}/report` , {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }
    parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        const reader: FileReader = new FileReader();

        const obs = Observable.create((observer: any) => {
            reader.onloadend = e => {
                observer.error(JSON.parse(reader.result as string));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Infringement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Infringement[]>): HttpResponse<Infringement[]> {
        const jsonResponse: Infringement[] = res.body;
        const body: Infringement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Infringement.
     */
    private convertItemFromServer(infringement: Infringement): Infringement {
        const copy: Infringement = Object.assign({}, infringement);
        return copy;
    }

    /**
     * Convert a Infringement to a JSON which can be sent to the server.
     */
    private convert(infringement: Infringement): Infringement {
        const copy: Infringement = Object.assign({}, infringement);
        return copy;
    }
}
