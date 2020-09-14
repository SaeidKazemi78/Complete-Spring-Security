import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';
import {JhiDateUtils} from 'ng-jhipster';

import {Transfer} from './transfer.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<Transfer>;

@Injectable({ providedIn: 'root' })
export class TransferService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/transfers';
    private resourceDayDepotUrl = SERVER_API_URL + 'niopdcao/api/day-depots';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(transfer: Transfer): Observable<EntityResponseType> {
        const copy = this.convert(transfer);
        return this.http.post<Transfer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transfer: Transfer): Observable<EntityResponseType> {
        const copy = this.convert(transfer);
        return this.http.put<Transfer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Transfer>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotId: any, req?: any): Observable<HttpResponse<Transfer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Transfer[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/transfers/from', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Transfer[]>) => this.convertArrayResponse(res));
    }

    queryFindAllTransferTo(dayDepotId: any, req?: any): Observable<HttpResponse<Transfer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Transfer[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/transfers/to', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Transfer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Transfer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Transfer[]>): HttpResponse<Transfer[]> {
        const jsonResponse: Transfer[] = res.body;
        const body: Transfer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Transfer.
     */
    private convertItemFromServer(transfer: Transfer): Transfer {
        const copy: Transfer = Object.assign({}, transfer);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(transfer.registerDate);
        return copy;
    }

    /**
     * Convert a Transfer to a JSON which can be sent to the server.
     */
    private convert(transfer: Transfer): Transfer {
        const copy: Transfer = Object.assign({}, transfer);

        return copy;
    }
}
