import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import {GatewayRoute, Health} from './gateway-route.model';

@Injectable()
export class GatewayRoutesService {
    constructor(private http: HttpClient) { }

    findAll(): Observable<GatewayRoute[]> {
        return this.http.get<GatewayRoute[]>(SERVER_API_URL + 'api/gateway/routes/');
    }

    findAllBaseHealth(): Observable<Health[]> {
        return this.http.get<Health[]>(SERVER_API_URL + 'niopdcbase/api/health-check');
    }
}
