import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';
import {BoundarySellDiscountRequestDTO, DailyDiscountSalesDTO, ReportResponseDTO} from './boundary-sell-discount-report.model';
import {catchError} from 'rxjs/operators';

export type EntityResponseType = HttpResponse<DailyDiscountSalesDTO>;

@Injectable()
export class BoundaryDiscountSellReportService {

    private resourceUrl = SERVER_API_URL + 'niopdcreport/api/boundary-sell/count-discount-report';

    constructor(private http: HttpClient) {
    }

    query(req?: BoundarySellDiscountRequestDTO): Observable<HttpResponse<ReportResponseDTO>> {
        return this.http.post<ReportResponseDTO>(this.resourceUrl, req, {observe: 'response'})
            .map((res: HttpResponse<ReportResponseDTO>) => this.convertArrayResponse(res));
    }

    downloacExcel(req?: BoundarySellDiscountRequestDTO): Observable<HttpResponse<any>> {
        return this.http.post(`${this.resourceUrl}/excel-export`, req,
            {responseType: 'blob', observe: 'response'}).pipe(catchError(this.parseErrorBlob));
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

    private convertArrayResponse(res: HttpResponse<ReportResponseDTO>): HttpResponse<ReportResponseDTO> {
        const jsonResponse: ReportResponseDTO = res.body;
        const body: ReportResponseDTO = this.convertItemFromServer(jsonResponse);
        return res.clone({body});
    }

    private convertItemFromServer(dailySales: ReportResponseDTO): ReportResponseDTO {
        const copy: ReportResponseDTO = Object.assign({}, dailySales);
        return copy;
    }
}
