import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Depot, DepotType} from './depot.model';
import {DepotPopupService} from './depot-popup.service';
import {DepotService} from './depot.service';
import {Location, LocationService} from '../location';
import {Product, ProductService} from '../product';
import {SellContractProductService} from '../sell-contract-product';
import {RefuelCenter, RefuelCenterService} from '../ao-entities/refuel-center';

@Component({
    selector: 'jhi-depot-dialog',
    templateUrl: './depot-dialog.component.html'
})
export class DepotDialogComponent implements OnInit {

    regexCode = /^[\d]{4}$/;
    depot: Depot;
    isSaving: boolean;

    locations: Location[];
    locationSelected: any[];

    products: any;
    productSelected: any[];
    refuelCenterSelected: any [];

    DepotType = DepotType;
    isView: boolean;

    refuelCenters: any;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private depotService: DepotService,
                private refuelCenterService: RefuelCenterService,
                private locationService: LocationService,
                private productService: ProductService,
                private sellContractProductService: SellContractProductService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        if (this.depot.id && this.depot.depotType === this.DepotType[this.DepotType.REFUELING_UNIT]) {
            this.refuelCenterService.queryByNational(true).subscribe(res => {
                this.refuelCenters = res.body;
                for (let i = 0; i < this.refuelCenters.length; i++) {
                    this.refuelCenters[i].label = this.refuelCenters[i].persianTitle;
                    this.refuelCenters[i].value = this.refuelCenters[i].id;
                }

                // todo abbas
                /*if (this.depot.id != null) {
                    this.refuelCenterSelected = [];
                    for (let i = 0; i < this.depot.refuelCenters.length; i++) {
                        this.refuelCenterSelected.push(this.depot.refuelCenters[i]);
                    }
                }*/
            });
        }
        this.productService.query().subscribe(
            (res: HttpResponse<Product[]>) => {
                this.products = res.body;

                for (let i = 0; i < this.products.length; i++) {
                    this.products[i].label = this.products[i].title;
                    this.products[i].value = this.products[i].id;
                }

                if (this.depot.id != null) {
                    this.productSelected = [];
                    for (let i = 0; i < this.depot.products.length; i++) {
                        this.productSelected.push(this.depot.products[i].id);
                    }
                }

            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    onChangeProducts(newValue) {
        this.depot.products = [];
        for (let i = 0; i < this.productSelected.length; i++) {
            for (let j = 0; j < this.products.length; j++) {
                if (this.productSelected[i] === this.products[j].id) {
                    this.depot.products[i] = this.products[j];
                }
            }
        }
    }

    onChangeDepotType(data) {
        if (data === this.DepotType[this.DepotType.REFUELING_UNIT]) {
            this.refuelCenterService.queryByNational(true).subscribe(res => {
                this.refuelCenters = res.body;
                for (let i = 0; i < this.refuelCenters.length; i++) {
                    this.refuelCenters[i].label = this.refuelCenters[i].persianTitle;
                    this.refuelCenters[i].value = this.refuelCenters[i].id;
                }

                // todo abbas
                /* if (this.depot.id != null) {
                     this.refuelCenterSelected = [];
                     for (let i = 0; i < this.depot.refuelCenters.length; i++) {
                         this.refuelCenterSelected.push(this.depot.refuelCenters[i]);
                     }
                 }*/
            });
        } else {
            // todo abbas
            // this.depot.refuelCenters = null;
        }
    }

    /*onChangeRefuelCenters(newValue) {
        this.depot.refuelCenters = [];
        for (let i = 0; i < this.refuelCenterSelected.length; i++) {
            for (let j = 0; j < this.refuelCenters.length; j++) {
                if (this.refuelCenterSelected[i] === this.refuelCenters[j].id) {
                    this.depot.refuelCenters[i] = this.refuelCenters[j].id;
                }
            }
        }
    }*/

    locationChanged(data) {
        if (data && data.length !== 0) {
            const ids = data.map(d => d.id);
            this.locationService.queryBySubLocationsAndLevel(ids, 2)
                .subscribe(
                    (res: HttpResponse<Location[]>) => {
                        this.locations = res.body;
                    });
        } else {
            this.depot.locationId = null;
            this.locations = null;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.depot.id !== undefined) {
            this.subscribeToSaveResponse(
                this.depotService.update(this.depot)
            );
        } else {
            this.subscribeToSaveResponse(
                this.depotService.create(this.depot));
        }
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Depot>>) {
        result.subscribe((res: HttpResponse<Depot>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Depot) {
        this.eventManager.broadcast({name: 'depotListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

@Component({
    selector: 'jhi-depot-popup',
    template: ''
})
export class DepotPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private depotPopupService: DepotPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.depotPopupService
                    .open(DepotDialogComponent as Component, params['id']);
            } else {
                this.depotPopupService
                    .open(DepotDialogComponent as Component);
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
