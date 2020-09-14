import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {SendProduct} from './send-product.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<SendProduct>;

@Injectable({ providedIn: 'root' })
export class SendProductService {

    depotTitleMap = new Map<number, string>();

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/send-products';

    private resourceDayDepotUrl = 'niopdcao/api/day-depots';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(sendProduct: SendProduct): Observable<EntityResponseType> {
        const copy = this.convert(sendProduct);
        return this.http.post<SendProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sendProduct: SendProduct): Observable<EntityResponseType> {
        const copy = this.convert(sendProduct);
        return this.http.put<SendProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SendProduct>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotId: any, req?: any): Observable<HttpResponse<SendProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<SendProduct[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/send-products', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SendProduct[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SendProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SendProduct[]>): HttpResponse<SendProduct[]> {
        const jsonResponse: SendProduct[] = res.body;
        const body: SendProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SendProduct.
     */
    private convertItemFromServer(sendProduct: SendProduct): SendProduct {
        const copy: SendProduct = Object.assign({}, sendProduct);
        copy.sendDate = this.dateUtils
            .convertDateTimeFromServer(sendProduct.sendDate);
        copy.receivedDate = this.dateUtils
            .convertDateTimeFromServer(sendProduct.receivedDate);
        return copy;
    }

    /**
     * Convert a SendProduct to a JSON which can be sent to the server.
     */
    private convert(sendProduct: SendProduct): SendProduct {
        const copy: SendProduct = Object.assign({}, sendProduct);
        return copy;
    }

}
