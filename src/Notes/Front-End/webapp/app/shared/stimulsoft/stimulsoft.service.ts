import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

@Injectable()
export class StimulsoftService {
    constructor(private http: HttpClient) {
    }

    getFactMRTFile(): Observable<HttpResponse<any>> {
        return this.http.get<any>(SERVER_API_URL + '/content/mrt/fact.mrt', {observe: 'response'});
    }
    getJsonFile(): Observable<HttpResponse<any>> {
        return this.http.get<any>(SERVER_API_URL + '/content/mdc/SimpleList.mrt', {observe: 'response'});
    }

}
