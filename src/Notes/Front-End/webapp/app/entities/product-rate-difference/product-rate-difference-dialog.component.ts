import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ProductRateDifference, ProductRateDifferenceRequest, ProductRateDifferenceStatus} from './product-rate-difference.model';
import {ProductRateDifferencePopupService} from './product-rate-difference-popup.service';
import {ProductRateDifferenceService} from './product-rate-difference.service';
import {TranslateService} from '@ngx-translate/core';
import {Product, ProductService} from '../product';
import {RateGroup, RateGroupService} from '../rate-group';

@Component({
    selector: 'jhi-product-rate-difference-dialog',
    templateUrl: './product-rate-difference-dialog.component.html'
})
export class ProductRateDifferenceDialogComponent implements OnInit {

    productRateDifference: ProductRateDifference;
    productRateDifferences: ProductRateDifference[] = [];
    isSaving: boolean;
    isView: boolean;

    ProductRateDifferenceStatus = ProductRateDifferenceStatus;
    req: ProductRateDifferenceRequest = new ProductRateDifferenceRequest();
    search: boolean;
    breadcrumbItems;
    products: Product[];
    fromRateGroups: RateGroup[];
    rateGroups: RateGroup[];
    date: any;
    productId: any;

    constructor(
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private productRateDifferenceService: ProductRateDifferenceService,
        private productService: ProductService,
        private rateGroupService: RateGroupService,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        this.req.startDate = new Date();
        this.req.startDate.setMonth(this.req.startDate.getMonth() - 1);
        this.req.startDate.setHours(0);
        this.req.startDate.setMinutes(0);
        this.req.startDate.setSeconds(0);
        this.req.finishDate = new Date();
        this.req.finishDate.setHours(23);
        this.req.finishDate.setMinutes(59);
        this.req.finishDate.setSeconds(59);
        this.req.date = new Date();
        this.req.date.setHours(23);
        this.req.date.setMinutes(59);
        this.req.date.setSeconds(59);
        this.setBreadCrumb();
        this.productService.query()
            .subscribe(value => {
                this.products = value.body;
            });
        this.rateGroupService.query().subscribe(value => {
            this.fromRateGroups = value.body;
        });
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.productRateDifference.home.title').subscribe(title => {
            this.breadcrumbItems.push({label: title, routerLink: ['/product-rate-difference']});
        });
        this.translateService.get('niopdcgatewayApp.productRateDifference.home.createLabel').subscribe(title => {
            this.breadcrumbItems.push({label: title});
        });
    }

    findAllRateGroup() {
        this.search = true;
        if (this.req.type === 'EXIT_FROM_DEPOT') {
            this.findAllPrd();
        } else {
            this.rateGroupService.queryForDateAndProduct(this.req.date.toISOString(), this.req.productId).subscribe(value => {
                this.rateGroups = value.body;
                if (!this.rateGroups || !this.rateGroups.length) {
                    this.jhiAlertService.error('niopdcrateApp.rateGroup.empty');
                    this.newSearch();
                } else {
                    this.findAllPrd();
                }
            },error1 => {
                this.newSearch();
            });
        }
    }

    findAllPrd() {
        this.productRateDifferenceService.queryForUnset(this.req).subscribe(value => {
            this.productRateDifferences = value;
            if (!this.productRateDifferences || !this.productRateDifferences.length) {
                this.jhiAlertService.error('global.messages.info.emptyRecords');
                this.newSearch();
            } else {

            }
        },error1 => {
            this.newSearch();
        });
    }

    newSearch() {
        this.rateGroups = [];
        this.req.toRateGroupId = null;
        this.search = false;
        this.productRateDifferences = [];
    }

    clear() {
        // this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;

        if (this.req.type === 'EXIT_FROM_DEPOT') {
            this.productRateDifferenceService.create(this.req).subscribe(value => {
                this.onSaveSuccess();
            });
        } else {
            this.req.productRateDifferences = this.productRateDifferences;
            this.productRateDifferenceService.create(this.req).subscribe(value => {
                this.onSaveSuccess();
            });
        }

    }

    /*
        saveAndPayment() {
            this.productRateDifferenceService.createForEPayment(this.productRateDifference)
                .subscribe((value) => {
                    this.router.navigateByUrl('/product-rate-difference/payment;payId=' + value.body)
                        .then((value1) => {
                            this.activeModal.dismiss();
                        });
                });
        }*/

    private onSaveSuccess() {
        this.isSaving = false;
        this.findAllPrd();
        // this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

@Component({
    selector: 'jhi-product-rate-difference-popup',
    template: ''
})
export class ProductRateDifferencePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productRateDifferencePopupService: ProductRateDifferencePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.productRateDifferencePopupService
                    .open(ProductRateDifferenceDialogComponent as Component, params['id']);
            } else {
                this.productRateDifferencePopupService
                    .open(ProductRateDifferenceDialogComponent as Component);
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
