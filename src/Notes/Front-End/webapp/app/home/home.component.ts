import {Component, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Account, LoginModalService, Principal} from '../shared';

import {NewsService} from '../entities/news/news.service';
import {News, NewsType} from '../entities/news/news.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ITEMS_PER_PAGE} from '../shared/constants/pagination.constants';
import {LazyLoadEvent, MessageService} from 'primeng/api';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';
import {ScriptService} from '../shared/script/script.service';
import {saveAs} from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ],
    providers: [MessageService]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    newses: News[];
    news: News;
    plaque = '11a22255';
    itemsPerPage: any = 5;
    page: any = 0;
    routeData: any;
    currentSearch: any = '';
    NewsType = NewsType;
    tabIndex: any = 0;
    totalItems: any;
    queryCount: any;
    selectedNewsType: any;
    cusids = [26];
    locations = [347, 346];
    regions;
    regionId = [346];
    msgs = [];
    content = `function StringStream(string) {
  this.pos = 0;
  this.string = string;
}`;

    constructor(private principal: Principal,
                private jhiAlertService: JhiAlertService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private newsService: NewsService,
                private script: ScriptService,
                private loginModalService: LoginModalService,
                private eventManager: JhiEventManager,
                private messageService: MessageService,
                private _hotkeysService: HotkeysService) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            // this.page = data.pagingParams.page;
        });
    }

    show() {
        this.messageService.add({severity: 'error', summary: 'Service Message', detail: 'Via MessageService'});
    }

    clear() {
        this.msgs = [];
    }

    async ngOnInit() {


        /*this.router.navigate(['/'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch
            }
        });*/

        this.principal.identity().then(account => {
            this.account = account;
        });
        // this.newsService.queryByRemainTime(null).subscribe((res) => {
        //     this.newses = res.body;
        // });

        /*this.stimulsfotSerive.getMRTFile().subscribe((value) => {

            this.transferTypesService.query().subscribe((value1) => {
                console.log('Load report from url');
                const report = new Stimulsoft.Report.StiReport();
                report.loadFile('/content/mdc/SimpleList (2).mrt');
                const dataSet = new Stimulsoft.System.Data.DataSet('Demo');
                const transferTypes = {
                    transferTypes: value1.body
                };
                const jsonData = JSON.stringify(transferTypes);
                dataSet.readJson(jsonData);
                report.dictionary.databases.clear();
                report.regData('Demo', 'Demo', dataSet);
                this.viewer.report = report;

                console.log('Rendering the viewer to selected element');
                this.viewer.renderHtml('viewer');
            });

        });*/
        this.registerAuthenticationSuccess();

    }

    onTransit() {
        /*this.newsService.createRemovce1([{name: 'ssss0'}, {name: 'ssss1'}]).subscribe((res) => {
        });*/
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess',message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    handleChangeTab(e) {
        this.tabIndex = e.index;
        if (this.tabIndex === 0) {
            this.selectedNewsType = null;
        } else if (this.tabIndex === 1) {
            this.selectedNewsType = this.NewsType[this.NewsType.INFO];
        } else if (this.tabIndex === 2) {
            this.selectedNewsType = this.NewsType[this.NewsType.EVENT];
        } else if (this.tabIndex === 3) {
            this.selectedNewsType = this.NewsType[this.NewsType.NEWS];
        } else if (this.tabIndex === 4) {
            this.selectedNewsType = this.NewsType[this.NewsType.ALERT];
        }
        this.loadAll(this.selectedNewsType);
        this.page = 0;

    }

    loadLazy(event: LazyLoadEvent) {
        const page = this.page;
        const itemsPerPage = this.itemsPerPage;
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;

        if (this.page > 1 ||
            this.page !== page ||
            this.itemsPerPage !== itemsPerPage) {

            this.router.navigate(['/'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch
                }
            });
        }
        this.loadAll(this.selectedNewsType);
    }

    loadAll(newsType) {
        this.newsService.queryByRemainTime(newsType, {
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: HttpResponse<News[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    selectNews(data, news) {
        console.log(data);
        console.log(news);
        this.news = news;
    }

    downloadFile(fileId: number){

        this.newsService.downloadFile(fileId)
            .subscribe(res=>{
                saveAs(res.body,res.headers.get('_NAME'))
            })
    }

    selectShowNews() {
        const news = this.newses.filter(c => c.showNews === true)[0];
        if (news) {
            this.news = news;
        }
    }
    private onSuccess(data, headers) {
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.newses = data;
        this.selectShowNews();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
