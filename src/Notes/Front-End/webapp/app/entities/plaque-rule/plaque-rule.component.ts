import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {PlaqueRule} from './plaque-rule.model';
import {PlaqueRuleService} from './plaque-rule.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {Plaque, PlaqueService} from '../plaque/.';
import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-plaque-rule',
    templateUrl: './plaque-rule.component.html'
})
export class PlaqueRuleComponent implements OnInit, OnDestroy {

    currentAccount: any;
    plaqueRules: PlaqueRule[];
    plaqueRule: PlaqueRule = new PlaqueRule();
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
    plaqueId: number;
    plaque: Plaque;
    breadcrumbItems: any[];

    plaques: Plaque[];

    constructor(
        private plaqueRuleService: PlaqueRuleService,
        private plaqueService: PlaqueService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.plaqueId = activatedRoute.snapshot.params['plaqueId'];

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
                if (value[0].indexOf('.') > 0) {
                    const z = value[0].split('.');
                    value[0] = z[0] + z[1].substring(0, 1).toUpperCase() + z[1].substring(1);
                    this.plaqueRule[value[0]] = Number(value[1]);
                } else {
                    this.plaqueRule[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        this.plaqueRuleService.query(this.plaqueId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<PlaqueRule[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';

        this.router.navigate(['plaque/' + this.plaqueId + '/plaque-rule', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.plaqueRule.digit) {
            this.currentSearch += 'digit☼' + this.plaqueRule.digit + '&';
        }
        if (this.plaqueRule.priority) {
            this.currentSearch += 'priority☼' + this.plaqueRule.priority + '&';
        }
        if (this.plaqueRule.digitType) {
            this.currentSearch += 'digitType#DigitType.' + this.plaqueRule.digitType + '&';
        }
        if (this.plaqueRule.plaqueId) {
            this.currentSearch += 'plaque.id☼' + this.plaqueRule.plaqueId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.router.navigate(['plaque/' + this.plaqueId + '/plaque-rule', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.plaqueRule.home.plaqueTitle').subscribe(title => {
            this.breadcrumbItems.push({label: title + ` (${this.plaque.title})`, routerLink: ['/plaque']});
        });
        this.translateService.get('niopdcgatewayApp.plaqueRule.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.plaqueService.query().subscribe(res => {
                this.plaques = res.body;
            }
        );

        this.registerChangeInPlaqueRules();

        this.plaqueService.find(this.plaqueId).subscribe(plaque => {
                this.plaque = plaque.body;
                this.setBreadCrumb();
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PlaqueRule) {
        return item.id;
    }

    trackPlaqueById(index: number, item: Plaque) {
        return item.id;
    }

    registerChangeInPlaqueRules() {
        this.eventSubscriber = this.eventManager.subscribe('plaqueRuleListModification',response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.plaqueRules = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
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
            this.reverse = event.sortOrder === 1;
        }

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            this.router.navigate(['plaque', this.plaqueId, 'plaque-rule'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
            });
        }

        this.loadAll();
    }

}
