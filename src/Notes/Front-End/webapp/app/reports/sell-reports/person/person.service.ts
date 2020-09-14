import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {PersonReport, PersonRequest} from './person.model';
import {DateJalaliPipe} from '../../../shared/ng2-datetimepicker-jalali/date-jalali.pipe';

export type EntityResponseType = HttpResponse<PersonReport>;

@Injectable()
export class PersonService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/persons';

    constructor(private http: HttpClient) {
    }

    query(req?: PersonRequest): Observable<HttpResponse<PersonReport[]>> {
        return this.http.post<PersonReport[]>(this.resourceUrl, req, {observe: 'response'})
            .map((res: HttpResponse<PersonReport[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<PersonReport[]>): HttpResponse<PersonReport[]> {
        const jsonResponse: PersonReport[] = res.body;
        const body: PersonReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Customer.
     */
    private convertItemFromServer(customer: PersonReport): PersonReport {
        const copy: PersonReport = Object.assign({}, customer);
        copy.birthDay = new DateJalaliPipe().transform(copy.birthDay);
        copy.createdDate = new DateJalaliPipe().transform(copy.createdDate);
        return copy;
    }
}
