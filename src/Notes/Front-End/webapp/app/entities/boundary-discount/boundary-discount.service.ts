import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {BoundaryDiscount, InquiryCmr} from './boundary-discount.model';
import {createRequestOption} from '../../shared';
import {Product} from 'app/entities/product';

export type EntityResponseType = HttpResponse<BoundaryDiscount>;

@Injectable({ providedIn: 'root' })
export class BoundaryDiscountService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/boundary-discounts';

    constructor(private http: HttpClient) {
    }

    create(boundaryDiscount: BoundaryDiscount): Observable<EntityResponseType> {
        const copy = this.convert(boundaryDiscount);
        return this.http.post<BoundaryDiscount>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(boundaryDiscount: BoundaryDiscount): Observable<EntityResponseType> {
        const copy = this.convert(boundaryDiscount);
        return this.http.put<BoundaryDiscount>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BoundaryDiscount>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(locationId, countryId, vehicleModelId, liter, req?: any): Observable<HttpResponse<BoundaryDiscount[]>> {
        let options = createRequestOption(req);
        if (locationId) {
            options = options.set('location', locationId);
        }
        if (countryId) {
            options = options.set('country', countryId);
        }
        if (vehicleModelId) {
            options = options.set('vehicleModelType', vehicleModelId);
        }
        if (liter) {
            options = options.set('liter', liter);
        }

        return this.http.get<BoundaryDiscount[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<BoundaryDiscount[]>) => this.convertArrayResponse(res));
    }

    queryLiter(req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get<any>(`${this.resourceUrl}/liter`, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    findBoundaryDiscountByLocationAndCustomerAndCmr(locationId, customerId, cmr: string, vehicleModelType: string): Observable<HttpResponse<InquiryCmr>> {
        const options = new HttpParams()
            .set('locationId', locationId.toString())
            .set('customerId', customerId.toString())
            .set('cmr', cmr.toString())
            .set('vehicleModelType', vehicleModelType);
        return this.http.get<InquiryCmr>(`${this.resourceUrl}/inquiry`, {params: options, observe: 'response'})
            .map((res: HttpResponse<InquiryCmr>) => res);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BoundaryDiscount = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BoundaryDiscount[]>): HttpResponse<BoundaryDiscount[]> {
        const jsonResponse: BoundaryDiscount[] = res.body;
        const body: BoundaryDiscount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BoundaryDiscount.
     */
    private convertItemFromServer(boundaryDiscount: BoundaryDiscount): BoundaryDiscount {
        const copy: BoundaryDiscount = Object.assign({}, boundaryDiscount);
        return copy;
    }

    /**
     * Convert a BoundaryDiscount to a JSON which can be sent to the server.
     */
    private convert(boundaryDiscount: BoundaryDiscount): BoundaryDiscount {
        const copy: BoundaryDiscount = Object.assign({}, boundaryDiscount);
        return copy;
    }
}
