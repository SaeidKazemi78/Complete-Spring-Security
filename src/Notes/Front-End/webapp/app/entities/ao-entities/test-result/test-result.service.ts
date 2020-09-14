import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {TestResult} from './test-result.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<TestResult>;

@Injectable({ providedIn: 'root' })
export class TestResultService {

    private resourceUrl = 'niopdcao/api/test-results';

    constructor(private http: HttpClient) {
    }

    create(testResult: TestResult): Observable<EntityResponseType> {
        const copy = this.convert(testResult);
        return this.http.post<TestResult>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(testResult: TestResult): Observable<EntityResponseType> {
        const copy = this.convert(testResult);
        return this.http.put<TestResult>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TestResult>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    send(id: number): Observable<EntityResponseType> {
        return this.http.get<TestResult>(`${this.resourceUrl}/${id}/send`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    confirm(id: number): Observable<EntityResponseType> {
        return this.http.get<TestResult>(`${this.resourceUrl}/${id}/confirm`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(Id: any, req?: any): Observable<HttpResponse<TestResult[]>> {
        const options = createRequestOption(req);
        return this.http.get<TestResult[]>(this.resourceUrl + '/' + Id + '/test-results', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<TestResult[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TestResult = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TestResult[]>): HttpResponse<TestResult[]> {
        const jsonResponse: TestResult[] = res.body;
        const body: TestResult[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TestResult.
     */
    private convertItemFromServer(testResult: TestResult): TestResult {
        const copy: TestResult = Object.assign(new TestResult(), testResult);
        return copy;
    }

    /**
     * Convert a TestResult to a JSON which can be sent to the server.
     */
    private convert(testResult: TestResult): TestResult {
        const copy: TestResult = Object.assign({}, testResult);

        return copy;
    }
}
