import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from 'app/app.constants';

import {DepotInventory, DepotInventoryRequest} from './depot-inventory.model';

export type EntityResponseType = HttpResponse<DepotInventory>;

@Injectable()
export class DepotInventoryService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/ao/depot/depot-inventory';

    constructor(private http: HttpClient) {
    }

    query(req?: DepotInventoryRequest): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.resourceUrl, req, {observe: 'response'});

    }

    private convertArrayResponse(res: HttpResponse<DepotInventory[]>): HttpResponse<DepotInventory[]> {
        const jsonResponse: DepotInventory[] = res.body;
        const body: DepotInventory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Metre.
     */
    private convertItemFromServer(metre: DepotInventory): DepotInventory {
        const copy: DepotInventory = Object.assign({}, metre);
        return copy;
    }
}
