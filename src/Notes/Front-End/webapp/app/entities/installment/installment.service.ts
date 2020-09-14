import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {Installment, LoanDetail} from './installment.model';
import {createRequestOption} from '../../shared';
import {BankTransaction} from 'app/entities/bank-transaction/bank-transaction.model';
import {StringResponseType} from 'app/entities/bank-transaction/bank-transaction.service';

export type EntityResponseType = HttpResponse<Installment>;

@Injectable({ providedIn: 'root' })
export class InstallmentService {

    private resourceLoanUrl = 'niopdcaccounting/api/loans';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    loanDetail(loanId: any): Observable<HttpResponse<LoanDetail>> {
        return this.http.get<LoanDetail>(this.resourceLoanUrl + '/' + loanId + '/loan-detail', {observe: 'response'});
    }


    startBankTransaction(loanId: number,personId: number,customerId: number): Observable<StringResponseType> {
        return this.http.get(`${this.resourceLoanUrl}/transaction/start/${loanId}/${personId}/${customerId}`, {observe: 'response'})
            .map((res: StringResponseType) => {
                return res;
            });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Installment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertLoanDetailArrayResponse(res: HttpResponse<LoanDetail[]>): HttpResponse<LoanDetail[]> {
        const jsonResponse: LoanDetail[] = res.body;
        const body: LoanDetail[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertLoanDetailFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Installment[]>): HttpResponse<Installment[]> {
        const jsonResponse: Installment[] = res.body;
        const body: Installment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Installment.
     */
    private convertLoanDetailFromServer(installment: LoanDetail): LoanDetail {
        const copy: LoanDetail = Object.assign(new LoanDetail(), installment);
        const body: Installment[] = [];
        for (let i = 0; i < copy.installments.length; i++) {
            body.push(this.convertItemFromServer(copy.installments[i]));
        }
        copy.installments = body;
        return copy;
    }

    /**
     * Convert a returned JSON object to Installment.
     */
    private convertItemFromServer(installment: Installment): Installment {
        const copy: Installment = Object.assign(new Installment(), installment);
        copy.data = this.dateUtils
            .convertDateTimeFromServer(copy.data);
        return copy;
    }

    /**
     * Convert a Installment to a JSON which can be sent to the server.
     */
    private convert(installment: Installment): Installment {
        const copy: Installment = Object.assign({}, installment);

        return copy;
    }
}
