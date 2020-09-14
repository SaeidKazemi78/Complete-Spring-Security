import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AirplaneModel } from './airplane-model.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AirplaneModel>;

@Injectable({ providedIn: 'root' })
export class AirplaneModelService {

    private resourceUrl =  SERVER_API_URL + 'niopdcbase/api/airplane-models';

    constructor(private http: HttpClient) { }

    create(airplaneModel: AirplaneModel): Observable<EntityResponseType> {
        const copy = this.convert(airplaneModel);
        return this.http.post<AirplaneModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(airplaneModel: AirplaneModel): Observable<EntityResponseType> {
        const copy = this.convert(airplaneModel);
        return this.http.put<AirplaneModel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AirplaneModel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AirplaneModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<AirplaneModel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AirplaneModel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AirplaneModel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AirplaneModel[]>): HttpResponse<AirplaneModel[]> {
        const jsonResponse: AirplaneModel[] = res.body;
        const body: AirplaneModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AirplaneModel.
     */
    private convertItemFromServer(airplaneModel: AirplaneModel): AirplaneModel {
        const copy: AirplaneModel = Object.assign({}, airplaneModel);
        return copy;
    }

    /**
     * Convert a AirplaneModel to a JSON which can be sent to the server.
     */
    private convert(airplaneModel: AirplaneModel): AirplaneModel {
        const copy: AirplaneModel = Object.assign({}, airplaneModel);
        return copy;
    }
}
