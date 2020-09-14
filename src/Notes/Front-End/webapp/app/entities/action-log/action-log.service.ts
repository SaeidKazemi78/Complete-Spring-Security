import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ActionLog, ActionLogMapping} from './action-log.model';
import {createRequestOption} from '../../shared';
import {catchError} from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ActionLog>;
export type UploadResponseType = HttpResponse<number>;

@Injectable({providedIn: 'root'})
export class ActionLogService {

    private resourceUrl = SERVER_API_URL + '/api/action-log';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(actionLog: ActionLog): Observable<EntityResponseType> {
        const copy = this.convert(actionLog);
        return this.http.post<ActionLog>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(actionLog: ActionLog): Observable<EntityResponseType> {
        const copy = this.convert(actionLog);
        return this.http.put<ActionLog>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ActionLog>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ActionLog[]>> {
        const options = createRequestOption(req);
        return this.http.get<ActionLog[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<ActionLog[]>) => this.convertArrayResponse(res));
    }

    createActionLogMapping(actionLogMapping: ActionLogMapping): Observable<EntityResponseType> {
        const copy = this.convert(actionLogMapping);
        return this.http.post<ActionLogMapping>(this.resourceUrl + '/mapping', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponseActionLogMapping(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    downloadFile(id: number): Observable<HttpResponse<any>> {
        return this.http.get(`${this.resourceUrl}/${id}` + `/response-body`, {responseType: 'blob', observe: 'response'})
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
        const body: ActionLog = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ActionLog[]>): HttpResponse<ActionLog[]> {
        const jsonResponse: ActionLog[] = res.body;
        const body: ActionLog[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ActionLog.
     */
    private convertItemFromServer(actionLog: ActionLog): ActionLog {
        const copy: ActionLog = Object.assign({}, actionLog);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(actionLog.createdDate);
        return copy;
    }

    private convertItemFromServerActionLogMapping(actionLogMapping: ActionLogMapping): ActionLogMapping {
        const copy: ActionLogMapping = Object.assign({}, actionLogMapping);
        return copy;
    }

    /**
     * Convert a ActionLog to a JSON which can be sent to the server.
     */
    private convert(actionLog: ActionLog): ActionLog {
        const copy: ActionLog = Object.assign({}, actionLog);
        return copy;
    }
}
