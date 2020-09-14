import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ResponsePlunging} from './response-plunging.model';
import {ResponsePlungingService} from './response-plunging.service';
import {Principal} from '../../../shared';
import {RequestPlunging, RequestPlungingService} from '../request-plunging/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-response-plunging',
    templateUrl: './response-plunging.component.html'
})
export class ResponsePlungingComponent implements OnInit, OnDestroy {

    currentAccount: any;
    responsePlungings: ResponsePlunging[];
    responsePlunging: ResponsePlunging = new ResponsePlunging();
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    requestPlungingId: number;
    requestPlunging: RequestPlunging;
    breadcrumbItems: any[];

    constructor(private responsePlungingService: ResponsePlungingService,
                private requestPlungingService: RequestPlungingService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private eventManager: JhiEventManager) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.itemsPerPage = data.pagingParams.size;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = !data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.queryParams['search'] ? activatedRoute.snapshot.queryParams['search'] : '';
        this.requestPlungingId = activatedRoute.snapshot.params['requestPlungingId'];
        this.responsePlunging.confirm = null;
        this.responsePlunging.isSend = null;

        const x = this.currentSearch.split('&');
        for (const key of x) {
            let value = key.split('$');
            if (key.lastIndexOf('#') >= 0) { // enum
                value = key.split('#');
            } else if (key.lastIndexOf(';') >= 0) { // Boolean
                value = key.split(';');
            } else if (key.lastIndexOf('☼') >= 0) { // equal number
                value = key.split('☼');
            } else if (key.lastIndexOf('>') >= 0) { // number
                value = key.split('>');
            } else if (key.lastIndexOf('<') >= 0) { // number
                value = key.split('<');
            } else if (key.lastIndexOf('→') >= 0) { // start date
                value = key.split('→');
            } else if (key.lastIndexOf('←') >= 0) { // end date
                value = key.split('←');
            }

            if (value.length > 1) {
                if (value[0] === 'confirm') {
                    this.responsePlunging[value[0]] = Boolean(value[1]);
                } else if (value[0] === 'isSend') {
                    this.responsePlunging[value[0]] = Boolean(value[1]);
                } else {
                    this.responsePlunging[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.responsePlungingService.query(this.requestPlungingId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ResponsePlunging[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['request-plunging/' + this.requestPlungingId + '/response-plunging'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.responsePlunging = new ResponsePlunging();
        this.responsePlunging.isSend = null;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.responsePlunging.confirm) {
            this.currentSearch += 'confirm;' + this.responsePlunging.confirm + '&';
        }
        if (this.responsePlunging.description) {
            this.currentSearch += 'description$' + this.responsePlunging.description + '&';
        }
        if (this.responsePlunging.responseDate) {
            this.currentSearch += 'responseDate→' + this.responsePlunging.responseDate.toISOString() + '&';
        }
        if (this.responsePlunging.isSend) {
            this.currentSearch += 'isSend;' + this.responsePlunging.isSend + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['request-plunging/' + this.requestPlungingId + '/response-plunging'], {
            queryParams: {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }
        });
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.responsePlunging.home.requestPlungingTitle').subscribe(title => {
            this.breadcrumbItems.push({
                label: title + ` (${this.requestPlunging.id})`,
                routerLink: ['/request-plunging']
            });
        });
        this.translateService.get('niopdcgatewayApp.responsePlunging.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInResponsePlungings();

        this.requestPlungingService.find(this.requestPlungingId).subscribe(requestPlunging => {
                this.requestPlunging = requestPlunging.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResponsePlunging) {
        return item.id;
    }

    registerChangeInResponsePlungings() {
        this.eventSubscriber = this.eventManager.subscribe('responsePlungingListModification',response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        const predicate = this.predicate;
        const reverse = this.reverse;
        const page = this.page;
        const itemsPerPage = this.itemsPerPage;
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder !== 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            this.router.navigate(['request-plunging', this.requestPlungingId, 'response-plunging'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                }
            });
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.responsePlungings = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
