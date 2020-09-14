import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {BankTransaction} from './bank-transaction.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<BankTransaction>;
export type StringResponseType = HttpResponse<string>;

@Injectable({providedIn : 'root'})
export class BankTransactionService {

    private resourceUrl = SERVER_API_URL + 'niopdcpayment/api/bank-transactions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    startBankTransaction(bankTransaction: BankTransaction): Observable<StringResponseType> {
        const copy = this.convert(bankTransaction);
        return this.http.post(`${this.resourceUrl}/start`, copy, {observe: 'response'})
            .map((res: StringResponseType) => {
                return res;
            });
    }

    restartBankTransaction(identifier): Observable<StringResponseType> {
        return this.http.post (`${this.resourceUrl}/restart/identifier/${identifier}`, {}, {observe: 'response'})
            .map((res: StringResponseType) => {
                return res;
            });
    }

    findByIdentifier(identifier: String): Observable<EntityResponseType> {
        return this.http.get(`${this.resourceUrl}/identifier/${identifier}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BankTransaction = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BankTransaction[]>): HttpResponse<BankTransaction[]> {
        const jsonResponse: BankTransaction[] = res.body;
        const body: BankTransaction[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BankTransaction.
     */
    private convertItemFromServer(bankTransaction: BankTransaction): BankTransaction {
        const copy: BankTransaction = Object.assign({}, bankTransaction);
        copy.requestDate = this.dateUtils
            .convertDateTimeFromServer(bankTransaction.requestDate);
        copy.responseDate = this.dateUtils
            .convertDateTimeFromServer(bankTransaction.responseDate);
        return copy;
    }

    /**
     * Convert a BankTransaction to a JSON which can be sent to the server.
     */
    private convert(bankTransaction: BankTransaction): BankTransaction {
        const copy: BankTransaction = Object.assign({}, bankTransaction);

        return copy;
    }
}
