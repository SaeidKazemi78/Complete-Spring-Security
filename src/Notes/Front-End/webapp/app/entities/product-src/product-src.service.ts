import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProductSrc } from './product-src.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductSrc>;

@Injectable({ providedIn: 'root' })
export class ProductSrcService {

    private resourceUrl = 'niopdcrate/api/product-srcs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(productSrc: ProductSrc): Observable<EntityResponseType> {
            const copy = this.convert(productSrc);
        return this.http.post<ProductSrc>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productSrc: ProductSrc): Observable<EntityResponseType> {
        const copy = this.convert(productSrc);
        return this.http.put<ProductSrc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductSrc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductSrc[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductSrc[]>(this. resourceUrl ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductSrc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductSrc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductSrc[]>): HttpResponse<ProductSrc[]> {
        const jsonResponse: ProductSrc[] = res.body;
        const body: ProductSrc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductSrc.
     */
    private convertItemFromServer(productSrc: ProductSrc): ProductSrc {
        const copy: ProductSrc = Object.assign(new ProductSrc(), productSrc);
                copy.startDate = this.dateUtils
            .convertDateTimeFromServer(copy.startDate);
                copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(copy.finishDate);
        return copy;
    }

    /**
     * Convert a ProductSrc to a JSON which can be sent to the server.
     */
    private convert(productSrc: ProductSrc): ProductSrc {
        const copy: ProductSrc = Object.assign({}, productSrc);

        return copy;
    }
}
