import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {LiteratureVolumeOilTank} from './literature-volume-oil-tank.model';
import {LiteratureVolumeOilTankService} from './literature-volume-oil-tank.service';
import {Principal} from '../../../shared';

import {LazyLoadEvent} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../../app.constants';
import {CookieService} from 'ngx-cookie';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {OilTank, OilTankService} from '../oil-tank';
import {ServiceOilTank, ServiceOilTankService} from '../service-oil-tank';

@Component({
    selector: 'jhi-literature-volume-oil-tank',
    templateUrl: './literature-volume-oil-tank.component.html'
})
export class LiteratureVolumeOilTankComponent implements OnInit, OnDestroy {

    @ViewChild('myform') myform;

    currentAccount: any;
    literatureVolumeOilTanks: LiteratureVolumeOilTank[];
    literatureVolumeOilTank: LiteratureVolumeOilTank = new LiteratureVolumeOilTank();
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
    oilTankId: number;
    serviceOilTankId: number;
    oilTank: OilTank;
    serviceOilTank: ServiceOilTank;
    breadcrumbItems: any[];

    oiltanks: OilTank[];
    serviceoiltanks: ServiceOilTank[];
    uploadServiceUrl = SERVER_API_URL + '/niopdcao/api/literature-volume-oil-tanks/upload/service/';
    uploadOiltankUrl = SERVER_API_URL + '/niopdcao/api/literature-volume-oil-tanks/upload/oil-tank/';

