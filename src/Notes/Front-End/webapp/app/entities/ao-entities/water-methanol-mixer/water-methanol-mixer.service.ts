import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {WaterMethanolMixer} from './water-methanol-mixer.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<WaterMethanolMixer>;

@Injectable({ providedIn: 'root' })
export class WaterMethanolMixerService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/water-methanol-mixers';

    constructor(private http: HttpClient) {
    }

    create(waterMethanolMixer: WaterMethanolMixer): Observable<EntityResponseType> {
        const copy = this.convert(waterMethanolMixer);
        return this.http.post<WaterMethanolMixer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(waterMethanolMixer: WaterMethanolMixer): Observable<EntityResponseType> {
        const copy = this.convert(waterMethanolMixer);
        return this.http.put<WaterMethanolMixer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WaterMethanolMixer>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WaterMethanolMixer[]>> {
        const options = createRequestOption(req);
        return this.http.get<WaterMethanolMixer[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<WaterMethanolMixer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WaterMethanolMixer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WaterMethanolMixer[]>): HttpResponse<WaterMethanolMixer[]> {
        const jsonResponse: WaterMethanolMixer[] = res.body;
        const body: WaterMethanolMixer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WaterMethanolMixer.
     */
    private convertItemFromServer(waterMethanolMixer: WaterMethanolMixer): WaterMethanolMixer {
        const copy: WaterMethanolMixer = Object.assign({}, waterMethanolMixer);
        return copy;
    }

    /**
     * Convert a WaterMethanolMixer to a JSON which can be sent to the server.
     */
    private convert(waterMethanolMixer: WaterMethanolMixer): WaterMethanolMixer {
        const copy: WaterMethanolMixer = Object.assign({}, waterMethanolMixer);
        return copy;
    }
}
