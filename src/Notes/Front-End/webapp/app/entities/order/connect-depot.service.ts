import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {Order, ConnectDepot} from './order.model';
import {createRequestOption} from '../../shared';
import {EntityResponseType} from '../location/location.service';
import {catchError} from 'rxjs/operators';
import {Location} from '../location/location.model';

@Injectable({ providedIn: 'root' })
export class ConnectDepotService {

    private resourceUrl = SERVER_API_URL + 'niopdcorder/api/connect-depot';
    private resourceTtmsUrl = SERVER_API_URL + 'niopdcreport/api/ttms';

    constructor(private http: HttpClient,
                private dateUtils: JhiDateUtils) {
    }

    download(depotFile: ConnectDepot): Observable<HttpResponse<any>> {
        const copy = this.convert(depotFile);
        return this.http.put(this.resourceUrl + '/download', copy,
            {responseType: 'blob', observe: 'response'}).pipe(catchError(this.parseErrorBlob));
    }

    search(depotFile: ConnectDepot): Observable<HttpResponse<ConnectDepot[]>> {
        const copy = this.convert(depotFile);
        return this.http.post<ConnectDepot[]>(this.resourceUrl + '/search', copy , {observe: 'response'})
            .map((res: HttpResponse<ConnectDepot[]>) => this.convertArrayResponse(res));
    }

    downloadTtms(req = {finishDate: new Date()}): Observable<HttpResponse<any>> {
        const copy = this.convertTtms(req);
        return this.http.put(this.resourceTtmsUrl, copy,
            {responseType: 'blob', observe: 'response'}).pipe(catchError(this.parseErrorBlob));
    }

    upload(id: number,status: string): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/upload/${id}/` + status, {observe: 'response'});
    }

    parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        const reader: FileReader = new FileReader();

        const obs = Observable.create((observer: any) => {
            reader.onloadend =e => {
                observer.error(JSON.parse(reader.result as string));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }

    query(depotId?: any): Observable<HttpResponse<ConnectDepot[]>> {
        return this.http.get<ConnectDepot[]>(this.resourceUrl + '/depot/' + depotId + '/depot-files', {observe: 'response'})
            .map((res: HttpResponse<ConnectDepot[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: HttpResponse<ConnectDepot>): HttpResponse<ConnectDepot> {
        const body: ConnectDepot = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseString(res: HttpResponse<string>): HttpResponse<string> {
        const body: string = this.convertItemStringFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ConnectDepot[]>): HttpResponse<Order[]> {
        const jsonResponse: ConnectDepot[] = res.body;
        const body: ConnectDepot[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Order.
     */
    private convertStringFromServer(result: string): string {
        const copy: string = Object.assign({}, result);
        return result;
    }

    private convertItemFromServer(depotFile: ConnectDepot): ConnectDepot {
        const copy: ConnectDepot = Object.assign({}, depotFile);
        // copy.depotSendDate = this.dateUtils
        //     .convertDateTimeFromServer(depotFile.depotSendDate);
        return copy;
    }

    private convertItemStringFromServer(depotFile: string): string {
        const copy: string = Object.assign({}, depotFile);
        return copy;
    }

    /**
     * Convert a Order to a JSON which can be sent to the server.
     */
    private convert(depotFile: ConnectDepot): ConnectDepot {
        const copy: ConnectDepot = Object.assign({}, depotFile);

        return copy;
    }

    private convertTtms(data): any {
        const copy: any = Object.assign({}, data);

        return copy;
    }
}
