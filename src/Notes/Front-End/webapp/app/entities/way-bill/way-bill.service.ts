import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {WayBill} from './way-bill.model';
import {createRequestOption} from '../../shared';
import {catchError} from 'rxjs/operators';

export type EntityResponseType = HttpResponse<WayBill>;

@Injectable({ providedIn: 'root' })
export class WayBillService {

    private resourceUrl = 'niopdcao/api/way-bills';
    private resourceReportUrl = 'niopdcreport/api/ao/way-bill';

    private resourceDayDepotUrl = 'niopdcao/api/day-depots';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(wayBill: WayBill): Observable<EntityResponseType> {
        const copy = this.convert(wayBill);
        return this.http.post<WayBill>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(wayBill: WayBill): Observable<EntityResponseType> {
        const copy = this.convert(wayBill);
        return this.http.put<WayBill>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WayBill>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByOrderId(orderId: number): Observable<EntityResponseType> {
        return this.http.get<WayBill>(`${this.resourceUrl}/order/${orderId}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getReport(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceReportUrl}/${id}`, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    querySend(dayDepotId: any, req?: any): Observable<HttpResponse<WayBill[]>> {
        const options = createRequestOption(req);
        return this.http.get<WayBill[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/way-bills/send', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<WayBill[]>) => this.convertArrayResponse(res));
    }

    queryReceived(dayDepotId: any, req?: any): Observable<HttpResponse<WayBill[]>> {
        const options = createRequestOption(req);
        return this.http.get<WayBill[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/way-bills/received', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<WayBill[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    downloadRcv(startTime: any, endTime: any, id: number): Observable<HttpResponse<any>> {
        const params = new HttpParams()
            .set('startTime', startTime.toISOString())
            .set('endTime', endTime.toISOString());
        return this.http.put(`${this.resourceUrl}/download-rcv/${id}`, {},
            {responseType: 'blob', params, observe: 'response'}).pipe(catchError(this.parseErrorBlob));
    }

    uploadSndFile(file: File, dayDepotId: number): Observable<HttpResponse<any>> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(`${this.resourceUrl}/upload-file/${dayDepotId}`, formData, {observe: 'response'})
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WayBill = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WayBill[]>): HttpResponse<WayBill[]> {
        const jsonResponse: WayBill[] = res.body;
        const body: WayBill[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WayBill.
     */
    private convertItemFromServer(wayBill: WayBill): WayBill {
        const copy: WayBill = Object.assign(new WayBill(), wayBill);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(copy.registerDate);
        return copy;
    }

    /**
     * Convert a WayBill to a JSON which can be sent to the server.
     */
    private convert(wayBill: WayBill): WayBill {
        const copy: WayBill = Object.assign({}, wayBill);

        return copy;
    }

    parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        const reader: FileReader = new FileReader();

        const obs = Observable.create((observer: any) => {
            reader.onloadend =e => {
                observer.error(JSON.parse(reader.result as string));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }
}