    constructor(private literatureVolumeOilTankService: LiteratureVolumeOilTankService,
                private serviceOilTankService: ServiceOilTankService,
                private oilTankService: OilTankService,
                private cookieService: CookieService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private hotKeyService: HotkeyService,
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
        this.oilTankId = activatedRoute.snapshot.params['oilTankId'];
        this.serviceOilTankId = activatedRoute.snapshot.params['serviceOilTankId'];

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
                    this.literatureVolumeOilTank[value[0]] = Number(value[1]);
                } else {
                    this.literatureVolumeOilTank[value[0]] = value[1];
                }
            }
        }
    }

    loadAll() {
        if (this.serviceOilTankId != null) {
            this.uploadServiceUrl += this.serviceOilTankId;
            this.literatureVolumeOilTankService.queryByServiceOilTankId(this.serviceOilTankId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<LiteratureVolumeOilTank[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.uploadOiltankUrl += this.oilTankId;
            this.literatureVolumeOilTankService.queryByOilTankId(this.oilTankId, {
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(res => this.onSuccess(res.body, res.headers),res => this.onError(res.message)
            );
        }
    }

    clear() {
        this.page = 0;
        if (this.serviceOilTankId != null) {
            this.router.navigate(['oil-tank/' + this.oilTankId + '/service-oil-tank/' + this.serviceOilTankId + '/literature-volume-oil-tank', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else {
            this.currentSearch = '';
            this.router.navigate(['oil-tank/' + this.oilTankId + '/literature-volume-oil-tank', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.literatureVolumeOilTank = new LiteratureVolumeOilTank();
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.literatureVolumeOilTank.millimeter) {
            this.currentSearch += 'millimeter☼' + this.literatureVolumeOilTank.millimeter + '&';
        }
        if (this.literatureVolumeOilTank.measureType) {
            this.currentSearch += 'measureType#MeasureType.' + this.literatureVolumeOilTank.measureType + '&';
        }
        if (this.literatureVolumeOilTank.liter) {
            this.currentSearch += 'liter☼' + this.literatureVolumeOilTank.liter + '&';
        }
        if (this.literatureVolumeOilTank.oilTankId) {
            this.currentSearch += 'oilTank.id☼' + this.literatureVolumeOilTank.oilTankId + '&';
        }
        if (this.literatureVolumeOilTank.serviceOilTankId) {
            this.currentSearch += 'serviceOilTank.id☼' + this.literatureVolumeOilTank.serviceOilTankId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        if (this.serviceOilTankId != null) {
            this.router.navigate(['oil-tank/' + this.oilTankId + '/service-oil-tank/' + this.serviceOilTank + '/literature-volume-oil-tank', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        } else {
            this.router.navigate(['oil-tank/' + this.oilTankId + '/literature-volume-oil-tank', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
            }]);
        }
        this.loadAll();
    }

    onChangeFile(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];

            if (this.serviceOilTankId) {
                this.literatureVolumeOilTankService.uploadExcelServiceOilTank(file, this.serviceOilTankId)
                    .subscribe((res: HttpResponse<string>) => {
                        this.loadAll();
                    },error => {
                        console.log(error);
                    });
            } else {
                this.literatureVolumeOilTankService.uploadExcelOilTank(file, this.oilTankId)
                    .subscribe((res: HttpResponse<string>) => {
                        this.loadAll();
                    },error => {
                        console.log(error);
                    });
            }
        }
        this.myform.nativeElement.reset();
    }

    onBeforeSend(event: any) {
        event.xhr.open('POST', this.oilTankId ? this.uploadOiltankUrl : this.uploadServiceUrl, true);

        event.xhr.setRequestHeader('X-XSRF-TOKEN', this.cookieService.get('XSRF-TOKEN'));
    }

    myUploader(event, i) {
        console.log(event.file);
        console.log(i);
        // event.files == files to upload
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.literatureVolumeOilTank.home.oilTankTitle').subscribe(title => {
            this.breadcrumbItems.push({label: `${title} (${this.oilTank.title})`, routerLink: ['/oil-tank']});
        });
        if (this.serviceOilTankId != null && this.serviceOilTank != null) {
            this.translateService.get('niopdcgatewayApp.literatureVolumeOilTank.home.serviceOilTankTitle').subscribe(title => {
                this.breadcrumbItems.push({
                    label: `${title} (${this.serviceOilTank.title})`,
                    routerLink: ['/oil-tank/' + this.oilTankId + '/service-oil-tank']
                });
            });
        }
        this.translateService.get('niopdcgatewayApp.literatureVolumeOilTank.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    ngOnInit() {
        if (this.serviceOilTankId) {
            this.hotKeyService.add('ins', 'literature-volume-oil-tank-new/service-oil-tank/' + this.serviceOilTankId, null, true);
        } else {
            this.hotKeyService.add('ins', 'literature-volume-oil-tank-new/oil-tank/' + this.oilTankId, null, true);
        }

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.oilTankService.query().subscribe(res => {
                this.oiltanks = res.body;
            }
        );
        this.serviceOilTankService.queryByOilTankId(this.oilTankId).subscribe(res => {
                this.serviceoiltanks = res.body;
            }
        );

        this.registerChangeInLiteratureVolumeOilTanks();

        this.oilTankService.find(this.oilTankId).subscribe(oilTank => {
                this.oilTank = oilTank.body;
                if (this.serviceOilTankId != null) {
                    this.serviceOilTankService.find(this.serviceOilTankId).subscribe(serviceOilTank => {
                            this.serviceOilTank = serviceOilTank.body;
                            this.setBreadCrumb();
                        }
                    );
                } else {
                    this.setBreadCrumb();
                }
            }
        );

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LiteratureVolumeOilTank) {
        return item.id;
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    trackServiceOilTankById(index: number, item: ServiceOilTank) {
        return item.id;
    }

    registerChangeInLiteratureVolumeOilTanks() {
        this.eventSubscriber = this.eventManager.subscribe('literatureVolumeOilTankListModification',response => this.loadAll());
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

        console.log(this.page,
            this.page, page,
            this.itemsPerPage, itemsPerPage,
            this.predicate, predicate,
            this.reverse, reverse);

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage ||
            this.predicate !== predicate ||
            this.reverse !== reverse) {

            if (this.serviceOilTankId != null) {
                this.router.navigate(['oil-tank/' + this.oilTankId + '/service-oil-tank', this.serviceOilTankId, 'literature-volume-oil-tank'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            } else {
                this.router.navigate(['oil-tank', this.oilTankId, 'literature-volume-oil-tank'], {
                    queryParams: {
                        page: this.page,
                        size: this.itemsPerPage,
                        search: this.currentSearch,
                        sort: this.predicate + ',' + (this.reverse ? 'desc' : 'asc')
                    }
                });
            }
        }

        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.literatureVolumeOilTanks = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
