import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ActionLogMapping} from './action-log-mapping.model';
import {createRequestOption} from '../../shared';
import {catchError} from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ActionLogMapping>;
export type UploadResponseType = HttpResponse<number>;

@Injectable({providedIn: 'root'})
export class ActionLogMappingService {

    private resourceUrl = SERVER_API_URL + '/api/action-log-mapping';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    update(actionLog: ActionLogMapping): Observable<EntityResponseType> {
        const copy = this.convert(actionLog);
        return this.http.put<ActionLogMapping>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ActionLogMapping>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ActionLogMapping[]>> {
        const options = createRequestOption(req);
        return this.http.get<ActionLogMapping[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<ActionLogMapping[]>) => this.convertArrayResponse(res));
    }

    createActionLogMapping(actionLogMapping: ActionLogMapping): Observable<EntityResponseType> {
        const copy = this.convert(actionLogMapping);
        return this.http.post<ActionLogMapping>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponseActionLogMapping(res));
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

    private convertResponseActionLogMapping(res: EntityResponseType): EntityResponseType {
        const body: ActionLogMapping = this.convertItemFromServerActionLogMapping(res.body);
        return res.clone({body});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ActionLogMapping = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ActionLogMapping[]>): HttpResponse<ActionLogMapping[]> {
        const jsonResponse: ActionLogMapping[] = res.body;
        const body: ActionLogMapping[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ActionLogMapping.
     */
    private convertItemFromServer(actionLog: ActionLogMapping): ActionLogMapping {
        const copy: ActionLogMapping = Object.assign({}, actionLog);
        return copy;
    }

    private convertItemFromServerActionLogMapping(actionLogMapping: ActionLogMapping): ActionLogMapping {
        const copy: ActionLogMapping = Object.assign({}, actionLogMapping);
        return copy;
    }

    /**
     * Convert a ActionLogMapping to a JSON which can be sent to the server.
     */
    private convert(actionLog: ActionLogMapping): ActionLogMapping {
        const copy: ActionLogMapping = Object.assign({}, actionLog);
        return copy;
    }
}
