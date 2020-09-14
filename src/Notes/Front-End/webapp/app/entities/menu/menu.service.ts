import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {createRequestOption} from '../../shared';
import {catchError} from 'rxjs/operators';
import {Menu} from "app/entities/menu/menu.model";

export type EntityResponseType = HttpResponse<Menu>;
export type UploadResponseType = HttpResponse<number>;

@Injectable({providedIn: 'root'})
export class MenuService {

    private resourceUrl = SERVER_API_URL + '/api/menu';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(menu: Menu): Observable<EntityResponseType> {
        const copy = this.convert(menu);
        return this.http.post<Menu>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(menu: Menu): Observable<EntityResponseType> {
        const copy = this.convert(menu);
        return this.http.put<Menu>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Menu>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Menu[]>> {
        const options = createRequestOption(req);
        return this.http.get<Menu[]>(`${this.resourceUrl}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Menu[]>) => this.convertArrayResponse(res));
    }

    queryForMenu(req?: any): Observable<HttpResponse<Menu[]>> {
        const options = createRequestOption(req);
        return this.http.get<Menu[]>(`${this.resourceUrl}/for-menu`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Menu[]>) => this.convertArrayResponse(res));
    }

    queryByParent(parentId?: number, req?: any): Observable<HttpResponse<Menu[]>> {
        const options = createRequestOption(req);
        return this.http.get<Menu[]>(`${this.resourceUrl}/parent/${parentId}`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Menu[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    postFile(fileToUpload: File): Observable<UploadResponseType> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post<number>('/api/media/upload', formData, {observe: 'response'});

    }


    downloadFile(fileId: number): Observable<HttpResponse<any>> {
        return this.http.get(`/api/media/download/${fileId}`, {responseType: 'blob', observe: 'response'})
            .pipe(catchError(this.parseErrorBlob));

    }


    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Menu = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Menu[]>): HttpResponse<Menu[]> {
        const jsonResponse: Menu[] = res.body;
        const body: Menu[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Menu.
     */
    private convertItemFromServer(menu: Menu): Menu {
        const copy: Menu = Object.assign({}, menu);

        return copy;
    }

    /**
     * Convert a Menu to a JSON which can be sent to the server.
     */
    private convert(menu: Menu): Menu {
        const copy: Menu = Object.assign({}, menu);
        return copy;
    }

    parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        const reader: FileReader = new FileReader();

        const obs = Observable.create((observer: any) => {
            reader.onloadend = e => {
                observer.error(JSON.parse(reader.result as string));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }
}
