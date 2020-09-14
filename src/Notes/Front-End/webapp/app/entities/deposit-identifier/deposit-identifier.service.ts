import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DepositIdentifier } from './deposit-identifier.model';

export type EntityResponseType = HttpResponse<DepositIdentifier>;

@Injectable({ providedIn: 'root' })
export class DepositIdentifierService {

    private resourceUrl = 'niopdcpayment/api/deposit-identifiers';

    constructor(private http: HttpClient) { }

    create(depositIdentifier: DepositIdentifier): Observable<EntityResponseType> {
        const copy = this.convert(depositIdentifier);
        return this.http.post<DepositIdentifier>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DepositIdentifier[]>> {
        let address = '';
        if (req.locationId) {
            address = `/location/${req.locationId}`;
        }
        if (req.personId) {
            address = `/person/${req.personId}`;
        }
        if (req.customerId) {
            address = `/customer/${req.customerId}`;
        }

        return this.http.get<DepositIdentifier[]>(this.resourceUrl + address , { observe: 'response' })
            .map((res: HttpResponse<DepositIdentifier[]>) => this.convertArrayResponse(res));
    }

    findAllForLocation(locationId: number): Observable<HttpResponse<DepositIdentifier[]>> {
        return this.http.get<DepositIdentifier[]>(this.resourceUrl + `/for-location/${locationId}` , { observe: 'response' })
            .map((res: HttpResponse<DepositIdentifier[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DepositIdentifier = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DepositIdentifier[]>): HttpResponse<DepositIdentifier[]> {
        const jsonResponse: DepositIdentifier[] = res.body;
        const body: DepositIdentifier[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DepositIdentifier.
     */
    private convertItemFromServer(depositIdentifier: DepositIdentifier): DepositIdentifier {
        const copy: DepositIdentifier = Object.assign(new DepositIdentifier(), depositIdentifier);
        return copy;
    }

    /**
     * Convert a DepositIdentifier to a JSON which can be sent to the server.
     */
    private convert(depositIdentifier: DepositIdentifier): DepositIdentifier {
        const copy: DepositIdentifier = Object.assign({}, depositIdentifier);

        return copy;
    }
}
