import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {TranslateService} from '@ngx-translate/core';
import {PersonService} from './person.service';
import {DataStateChangeEvent} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {CustomerType} from '../../../entities/customer-type';
import {PersonReport, PersonRequest} from './person.model';
import {Region, RegionService} from '../../../entities/region';
import {ConnectDepotService} from '../../../entities/order';
import {saveAs} from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-person',
    templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit, OnDestroy {

    currentAccount: any;
    person: PersonReport[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    breadcrumbItems: any[];
    req: PersonRequest = new PersonRequest({});
    aggregates: any[] = [{field: 'totalPrice', aggregate: 'sum'}];
    state: State = {take: 10};
    gridData: any = process(this.person, this.state);
    regions: Region[];
    allRegion = true;

    constructor(
        private personService: PersonService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private connectDepotService: ConnectDepotService,
        private regionService: RegionService,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
    }

    loadAll() {
        this.personService.query(this.req).subscribe(
            (res: HttpResponse<PersonReport[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.error)
        );
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.customer.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    ngOnInit() {
        this.connectDepotService.downloadTtms()
            .subscribe(value => {
                saveAs(value.body, value.headers.get('filename'));
            }, (error1: HttpErrorResponse) => this.onError(error1));

        this.setBreadCrumb();

        this.req.startDate = new Date();
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);

    }

    ngOnDestroy() {
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.req.state = state;
        this.loadAll();
    }

    private onSuccess(data) {
        this.person = data;
        this.state = this.req.state;
        if (this.state && this.state.group) {
            this.state.group.map(group => group.aggregates = this.aggregates);
        }
        this.gridData = process(this.person, this.state);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
