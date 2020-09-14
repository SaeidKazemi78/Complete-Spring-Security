import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';
import {MomentSheetRequest} from './moment-sheet.model';

export type EntityResponseType = HttpResponse<any>;

@Injectable()
export class MomentSheetService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/moment-sheets';

    constructor(private http: HttpClient) {
    }

    queryAo(req?: MomentSheetRequest): Observable<HttpResponse<any[]>> {
        return this.http.post<any[]>(`${this.resourceUrl}/ao`, req, {observe: 'response'})
            .map((res: HttpResponse<any[]>) => this.convertArrayResponseAo(res));
    }

    queryDepot(req?: MomentSheetRequest): Observable<HttpResponse<any[]>> {
        return this.http.post<any[]>(`${this.resourceUrl}/depot`, req, {observe: 'response'})
            .map((res: HttpResponse<any[]>) => this.convertArrayResponseDepot(res));
    }

    queryDepotMomentSheet(req?: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrl}/depot/moment-sheet`, req, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    queryGroundMomentSheet(req?: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrl}/ground-moment-sheets`, req, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    private convertArrayResponseAo(res: HttpResponse<any[]>): HttpResponse<any[]> {
        const jsonResponse: any[] = res.body;
        const body: any[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServerAo(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertArrayResponseDepot(res: HttpResponse<any[]>): HttpResponse<any[]> {
        const jsonResponse: any[] = res.body;
        const body: any[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServerDepot(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to momentSheet.
     */
    private convertItemFromServerAo(momentSheet: any): any {
        const copy: any = Object.assign({}, momentSheet);
        return copy;
    }

    private convertItemFromServerDepot(momentSheet: any): any {
        const copy: any = Object.assign({}, momentSheet);
        return copy;
    }
}
