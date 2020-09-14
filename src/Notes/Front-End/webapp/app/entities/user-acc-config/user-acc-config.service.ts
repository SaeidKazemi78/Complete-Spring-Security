import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';
import {UserAccConfig} from 'app/entities/user-acc-config/user-acc-config.model';

export type EntityResponseType = HttpResponse<UserAccConfig>;

@Injectable({ providedIn: 'root' })
export class UserAccConfigService {

    private resourceUrl = SERVER_API_URL + 'niopdcaccounting/api/user-acc-configs';

    constructor(private http: HttpClient) {
    }

    update(userAccConfig: UserAccConfig): Observable<EntityResponseType> {
        const copy = this.convert(userAccConfig);
        return this.http.put<UserAccConfig>(this.resourceUrl, copy, {observe: 'response'});
    }

    find(): Observable<EntityResponseType> {
        return this.http.get<UserAccConfig>(`${this.resourceUrl}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }


    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserAccConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoucherType.
     */
    private convertItemFromServer(userAccConfig: UserAccConfig): UserAccConfig {
        const copy: UserAccConfig = Object.assign({}, userAccConfig);
        return copy;
    }

    private convert(userAccConfig: UserAccConfig): UserAccConfig {
        const copy: UserAccConfig = Object.assign({}, userAccConfig);
        return copy;
    }

}
