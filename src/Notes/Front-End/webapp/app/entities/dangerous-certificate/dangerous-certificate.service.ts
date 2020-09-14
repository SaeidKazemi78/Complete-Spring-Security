import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DangerousCertificate } from './dangerous-certificate.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DangerousCertificate>;

@Injectable({ providedIn: 'root' })
export class DangerousCertificateService {

    private resourceUrl = 'niopdcbase/api/dangerous-certificates';

    private resourceDriverUrl = 'niopdcbase/api/drivers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(dangerousCertificate: DangerousCertificate): Observable<EntityResponseType> {
            const copy = this.convert(dangerousCertificate);
        return this.http.post<DangerousCertificate>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dangerousCertificate: DangerousCertificate): Observable<EntityResponseType> {
        const copy = this.convert(dangerousCertificate);
        return this.http.put<DangerousCertificate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DangerousCertificate>(`${this.resourceUrl}/${id}`, { observe: 'response'})
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query( driverId: any, req?: any): Observable<HttpResponse<DangerousCertificate[]>> {
        const options = createRequestOption(req);
        return this.http.get<DangerousCertificate[]>(this.resourceDriverUrl + '/' + driverId + '/dangerous-certificates' ,  { params: options, observe: 'response' })
            .map((res: HttpResponse<DangerousCertificate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DangerousCertificate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DangerousCertificate[]>): HttpResponse<DangerousCertificate[]> {
        const jsonResponse: DangerousCertificate[] = res.body;
        const body: DangerousCertificate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DangerousCertificate.
     */
    private convertItemFromServer(dangerousCertificate: DangerousCertificate): DangerousCertificate {
        const copy: DangerousCertificate = Object.assign(new DangerousCertificate(), dangerousCertificate);
                copy.cardExpireDate = this.dateUtils
            .convertDateTimeFromServer(copy.cardExpireDate);
        return copy;
    }

    /**
     * Convert a DangerousCertificate to a JSON which can be sent to the server.
     */
    private convert(dangerousCertificate: DangerousCertificate): DangerousCertificate {
        const copy: DangerousCertificate = Object.assign({}, dangerousCertificate);

        return copy;
    }
}
