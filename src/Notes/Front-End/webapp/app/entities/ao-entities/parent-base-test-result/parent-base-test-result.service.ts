import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ParentBaseTestResult} from './parent-base-test-result.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<ParentBaseTestResult>;

@Injectable({ providedIn: 'root' })
export class ParentBaseTestResultService {

    private resourceUrl = 'niopdcao/api/parent-base-test-results';

    constructor(private http: HttpClient) {
    }
    create(parentBaseTestResult: ParentBaseTestResult): Observable<EntityResponseType> {
        const copy = this.convert(parentBaseTestResult);
        return this.http.post<ParentBaseTestResult>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(parentBaseTestResult: ParentBaseTestResult): Observable<EntityResponseType> {
        const copy = this.convert(parentBaseTestResult);
        return this.http.put<ParentBaseTestResult>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ParentBaseTestResult>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ParentBaseTestResult[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParentBaseTestResult[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<ParentBaseTestResult[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ParentBaseTestResult = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ParentBaseTestResult[]>): HttpResponse<ParentBaseTestResult[]> {
        const jsonResponse: ParentBaseTestResult[] = res.body;
        const body: ParentBaseTestResult[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ParentBaseTestResult.
     */
    private convertItemFromServer(parentBaseTestResult: ParentBaseTestResult): ParentBaseTestResult {
        const copy: ParentBaseTestResult = Object.assign(new ParentBaseTestResult(), parentBaseTestResult);
        return copy;
    }

    /**
     * Convert a ParentBaseTestResult to a JSON which can be sent to the server.
     */
    private convert(parentBaseTestResult: ParentBaseTestResult): ParentBaseTestResult {
        const copy: ParentBaseTestResult = Object.assign({}, parentBaseTestResult);

        return copy;
    }
}
