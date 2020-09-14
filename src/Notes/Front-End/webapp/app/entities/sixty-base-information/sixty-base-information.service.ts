import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {SixtyBaseInformation} from './sixty-base-information.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<SixtyBaseInformation>;

@Injectable({providedIn:'root'})
export class SixtyBaseInformationService {

    private resourceUrl = 'niopdcao/api/sixty-base-informations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(sixtyBaseInformation: SixtyBaseInformation): Observable<EntityResponseType> {
        const copy = this.convert(sixtyBaseInformation);
        return this.http.post<SixtyBaseInformation>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sixtyBaseInformation: SixtyBaseInformation): Observable<EntityResponseType> {
        const copy = this.convert(sixtyBaseInformation);
        return this.http.put<SixtyBaseInformation>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SixtyBaseInformation>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByOther(id: number, type: 'dayDepot' | 'mainDayDepot' | 'mainDayOperation'): Observable<EntityResponseType> {
        return this.http.get<SixtyBaseInformation>(`${this.resourceUrl}/${id}/${type}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SixtyBaseInformation[]>> {
        const options = createRequestOption(req);
        return this.http.get<SixtyBaseInformation[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<SixtyBaseInformation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SixtyBaseInformation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SixtyBaseInformation[]>): HttpResponse<SixtyBaseInformation[]> {
        const jsonResponse: SixtyBaseInformation[] = res.body;
        const body: SixtyBaseInformation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SixtyBaseInformation.
     */
    private convertItemFromServer(sixtyBaseInformation: SixtyBaseInformation): SixtyBaseInformation {
        const copy: SixtyBaseInformation = Object.assign(new SixtyBaseInformation(), sixtyBaseInformation);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(copy.registerDate);
        return copy;
    }

    /**
     * Convert a SixtyBaseInformation to a JSON which can be sent to the server.
     */
    private convert(sixtyBaseInformation: SixtyBaseInformation): SixtyBaseInformation {
        const copy: SixtyBaseInformation = Object.assign({}, sixtyBaseInformation);

        return copy;
    }
}
