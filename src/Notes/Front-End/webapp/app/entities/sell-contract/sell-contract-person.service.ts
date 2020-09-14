import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';
import {SellContractPerson} from './sell-contract.model';

export type EntityResponseType = HttpResponse<SellContractPerson>;

@Injectable({providedIn: 'root'})
export class SellContractPersonService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/sell-contract-people';
    private resourceSellContractUrl = SERVER_API_URL + 'niopdcbase/api/sell-contracts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    queryByTime(startDate: any, finishDate): Observable<HttpResponse<SellContractPerson[]>> {
        const options = new HttpParams().set('startDate', startDate.toISOString())
            .set('finishDate', finishDate.toISOString());

        return this.http.get<SellContractPerson[]>(this.resourceUrl + '/get-by-date', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<SellContractPerson[]>) => this.convertArrayResponse(res));
    }

    queryByContractType(sellContractType): Observable<HttpResponse<SellContractPerson[]>> {

        return this.http.get<SellContractPerson[]>(this.resourceUrl + '/contract-type/' + sellContractType, {observe: 'response'})
            .map((res: HttpResponse<SellContractPerson[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SellContractPerson = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SellContractPerson[]>): HttpResponse<SellContractPerson[]> {
        const jsonResponse: SellContractPerson[] = res.body;
        const body: SellContractPerson[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellContractPerson.
     */
    private convertItemFromServer(sellContractPerson: SellContractPerson): SellContractPerson {
        const copy: SellContractPerson = Object.assign({}, sellContractPerson);

        return copy;
    }

    /**
     * Convert a SellContractPerson to a JSON which can be sent to the server.
     */
    private convert(sellContractPerson: SellContractPerson): SellContractPerson {
        const copy: SellContractPerson = Object.assign({}, sellContractPerson);
        return copy;
    }
}
