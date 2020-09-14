import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { createRequestOption } from '../../shared';
import {SellContractCustomer} from './sell-contract.model';

export type EntityResponseType = HttpResponse<SellContractCustomer>;

@Injectable({ providedIn: 'root' })
export class SellContractCustomerService {

    private resourceUrl =  SERVER_API_URL + '/niopdcbase/api/sell-contract-customers';
    private resourceSellContractUrl =  SERVER_API_URL + '/niopdcbase/api/sell-contracts';
    constructor(private http: HttpClient) { }

    queryBySellContract(sellContractId: number): Observable<HttpResponse<SellContractCustomer[]>> {
        return this.http.get<SellContractCustomer[]>(`${this.resourceSellContractUrl}/${sellContractId}/sell-contract-customers`, {observe: 'response'})
            .map((res: HttpResponse<SellContractCustomer[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SellContractCustomer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SellContractCustomer[]>): HttpResponse<SellContractCustomer[]> {
        const jsonResponse: SellContractCustomer[] = res.body;
        const body: SellContractCustomer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SellContractCustomer.
     */
    private convertItemFromServer(sellContractCustomer: SellContractCustomer): SellContractCustomer {
        const copy: SellContractCustomer = Object.assign({}, sellContractCustomer);
        return copy;
    }

    /**
     * Convert a SellContractCustomer to a JSON which can be sent to the server.
     */
    private convert(sellContractCustomer: SellContractCustomer): SellContractCustomer {
        const copy: SellContractCustomer = Object.assign({}, sellContractCustomer);
        return copy;
    }
}
