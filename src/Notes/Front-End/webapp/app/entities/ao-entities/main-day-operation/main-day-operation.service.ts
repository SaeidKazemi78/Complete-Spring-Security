import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {MainDayOperation} from './main-day-operation.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<MainDayOperation>;

@Injectable({ providedIn: 'root' })
export class MainDayOperationService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/main-day-operations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(mainDayOperation: MainDayOperation): Observable<EntityResponseType> {
        const copy = this.convert(mainDayOperation);
        return this.http.post<MainDayOperation>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mainDayOperation: MainDayOperation): Observable<EntityResponseType> {
        const copy = this.convert(mainDayOperation);
        return this.http.put<MainDayOperation>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MainDayOperation>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    getLastOperationDay(refuelCenterId: number): Observable<Date> {
        return this.http.get<any>(`${this.resourceUrl}/${refuelCenterId}/getLastOperationDay`,
            {observe: 'response'})
            .map(c => this.dateUtils
                .convertDateTimeFromServer(c.body));
    }
    query(req?: any): Observable<HttpResponse<MainDayOperation[]>> {
        const options = createRequestOption(req);
        return this.http.get<MainDayOperation[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<MainDayOperation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    close(id: number): Observable<Response> {
        return this.http.get<Response>(`${this.resourceUrl}/${id}/close`);
    }

    editable(id: number): Observable<Boolean> {
        return this.http.get<Boolean>(`${this.resourceUrl}/${id}/editable`);
    }

    checkForUpdate(id: number): Observable<Response> {
        return this.http.get<Response>(`${this.resourceUrl}/${id}/update`);
    }

    open(id: number): Observable<Response> {
        return this.http.get<Response>(`${this.resourceUrl}/${id}/open`);
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MainDayOperation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseToDay(res: EntityResponseType): EntityResponseType {
        const body: any = this.dateUtils.convertDateTimeFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MainDayOperation[]>): HttpResponse<MainDayOperation[]> {
        const jsonResponse: MainDayOperation[] = res.body;
        const body: MainDayOperation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MainDayOperation.
     */
    private convertItemFromServer(mainDayOperation: MainDayOperation): MainDayOperation {
        const copy: MainDayOperation = Object.assign({}, mainDayOperation);
        copy.day = this.dateUtils
            .convertDateTimeFromServer(mainDayOperation.day);
        return copy;
    }

    /**
     * Convert a MainDayOperation to a JSON which can be sent to the server.
     */
    private convert(mainDayOperation: MainDayOperation): MainDayOperation {
        const copy: MainDayOperation = Object.assign({}, mainDayOperation);

        return copy;
    }
}
