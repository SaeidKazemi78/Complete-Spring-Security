import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Container } from './container.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Container>;

@Injectable({ providedIn: 'root' })
export class ContainerService {

    private resourceUrl =  SERVER_API_URL + '/niopdcbase/api/containers';
    private resourceProductUnitUrl = SERVER_API_URL + 'niopdcbase/api/product-units';

    constructor(private http: HttpClient) { }

    create(container: Container): Observable<EntityResponseType> {
        const copy = this.convert(container);
        return this.http.post<Container>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(container: Container): Observable<EntityResponseType> {
        const copy = this.convert(container);
        return this.http.put<Container>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Container>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Container[]>> {
        const options = createRequestOption(req);
        return this.http.get<Container[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Container[]>) => this.convertArrayResponse(res));
    }

    queryByProductUnit(productUnitId: number): Observable<HttpResponse<Container[]>> {
        return this.http.get<Container[]>(`${this.resourceProductUnitUrl}/${productUnitId}/containers`, {  observe: 'response' })
            .map((res: HttpResponse<Container[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Container = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Container[]>): HttpResponse<Container[]> {
        const jsonResponse: Container[] = res.body;
        const body: Container[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Container.
     */
    private convertItemFromServer(container: Container): Container {
        const copy: Container = Object.assign({}, container);
        return copy;
    }

    /**
     * Convert a Container to a JSON which can be sent to the server.
     */
    private convert(container: Container): Container {
        const copy: Container = Object.assign({}, container);
        return copy;
    }
}
