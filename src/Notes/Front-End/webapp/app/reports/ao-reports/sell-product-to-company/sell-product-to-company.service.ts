import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {SellProductToCompanyRequest} from './sell-product-to-company.model';

@Injectable()
export class SellProductToCompanyService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/ao-reports/sell-product-to-company';

    constructor(private http: HttpClient) {
    }

    query(req?: SellProductToCompanyRequest): Observable<HttpResponse<any[]>> {
        return this.http.post<any[]>(this.resourceUrl, req, {observe: 'response'})
            .map((res: HttpResponse<any[]>) => res);
    }

}
