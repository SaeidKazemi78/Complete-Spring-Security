import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {TransportContract} from './transport-contract.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<TransportContract>;

@Injectable({providedIn: 'root'})
export class TransportContractService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/transport-contracts';

    private resourceCustomerUrl = SERVER_API_URL + 'niopdcbase/api/customers';
    private resourceCarrUrl = SERVER_API_URL + 'niopdcbase/api/cars';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(transportContract: TransportContract): Observable<EntityResponseType> {
        const copy = this.convert(transportContract);
        return this.http.post<TransportContract>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transportContract: TransportContract): Observable<EntityResponseType> {
        const copy = this.convert(transportContract);
        return this.http.put<TransportContract>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransportContract>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(customerId: any, req?: any): Observable<HttpResponse<TransportContract[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransportContract[]>(this.resourceCustomerUrl + '/' + customerId + '/transport-contracts', {params: options, observe: 'response'})
            .map((res: HttpResponse<TransportContract[]>) => this.convertArrayResponse(res));
    }

    queryByCarId(carId: any, req?: any): Observable<HttpResponse<TransportContract[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransportContract[]>(this.resourceCarrUrl + '/' + carId + '/transport-contracts', {params: options, observe: 'response'})
            .map((res: HttpResponse<TransportContract[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    confirm(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/${id}/confirm`, {observe: 'response'});
    }

    revertConfirm(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/${id}/revert-confirm`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransportContract = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransportContract[]>): HttpResponse<TransportContract[]> {
        const jsonResponse: TransportContract[] = res.body;
        const body: TransportContract[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransportContract.
     */
    private convertItemFromServer(transportContract: TransportContract): TransportContract {
        const copy: TransportContract = Object.assign({}, transportContract);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(transportContract.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(transportContract.finishDate);
        return copy;
    }

    /**
     * Convert a TransportContract to a JSON which can be sent to the server.
     */
    private convert(transportContract: TransportContract): TransportContract {
        const copy: TransportContract = Object.assign({}, transportContract);

        return copy;
    }
}
