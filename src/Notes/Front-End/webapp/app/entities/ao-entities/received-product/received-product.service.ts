import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ReceivedProduct} from './received-product.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<ReceivedProduct>;

@Injectable({ providedIn: 'root' })
export class ReceivedProductService {

    productTitleMap = new Map<number, string>();
    depotTitleMap = new Map<number, string>();

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/received-products';
    private resourceDayDepotUrl = SERVER_API_URL + 'niopdcao/api/day-depots';

    constructor(private http: HttpClient,
                private dateUtils: JhiDateUtils) {
    }

    create(receivedProduct: ReceivedProduct): Observable<EntityResponseType> {
        const copy = this.convert(receivedProduct);
        return this.http.post<ReceivedProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(receivedProduct: ReceivedProduct): Observable<EntityResponseType> {
        const copy = this.convert(receivedProduct);
        return this.http.put<ReceivedProduct>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReceivedProduct>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotId: any, req?: any): Observable<HttpResponse<ReceivedProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReceivedProduct[]>(this.resourceDayDepotUrl + '/' + dayDepotId + '/received-products', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<ReceivedProduct[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReceivedProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReceivedProduct[]>): HttpResponse<ReceivedProduct[]> {
        const jsonResponse: ReceivedProduct[] = res.body;
        const body: ReceivedProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReceivedProduct.
     */
    private convertItemFromServer(receivedProduct: ReceivedProduct): ReceivedProduct {
        const copy: ReceivedProduct = Object.assign({}, receivedProduct);

        /* if (this.productTitleMap.has(copy.productId)) {
             copy.productTitle = this.productTitleMap.get(copy.productId);
         } else {
             this.productService.find(copy.productId).subscribe((product) => {
                 copy.productTitle = product.body.title;
                 this.productTitleMap.set(copy.productId, copy.productTitle);
             });
         }

         if (this.depotTitleMap.has(copy.inventoryId)) {
             copy.inventoryTitle = this.depotTitleMap.get(copy.inventoryId);
         } else {
             this.depotService.find(copy.inventoryId)
                 .subscribe((depot) => {
                     copy.inventoryTitle = depot.body.title;
                     this.depotTitleMap.set(copy.inventoryId, copy.inventoryTitle);
                 });
         }*/

        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(receivedProduct.registerDate);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(receivedProduct.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(receivedProduct.finishDate);
        return copy;
    }

    /**
     * Convert a ReceivedProduct to a JSON which can be sent to the server.
     */
    private convert(receivedProduct: ReceivedProduct): ReceivedProduct {
        const copy: ReceivedProduct = Object.assign({}, receivedProduct);

        return copy;
    }
}
