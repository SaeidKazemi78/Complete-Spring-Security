import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {SixtyConverter} from './sixty-degree-converter.model';

export type EntityResponseType = HttpResponse<SixtyConverter>;

@Injectable()
export class SixtyDegreeConverterService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/sixty-degree-converters';

    constructor(private http: HttpClient) {
    }

    getQuantity60Tank(sixtyDegree: SixtyConverter): Observable<EntityResponseType> {
        const copy = this.convert(sixtyDegree);
        return this.http.post<SixtyConverter>(`${this.resourceUrl}/get-quantity-sixteen-tank`, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getQuantity60TankByLiteratureVolumeOilTanks(sixtyDegree: SixtyConverter, id: number): Observable<EntityResponseType> {
        const copy = this.convert(sixtyDegree);
        return this.http.post<SixtyConverter>(`${this.resourceUrl}/get-quantity-sixteen-tank/literature-volume-oil-tank/${id}`, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SixtyConverter = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SixtyConverter[]>): HttpResponse<SixtyConverter[]> {
        const jsonResponse: SixtyConverter[] = res.body;
        const body: SixtyConverter[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Transfer.
     */
    private convertItemFromServer(transfer: SixtyConverter): SixtyConverter {
        const copy: SixtyConverter = Object.assign({}, transfer);

        return copy;
    }

    /**
     * Convert a Transfer to a JSON which can be sent to the server.
     */
    private convert(transfer: SixtyConverter): SixtyConverter {
        const copy: SixtyConverter = Object.assign({}, transfer);

        return copy;
    }
}
