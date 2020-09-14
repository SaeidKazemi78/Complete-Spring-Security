import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';
import {Address} from './remote.model';

@Injectable()
export class RemoteService {
    constructor(private http: HttpClient) {
    }

    getAddressByPostcode(postcode: string): Observable<HttpResponse<Address>> {
        return this.http.get<Address>(SERVER_API_URL + 'niopdcbase/api/postcode/address/' + postcode,
            {observe: 'response'});
    }
}
