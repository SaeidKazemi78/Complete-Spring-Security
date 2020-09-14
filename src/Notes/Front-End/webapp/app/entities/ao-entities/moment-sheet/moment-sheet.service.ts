import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {MomentSheet} from './moment-sheet.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<MomentSheet>;

@Injectable({ providedIn: 'root' })
export class MomentSheetService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/moment-sheets';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    query(req?: any): Observable<HttpResponse<MomentSheet[]>> {
        const options = createRequestOption(req);
        return this.http.get<MomentSheet[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<MomentSheet[]>) => this.convertArrayResponse(res));
    }

    queryByFilter(refuelCenterId?: any, req?: any): Observable<HttpResponse<MomentSheet[]>> {
        let params = createRequestOption(req);
        params = params
            .set('refuelCenterId', refuelCenterId.toString());
        return this.http.post<MomentSheet[]>(`${this.resourceUrl}`, params, {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<MomentSheet[]>) => this.convertArrayResponse(res));
    }

    queryByFilterDay(refuelCenterId?: any, startTime?: any, endTime?: any, req?: any): Observable<HttpResponse<MomentSheet[]>> {
        let params = createRequestOption(req);
        params = params
            .set('refuelCenterId', refuelCenterId.toString())
            .set('startTime', startTime.toISOString())
            .set('endTime', endTime.toISOString());
        return this.http.post<MomentSheet[]>(`${this.resourceUrl}/day`, params, {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<MomentSheet[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<MomentSheet[]>): HttpResponse<MomentSheet[]> {
        const jsonResponse: MomentSheet[] = res.body;
        const body: MomentSheet[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MomentSheet.
     */
    private convertItemFromServer(momentSheet: MomentSheet): MomentSheet {
        const copy: MomentSheet = Object.assign({}, momentSheet);
        // todo fix date time for this service.
        /*copy.startDate = this.dateUtils
            .convertDateTimeFromServer(momentSheet.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(momentSheet.finishDate);*/
        return copy;
    }

    /**
     * Convert a MomentSheet to a JSON which can be sent to the server.
     */
}
