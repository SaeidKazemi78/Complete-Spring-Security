import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {SendContainerProduct} from './send-container-product.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<SendContainerProduct>;

@Injectable({ providedIn: 'root' })
export class SendContainerProductService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/send-container-products';

    private resourceDayDepotContainerUrl = 'niopdcao/api/day-depot-containers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(sendContainerProduct: SendContainerProduct): Observable<EntityResponseType> {
        const copy = this.convert(sendContainerProduct);
        return this.http.post<SendContainerProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sendContainerProduct: SendContainerProduct): Observable<EntityResponseType> {
        const copy = this.convert(sendContainerProduct);
        return this.http.put<SendContainerProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SendContainerProduct>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotContainerId: any, req?: any): Observable<HttpResponse<SendContainerProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<SendContainerProduct[]>(this.resourceDayDepotContainerUrl + '/' + dayDepotContainerId + '/send-container-products', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SendContainerProduct[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SendContainerProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SendContainerProduct[]>): HttpResponse<SendContainerProduct[]> {
        const jsonResponse: SendContainerProduct[] = res.body;
        const body: SendContainerProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SendContainerProduct.
     */
    private convertItemFromServer(sendContainerProduct: SendContainerProduct): SendContainerProduct {
        const copy: SendContainerProduct = Object.assign({}, sendContainerProduct);
        copy.sendDate = this.dateUtils
            .convertDateTimeFromServer(sendContainerProduct.sendDate);
        copy.receivedDate = this.dateUtils
            .convertDateTimeFromServer(sendContainerProduct.receivedDate);
        return copy;
    }

    /**
     * Convert a SendContainerProduct to a JSON which can be sent to the server.
     */
    private convert(sendContainerProduct: SendContainerProduct): SendContainerProduct {
        const copy: SendContainerProduct = Object.assign({}, sendContainerProduct);
        return copy;
    }
}
