import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {News} from './news.model';
import {createRequestOption} from '../../shared';
import {catchError} from 'rxjs/operators';
export type EntityResponseType = HttpResponse<News>;
export type UploadResponseType = HttpResponse<number>;

@Injectable({providedIn: 'root'})
export class NewsService {

    private resourceUrl = SERVER_API_URL + '/api/news';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(news: News): Observable<EntityResponseType> {
        const copy = this.convert(news);
        return this.http.post<News>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(news: News): Observable<EntityResponseType> {
        const copy = this.convert(news);
        return this.http.put<News>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<News>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<News[]>> {
        const options = createRequestOption(req);
        return this.http.get<News[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<News[]>) => this.convertArrayResponse(res));
    }

    queryByRemainTime(newsType: any, req?: any): Observable<HttpResponse<News[]>> {

        const params = (newsType) ? new HttpParams().set('newsType', newsType) : null;
        const url = SERVER_API_URL + `/public/api/news/remain-time/`;
        return this.http.get<News[]>(url, {
            params,
            observe: 'response'
        })
            .map((res: HttpResponse<News[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    postFile(fileToUpload: File): Observable<UploadResponseType> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post<number>('/api/media/upload', formData ,{observe: 'response'});

    }


    downloadFile(fileId: number):  Observable<HttpResponse<any>> {
        return this.http.get(`/api/media/download/${fileId}`,{ responseType: 'blob',observe: 'response' })
       .pipe(catchError(this.parseErrorBlob));

    }


    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: News = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<News[]>): HttpResponse<News[]> {
        const jsonResponse: News[] = res.body;
        const body: News[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to News.
     */
    private convertItemFromServer(news: News): News {
        const copy: News = Object.assign({}, news);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(news.startDate);
        copy.finishDate = this.dateUtils
            .convertDateTimeFromServer(news.finishDate);
        return copy;
    }

    /**
     * Convert a News to a JSON which can be sent to the server.
     */
    private convert(news: News): News {
        const copy: News = Object.assign({}, news);
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
