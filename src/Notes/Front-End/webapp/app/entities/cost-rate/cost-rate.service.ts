import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CostRate} from './cost-rate.model';
import {createRequestOption} from '../../shared';
import {DateJalaliPipe} from '../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';

export type EntityResponseType = HttpResponse<CostRate>;

@Injectable({ providedIn: 'root' })
export class CostRateService {

    private resourceUrl = SERVER_API_URL + 'niopdcrate/api/cost-rates';

    private resourceCostUrl = SERVER_API_URL + 'niopdcrate/api/costs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(costRate: CostRate): Observable<EntityResponseType> {
        const copy = this.convert(costRate);
        return this.http.post<CostRate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(costRate: CostRate): Observable<EntityResponseType> {
        const copy = this.convert(costRate);
        return this.http.put<CostRate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostRate>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(costId: any, req?: any): Observable<HttpResponse<CostRate[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostRate[]>(this.resourceCostUrl + '/' + costId + '/cost-rates', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<CostRate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostRate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostRate[]>): HttpResponse<CostRate[]> {
        const jsonResponse: CostRate[] = res.body;
        const body: CostRate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostRate.
     */
    private convertItemFromServer(costRate: CostRate): CostRate {
        const copy: CostRate = Object.assign({}, costRate);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(costRate.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(costRate.finishDate);

        copy.startDate1 = new DateJalaliPipe().transform(copy.startDate);
        copy.finishDate1 = new DateJalaliPipe().transform(copy.finishDate);

        return copy;
    }

    /**
     * Convert a CostRate to a JSON which can be sent to the server.
     */
    private convert(costRate: CostRate): CostRate {
        const copy: CostRate = Object.assign({}, costRate);
        return copy;
    }
}
