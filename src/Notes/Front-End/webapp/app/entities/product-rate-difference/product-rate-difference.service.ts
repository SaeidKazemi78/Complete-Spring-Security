import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {ProductRateDifference, ProductRateDifferenceRequest} from './product-rate-difference.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<ProductRateDifference>;

@Injectable({ providedIn: 'root' })
export class ProductRateDifferenceService {

    private resourceUrl = 'niopdcaccounting/api/product-rate-differences';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(req: ProductRateDifferenceRequest): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.resourceUrl, req, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductRateDifference>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductRateDifference[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductRateDifference[]>(`${this.resourceUrl}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<ProductRateDifference[]>) => this.convertArrayResponse(res));
    }

    queryForUnset(req: ProductRateDifferenceRequest): Observable<ProductRateDifference[]> {
        return this.http.post<ProductRateDifference[]>(`${this.resourceUrl}/unset`,  req);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductRateDifference = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductRateDifference[]>): HttpResponse<ProductRateDifference[]> {
        const jsonResponse: ProductRateDifference[] = res.body;
        const body: ProductRateDifference[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductRateDifference.
     */
    private convertItemFromServer(productRateDifference: ProductRateDifference): ProductRateDifference {
        const copy: ProductRateDifference = Object.assign(new ProductRateDifference(), productRateDifference);
        copy.exitFromDepotDate = this.dateUtils
            .convertDateTimeFromServer(copy.exitFromDepotDate);
        copy.orderRegisterDate = this.dateUtils
            .convertDateTimeFromServer(copy.orderRegisterDate);
        return copy;
    }

    /**
     * Convert a ProductRateDifference to a JSON which can be sent to the server.
     */
    private convert(productRateDifference: ProductRateDifference): ProductRateDifference {
        const copy: ProductRateDifference = Object.assign({}, productRateDifference);

        return copy;
    }

    createRequestIdentifier(id): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}/payment`, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

}
