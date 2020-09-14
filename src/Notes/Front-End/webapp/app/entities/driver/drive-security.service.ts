import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JhiDateUtils} from 'ng-jhipster';

import {createRequestOption} from '../../shared';
import {DriveSecurity} from 'app/entities/driver/driver.model';

export type EntityResponseType = HttpResponse<DriveSecurity>;

@Injectable({ providedIn: 'root' })
export class DriveSecurityService {

    private resourceUrl = 'niopdcbase/api/drive-securities';

    private resourceDriverUrl = 'niopdcbase/api/drivers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(driveSecurity: DriveSecurity): Observable<EntityResponseType> {
        const copy = this.convert(driveSecurity);
        return this.http.post<DriveSecurity>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(driveSecurity: DriveSecurity): Observable<EntityResponseType> {
        const copy = this.convert(driveSecurity);
        return this.http.put<DriveSecurity>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DriveSecurity>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByDriverId(id: number): Observable<EntityResponseType> {
        return this.http.get<DriveSecurity>(`${this.resourceDriverUrl}/${id}/drive-securities`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(driverId: any, req?: any): Observable<HttpResponse<DriveSecurity[]>> {
        const options = createRequestOption(req);
        return this.http.get<DriveSecurity[]>(this.resourceDriverUrl + '/' + driverId + '/drive-securities', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<DriveSecurity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DriveSecurity = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DriveSecurity[]>): HttpResponse<DriveSecurity[]> {
        const jsonResponse: DriveSecurity[] = res.body;
        const body: DriveSecurity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DriveSecurity.
     */
    private convertItemFromServer(driveSecurity: DriveSecurity): DriveSecurity {
        const copy: DriveSecurity = Object.assign(new DriveSecurity(), driveSecurity);
        copy.birthDate = this.dateUtils
            .convertDateTimeFromServer(copy.birthDate);
        return copy;
    }

    /**
     * Convert a DriveSecurity to a JSON which can be sent to the server.
     */
    private convert(driveSecurity: DriveSecurity): DriveSecurity {
        const copy: DriveSecurity = Object.assign({}, driveSecurity);

        return copy;
    }
}
