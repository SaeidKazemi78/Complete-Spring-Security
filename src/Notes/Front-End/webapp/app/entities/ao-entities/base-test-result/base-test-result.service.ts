import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {BaseTestResult} from './base-test-result.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<BaseTestResult>;

@Injectable({ providedIn: 'root' })
export class BaseTestResultService {

    private resourceUrl = 'niopdcao/api/base-test-results';

    private resourceParentBaseTestResultUrl = 'niopdcao/api/parent-base-test-results';

    constructor(private http: HttpClient) {
    }

    create(baseTestResult: BaseTestResult): Observable<EntityResponseType> {
        const copy = this.convert(baseTestResult);
        return this.http.post<BaseTestResult>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(baseTestResult: BaseTestResult): Observable<EntityResponseType> {
        const copy = this.convert(baseTestResult);
        return this.http.put<BaseTestResult>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BaseTestResult>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(parentBaseTestResultId: any, req?: any): Observable<HttpResponse<BaseTestResult[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseTestResult[]>(this.resourceParentBaseTestResultUrl + '/' + parentBaseTestResultId + '/base-test-results', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<BaseTestResult[]>) => this.convertArrayResponse(res));
    }

    queryByProduct(productId: any, testResultType: any, req?: any): Observable<HttpResponse<BaseTestResult[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseTestResult[]>(this.resourceParentBaseTestResultUrl + '/' + productId + '/' + testResultType + '/base-test-results/product', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<BaseTestResult[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BaseTestResult = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BaseTestResult[]>): HttpResponse<BaseTestResult[]> {
        const jsonResponse: BaseTestResult[] = res.body;
        const body: BaseTestResult[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BaseTestResult.
     */
    private convertItemFromServer(baseTestResult: BaseTestResult): BaseTestResult {
        const copy: BaseTestResult = Object.assign(new BaseTestResult(), baseTestResult);
        return copy;
    }

    /**
     * Convert a BaseTestResult to a JSON which can be sent to the server.
     */
    private convert(baseTestResult: BaseTestResult): BaseTestResult {
        const copy: BaseTestResult = Object.assign({}, baseTestResult);

        return copy;
    }

}
