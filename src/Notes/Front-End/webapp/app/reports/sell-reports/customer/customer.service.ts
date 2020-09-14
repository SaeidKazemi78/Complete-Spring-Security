import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import {TranslateService} from '@ngx-translate/core';

import {CustomerReport, CustomerRequest} from './customer.model';
import {DateTimeJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/datetime-jalali.pipe';

export type EntityResponseType = HttpResponse<CustomerReport>;

@Injectable()
export class CustomerService {

    private resourceUrl =  SERVER_API_URL + 'niopdcreport/api/customers';

    constructor(private http: HttpClient,
                private translateService: TranslateService
    ) { }

    query(req?: CustomerRequest): Observable<HttpResponse<CustomerReport[]>> {
        return this.http.post<CustomerReport[]>(this.resourceUrl, req, { observe: 'response' })
            .map((res: HttpResponse<CustomerReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<CustomerReport[]>): HttpResponse<CustomerReport[]> {
        const jsonResponse: CustomerReport[] = res.body;
        const body: CustomerReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Customer.
     */
    private convertItemFromServer(customer: CustomerReport): CustomerReport {
        const copy: CustomerReport = Object.assign({}, customer);
        this.translateService.get('niopdcgatewayApp.CustomerGroup.' + copy.customerGroupTitle).subscribe(title => {
            copy.customerGroupTitle = title;
        });
        copy.registerDate = new DateTimeJalaliPipe().transform(copy.registerDate);
        return copy;
    }
}
