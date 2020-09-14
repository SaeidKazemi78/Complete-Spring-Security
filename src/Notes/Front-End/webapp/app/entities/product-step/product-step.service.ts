import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ProductStep} from './product-step.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<ProductStep>;

@Injectable({ providedIn: 'root' })
export class ProductStepService {

    private resourceUrl = 'niopdcrate/api/product-steps';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(productStep: ProductStep): Observable<EntityResponseType> {
        const copy = this.convert(productStep);
        return this.http.post<ProductStep>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productStep: ProductStep): Observable<EntityResponseType> {
        const copy = this.convert(productStep);
        return this.http.put<ProductStep>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductStep>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductStep[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductStep[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<ProductStep[]>) => this.convertArrayResponse(res));
    }

    findAllByProductId(productId, paymentPeriod): Observable<HttpResponse<ProductStep[]>> {
        return this.http.get<ProductStep[]>(this.resourceUrl + '/product/' + productId + '/period/' + paymentPeriod, {observe: 'response'})
            .map((res: HttpResponse<ProductStep[]>) => this.convertArrayResponse(res));
    }

    findAllStepNo(): Observable<HttpResponse<number[]>> {
        return this.http.get<number[]>(this.resourceUrl + '/step-no', {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductStep = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductStep[]>): HttpResponse<ProductStep[]> {
        const jsonResponse: ProductStep[] = res.body;
        const body: ProductStep[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductStep.
     */
    private convertItemFromServer(productStep: ProductStep): ProductStep {
        const copy: ProductStep = Object.assign(new ProductStep(), productStep);

        return copy;
    }

    /**
     * Convert a ProductStep to a JSON which can be sent to the server.
     */
    private convert(productStep: ProductStep): ProductStep {
        const copy: ProductStep = Object.assign({}, productStep);

        return copy;
    }
}
