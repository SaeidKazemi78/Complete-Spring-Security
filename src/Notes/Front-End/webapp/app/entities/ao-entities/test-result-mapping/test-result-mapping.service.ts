import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {TestResultMapping} from './test-result-mapping.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<TestResultMapping>;

@Injectable({ providedIn: 'root' })
export class TestResultMappingService {

    private resourceUrl = 'niopdcao/api/test-result-mappings';

    private resourceBaseTestResultUrl = 'niopdcao/api/base-test-results';

    constructor(private http: HttpClient) {
    }

    create(testResultMapping: TestResultMapping): Observable<EntityResponseType> {
        const copy = this.convert(testResultMapping);
        return this.http.post<TestResultMapping>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(testResultMapping: TestResultMapping): Observable<EntityResponseType> {
        const copy = this.convert(testResultMapping);
        return this.http.put<TestResultMapping>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TestResultMapping>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(baseTestResultId: any, req?: any): Observable<HttpResponse<TestResultMapping[]>> {
        const options = createRequestOption(req);
        return this.http.get<TestResultMapping[]>(this.resourceBaseTestResultUrl + '/' + baseTestResultId + '/test-result-mappings', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<TestResultMapping[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TestResultMapping = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TestResultMapping[]>): HttpResponse<TestResultMapping[]> {
        const jsonResponse: TestResultMapping[] = res.body;
        const body: TestResultMapping[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TestResultMapping.
     */
    private convertItemFromServer(testResultMapping: TestResultMapping): TestResultMapping {
        const copy: TestResultMapping = Object.assign(new TestResultMapping(), testResultMapping);
        return copy;
    }

    /**
     * Convert a TestResultMapping to a JSON which can be sent to the server.
     */
    private convert(testResultMapping: TestResultMapping): TestResultMapping {
        const copy: TestResultMapping = Object.assign({}, testResultMapping);

        return copy;
    }
}
