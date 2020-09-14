import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {MainDayDepot} from './main-day-depot.model';
import {createRequestOption} from '../../../shared';

export type EntityResponseType = HttpResponse<MainDayDepot>;

@Injectable({ providedIn: 'root' })
export class MainDayDepotService {

    private resourceUrl = SERVER_API_URL + 'niopdcao/api/main-day-depots';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(mainDayDepot: MainDayDepot): Observable<EntityResponseType> {
        const copy = this.convert(mainDayDepot);
        return this.http.post<MainDayDepot>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mainDayDepot: MainDayDepot): Observable<EntityResponseType> {
        const copy = this.convert(mainDayDepot);
        return this.http.put<MainDayDepot>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MainDayDepot>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MainDayDepot[]>> {
        const options = createRequestOption(req);
        return this.http.get<MainDayDepot[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<MainDayDepot[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    /*  returnMainDayDepotIdByDayDepotContainer(dayDepotContainerId: number): Observable<EntityResponseType> {
          return this.http.get<number>(this.resourceUrl + '/day-depot-container/' + dayDepotContainerId)
              .map((res: number) => res);
      }

      returnMainDayDepotIdByDayDepot(dayDepotId: number): Observable<number> {
          return this.http.get(this.resourceUrl + '/day-depot/' + dayDepotId)
              .map((res: Response) => res.json());
      }
  */
    editable(id: number): Observable<Boolean> {
        return this.http.get<Boolean>(`${this.resourceUrl}/${id}/editable`);
    }

    close(id: number): Observable<Response> {
        return this.http.get<Response>(`${this.resourceUrl}/${id}/close`);
    }

    contaminate(id: number): Observable<Response> {
        return this.http.get<Response>(`${this.resourceUrl}/${id}/contaminate`);
    }

    checkForUpdate(id: number): Observable<Response> {
        return this.http.get<Response>(`${this.resourceUrl}/${id}/update`);
    }

    open(id: number): Observable<Response> {
        return this.http.get<Response>(`${this.resourceUrl}/${id}/open`);
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MainDayDepot = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MainDayDepot[]>): HttpResponse<MainDayDepot[]> {
        const jsonResponse: MainDayDepot[] = res.body;
        const body: MainDayDepot[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MainDayDepot.
     */
    private convertItemFromServer(mainDayDepot: MainDayDepot): MainDayDepot {
        const copy: MainDayDepot = Object.assign({}, mainDayDepot);
        copy.day = this.dateUtils
            .convertDateTimeFromServer(mainDayDepot.day);
        return copy;
    }

    /**
     * Convert a MainDayDepot to a JSON which can be sent to the server.
     */
    private convert(mainDayDepot: MainDayDepot): MainDayDepot {
        const copy: MainDayDepot = Object.assign({}, mainDayDepot);

        return copy;
    }
}
