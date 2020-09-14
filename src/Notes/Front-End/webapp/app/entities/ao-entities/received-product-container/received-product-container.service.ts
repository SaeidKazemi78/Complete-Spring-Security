import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ReceivedProductContainer} from './received-product-container.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<ReceivedProductContainer>;

@Injectable({ providedIn: 'root' })
export class ReceivedProductContainerService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/received-product-containers';
    private resourceDayDepotContainerUrl = SERVER_API_URL + 'niopdcao/api/day-depot-containers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(receivedProductContainer: ReceivedProductContainer): Observable<EntityResponseType> {
        const copy = this.convert(receivedProductContainer);
        return this.http.post<ReceivedProductContainer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(receivedProductContainer: ReceivedProductContainer): Observable<EntityResponseType> {
        const copy = this.convert(receivedProductContainer);
        return this.http.put<ReceivedProductContainer>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReceivedProductContainer>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(dayDepotContainerId: any, req?: any): Observable<HttpResponse<ReceivedProductContainer[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReceivedProductContainer[]>(this.resourceDayDepotContainerUrl + '/' + dayDepotContainerId + '/received-product-containers',
            {params: options, observe: 'response'})
            .map((res: HttpResponse<ReceivedProductContainer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReceivedProductContainer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReceivedProductContainer[]>): HttpResponse<ReceivedProductContainer[]> {
        const jsonResponse: ReceivedProductContainer[] = res.body;
        const body: ReceivedProductContainer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReceivedProductContainer.
     */
    private convertItemFromServer(receivedProductContainer: ReceivedProductContainer): ReceivedProductContainer {
        const copy: ReceivedProductContainer = Object.assign({}, receivedProductContainer);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(receivedProductContainer.registerDate);
        return copy;
    }

    /**
     * Convert a ReceivedProductContainer to a JSON which can be sent to the server.
     */
    private convert(receivedProductContainer: ReceivedProductContainer): ReceivedProductContainer {
        const copy: ReceivedProductContainer = Object.assign({}, receivedProductContainer);

        return copy;
    }
}
