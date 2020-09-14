import {JhiEventManager} from 'ng-jhipster';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {tap} from 'rxjs/operators';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

    // tslint:disable-next-line: no-unused-variable
    constructor(private eventManager: JhiEventManager) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                    const arr = event.headers.keys();
                    let alert = null;
                    let alertParams = null;
                    arr.forEach(entry => {
                        if (entry.endsWith('app-alert')) {
                            alert = event.headers.get(entry);
                        } else if (entry.endsWith('app-params')) {
                            alertParams = event.headers.get(entry);
                        }
                    });
                    if (alert) {
                        if (typeof alert === 'string') {
                            if (this.eventManager) {
                                if (request.method === 'POST' || request.method === 'DELETE' || request.method === 'PUT') {
                                    if (event.status === 200 || event.status === 201 || event.status === 202) {
                                        const alertParam = alertParams;
                                        this.eventManager.broadcast({name: 'niopdcgatewayApp.httpSuccess', content: {alert, alertParam}});
                                    }
                                }
                            }
                        }
                    }
                }
            }, (err: any) => {
            }));
    }
}
