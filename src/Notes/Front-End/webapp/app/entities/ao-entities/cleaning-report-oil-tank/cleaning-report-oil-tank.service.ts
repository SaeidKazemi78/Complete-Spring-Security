import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {CleaningReportOilTank} from './cleaning-report-oil-tank.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<CleaningReportOilTank>;

@Injectable({ providedIn: 'root' })
export class CleaningReportOilTankService {

    private resourceUrl = 'niopdcao/api/cleaning-report-oil-tanks';
    private resourceReportUrl = 'niopdcreport/api/labs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(cleaningReportOilTank: CleaningReportOilTank): Observable<EntityResponseType> {
        const copy = this.convert(cleaningReportOilTank);
        return this.http.post<CleaningReportOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cleaningReportOilTank: CleaningReportOilTank): Observable<EntityResponseType> {
        const copy = this.convert(cleaningReportOilTank);
        return this.http.put<CleaningReportOilTank>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CleaningReportOilTank>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(mode?: string, req?: any): Observable<HttpResponse<CleaningReportOilTank[]>> {
        const options = createRequestOption(req);
        return this.http.get<CleaningReportOilTank[]>(`${this.resourceUrl}/${mode}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CleaningReportOilTank[]>) => this.convertArrayResponse(res));
    }

    print(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceReportUrl}/cleaning-report-oil-tank/print/${id}`, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    send(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/send`, {observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/confirm`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CleaningReportOilTank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CleaningReportOilTank[]>): HttpResponse<CleaningReportOilTank[]> {
        const jsonResponse: CleaningReportOilTank[] = res.body;
        const body: CleaningReportOilTank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CleaningReportOilTank.
     */
    private convertItemFromServer(cleaningReportOilTank: CleaningReportOilTank): CleaningReportOilTank {
        const copy: CleaningReportOilTank = Object.assign(new CleaningReportOilTank(), cleaningReportOilTank);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(copy.registerDate);
        return copy;
    }

    /**
     * Convert a CleaningReportOilTank to a JSON which can be sent to the server.
     */
    private convert(cleaningReportOilTank: CleaningReportOilTank): CleaningReportOilTank {
        const copy: CleaningReportOilTank = Object.assign({}, cleaningReportOilTank);

        return copy;
    }
}
