import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class Service {
    constructor(private http: HttpClient) {
        this.getJSON().subscribe(data => {
            console.log(data);
        });
    }

    public getJSON(): Observable<Object> {
        return this.http.get("/content/js/dx.messages.fa.js");
    }
}
