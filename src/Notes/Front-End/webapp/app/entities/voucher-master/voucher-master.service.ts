import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,  HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';
import {catchError} from 'rxjs/operators';

import {JhiDateUtils} from 'ng-jhipster';

import {VoucherMaster} from './voucher-master.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<VoucherMaster>;

@Injectable({providedIn: 'root'})
export class VoucherMasterService {

    private resourceUrl = SERVER_API_URL + 'niopdcaccounting/api/voucher-masters';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(voucherMaster: VoucherMaster): Observable<EntityResponseType> {
        const copy = this.convert(voucherMaster);
        return this.http.post<VoucherMaster>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voucherMaster: VoucherMaster): Observable<EntityResponseType> {
        const copy = this.convert(voucherMaster);
        return this.http.put<VoucherMaster>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherMaster>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findForReport(id: number): Observable<EntityResponseType> {
        return this.http.get<VoucherMaster>(`${this.resourceUrl}/report/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VoucherMaster[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoucherMaster[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<VoucherMaster[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    revertConfirm(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/${id}/revert-confirm`, {observe: 'response'});
    }

    confirm(id: number, description: string): Observable<HttpResponse<any>> {
        const copy = {id, description};
        return this.http.put<any>(`${this.resourceUrl}/confirm`, copy, {observe: 'response'});
    }

    downloacAccFile(voucherMasterId: number): Observable<HttpResponse<any>> {
        return this.http.put(`${this.resourceUrl}/` + voucherMasterId + `/receive-acc-file`, {},
            {responseType: 'blob', observe: 'response'}).pipe(catchError(this.parseErrorBlob));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoucherMaster = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoucherMaster[]>): HttpResponse<VoucherMaster[]> {
        const jsonResponse: VoucherMaster[] = res.body;
        const body: VoucherMaster[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoucherMaster.
     */
    private convertItemFromServer(voucherMaster: VoucherMaster): VoucherMaster {
        const copy: VoucherMaster = Object.assign({}, voucherMaster);
        copy.confirmDate = this.dateUtils
            .convertDateTimeFromServer(voucherMaster.confirmDate);
        return copy;
    }

    /**
     * Convert a VoucherMaster to a JSON which can be sent to the server.
     */
    private convert(voucherMaster: VoucherMaster): VoucherMaster {
        const copy: VoucherMaster = Object.assign({}, voucherMaster);
        return copy;
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
}
