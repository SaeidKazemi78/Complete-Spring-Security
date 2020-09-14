import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CustomPerson, Person} from './person.model';
import {createRequestOption} from '../../shared';
import {HttpCacheService} from '../../shared/http-cache/http-cache.service';

export type EntityResponseType = HttpResponse<Person>;

@Injectable({providedIn: 'root'})
export class PersonService {

    private resourceUrl = SERVER_API_URL + 'niopdcbase/api/people';
    private resourceLocationUrl = SERVER_API_URL + 'niopdcbase/api/locations';

    constructor(private http: HttpClient, private httpCache: HttpCacheService, private dateUtils: JhiDateUtils) {
    }

    create(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.post<Person>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    register(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.post(this.resourceUrl + '/register', copy, {observe: 'response'});
    }

    createUser(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.post<Person>(this.resourceUrl + '/create-user', copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.put<Person>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateCreditAccount(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.put<Person>(`${this.resourceUrl}/credit-account`, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateUserPerson(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.put<Person>(`${this.resourceUrl}/update`, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number, companyId?: number): Observable<EntityResponseType> {
        const params = companyId ? {'companyId': companyId.toString()} : {};
        return this.http.get<Person>(`${this.resourceUrl}/${id}`, {params, observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findCache(id: number, companyId?: number): Observable<EntityResponseType> {
        const params = companyId ? {'companyId': companyId.toString()} : {};
        return this.httpCache.get<Person>(`${this.resourceUrl}/${id}`, {params, observe: 'response'}, 'D')
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findForFactor(id: number): Observable<HttpResponse<CustomPerson>> {
        return this.http.get<CustomPerson>(`${this.resourceUrl}/factor/${id}`, {observe: 'response'})
            .map((res: HttpResponse<CustomPerson>) => this.convertResponseForCustomPerson(res));
    }

    findByCode(nationalCode: string): Observable<HttpResponse<Person>> {
        return this.http.get<Person>(`${this.resourceUrl}/national-code/${nationalCode}`, {observe: 'response'})
            .map((res: HttpResponse<Person>) => this.convertResponse(res));
    }

    findAgentByPersonId(id: number): Observable<HttpResponse<Person>> {
        return this.http.get<Person>(`${this.resourceUrl}/${id}/agent`, {observe: 'response'})
            .map((res: HttpResponse<Person>) => this.convertResponse(res));

    }

    findCeoByPersonId(id: number): Observable<HttpResponse<Person>> {
        return this.http.get<Person>(`${this.resourceUrl}/${id}/ceo`, {observe: 'response'})
            .map((res: HttpResponse<Person>) => this.convertResponse(res));

    }

    finderByCode(nationalCode: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/finder-national-code/${nationalCode}`, {observe: 'response'})
            .map((res: HttpResponse<any>) => res);
    }

    findByBaseInfo(person): Observable<HttpResponse<Person>> {
        return this.http.post<Person>(`${this.resourceUrl}/base-info/`, person, {observe: 'response'})
            .map((res: HttpResponse<Person>) => this.convertResponse(res));
    }

    existByCode(nationalCode: string): Observable<HttpResponse<boolean>> {
        return this.http.get<boolean>(`${this.resourceUrl}/exist-national-code/${nationalCode}`, {observe: 'response'})
            .map((res: HttpResponse<boolean>) => res);
    }

    query(companyId?: number, req?: any, isTransport?: boolean): Observable<HttpResponse<Person[]>> {
        const options = createRequestOption(req);
        return this.http.get<Person[]>(this.resourceUrl + ((companyId) ? '/' + companyId + '/stakeholders' : (isTransport ? '/transport' : '')), {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Person[]>) => this.convertArrayResponse(res));
    }

    queryByPersonGroup(personGroup, req?: any): Observable<HttpResponse<Person[]>> {
        const options = createRequestOption(req);
        return this.http.get<Person[]>(`${this.resourceUrl}/person-group/${personGroup}`, {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Person[]>) => this.convertArrayResponse(res));
    }

    querySelector(req?: any): Observable<HttpResponse<Person[]>> {
        const options = createRequestOption(req);
        return this.http.get<Person[]>(this.resourceUrl + '/selector', {
            params: options,
            observe: 'response'
        })
            .map((res: HttpResponse<Person[]>) => this.convertArrayResponse(res));
    }

    uploadFile(file: any): Observable<HttpResponse<string>> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(`${this.resourceUrl}/upload-file`, formData, {observe: 'response'})
            .map((res: HttpResponse<string>) => {
                return res;
            });
    }

    findByLocation(locationId: number, customerId: number): Observable<HttpResponse<Person[]>> {
        return this.http.get<Person[]>(`${this.resourceLocationUrl}/${locationId}/${customerId}/people`, {observe: 'response'})
            .map((res: HttpResponse<Person[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    active(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/active/${id}`, {observe: 'response'});
    }

    deActive(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/de-active/${id}`, {observe: 'response'});
    }

    reject(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/reject/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Person = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertResponseForCustomPerson(res: HttpResponse<CustomPerson>): HttpResponse<CustomPerson> {
        const body: CustomPerson = this.convertItemFromServerCustomPerson(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Person[]>): HttpResponse<Person[]> {
        const jsonResponse: Person[] = res.body;
        const body: Person[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Person.
     */
    private convertItemFromServer(person: Person): Person {
        const copy: Person = Object.assign({}, person);
        copy.birthday = this.dateUtils
            .convertDateTimeFromServer(person.birthday);

        return copy;
    }

    private convertItemFromServerCustomPerson(person: CustomPerson): CustomPerson {
        const copy: CustomPerson = Object.assign({}, person);
        console.log(copy);
        return copy;
    }

    /**
     * Convert a Person to a JSON which can be sent to the server.
     */
    private convert(person: Person): Person {
        const copy: Person = Object.assign({}, person);

        return copy;
    }

}
