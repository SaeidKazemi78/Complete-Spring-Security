import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {UserConfig} from './user-config.model';
import {UserConfigPopupService} from './user-config-popup.service';
import {UserConfigService} from './user-config.service';
import {Customer, CustomerService} from '../customer';
import {Depot, DepotService} from '../depot';
import {Product, ProductService} from '../product';

@Component({
    selector: 'jhi-user-config-dialog',
    templateUrl: './user-config-dialog.component.html'
})
export class UserConfigDialogComponent implements OnInit {

    userConfig: UserConfig;
    isSaving: boolean;
    isView: boolean;

    customers: Customer[];

    depots: Depot[];

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userConfigService: UserConfigService,
        private customerService: CustomerService,
        private depotService: DepotService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this. customerService.query().subscribe(
            (res: HttpResponse<Customer[]>) => {
                this.customers = res.body;
            }
        );
        this. depotService.query().subscribe(
            (res: HttpResponse<Depot[]>) => {
                this.depots = res.body;
            }
        );
        this. productService.query().subscribe(
            (res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }
        );

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userConfig.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userConfigService.update(this.userConfig));
        } else {
            this.subscribeToSaveResponse(
                this.userConfigService.create(this.userConfig));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserConfig>>) {
        result.subscribe((res: HttpResponse<UserConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserConfig) {
        this.eventManager.broadcast({name: 'userConfigListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackDepotById(index: number, item: Depot) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-config-popup',
    template: ''
})
export class UserConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userConfigPopupService: UserConfigPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.userConfigPopupService
                    .open(UserConfigDialogComponent as Component, params['id']);
            } else {
                this.userConfigPopupService
                    .open(UserConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
