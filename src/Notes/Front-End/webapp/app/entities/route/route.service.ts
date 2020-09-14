import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {Route} from './route.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Route>;

@Injectable({ providedIn: 'root' })
export class RouteService {

    private resourceUrl = 'niopdcbase/api/routes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(route: Route): Observable<EntityResponseType> {
        const copy = this.convert(route);
        return this.http.post<Route>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(route: Route): Observable<EntityResponseType> {
        const copy = this.convert(route);
        return this.http.put<Route>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Route>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findBySourceAndTargetDepotCode(sourceCode: string, targetCode: string): Observable<EntityResponseType> {
        return this.http.get<Route>(`${this.resourceUrl}/source-depot/${sourceCode}/target-depot/${targetCode}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Route[]>> {
        const options = createRequestOption(req);
        return this.http.get<Route[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Route[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    uploadFile(file: any): Observable<HttpResponse<string>> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(`${this.resourceUrl}/upload-file`, formData, {observe: 'response'})
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Route = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Route[]>): HttpResponse<Route[]> {
        const jsonResponse: Route[] = res.body;
        const body: Route[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Route.
     */
    private convertItemFromServer(route: Route): Route {
        const copy: Route = Object.assign(new Route(), route);
        copy.executeDate = this.dateUtils
            .convertDateTimeFromServer(copy.executeDate);
        return copy;
    }

    /**
     * Convert a Route to a JSON which can be sent to the server.
     */
    private convert(route: Route): Route {
        const copy: Route = Object.assign({}, route);

        return copy;
    }
}
