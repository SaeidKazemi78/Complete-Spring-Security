import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {OilTankContainer} from './oil-tank-container.model';
import {OilTankContainerPopupService} from './oil-tank-container-popup.service';
import {OilTankContainerService} from './oil-tank-container.service';
import {Product} from '../../product/product.model';
import {ProductService} from '../../product/product.service';
import {ContainerService} from '../../container/container.service';
import {Container} from '../../container/container.model';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';

@Component({
    selector: 'jhi-oil-tank-container-dialog',
    templateUrl: './oil-tank-container-dialog.component.html'
})
export class OilTankContainerDialogComponent implements OnInit {

    oilTankContainer: OilTankContainer;
    isSaving: boolean;
    isView: boolean;
    createType: number;
    refuelCenters: RefuelCenter[];
    products: Product[];
    containers: Container[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private productService: ProductService,
                private containerService: ContainerService,
                private jhiAlertService: JhiAlertService,
                private oilTankContainerService: OilTankContainerService,
                private refuelCenterService: RefuelCenterService,
                private hotkeyService: HotkeyService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotkeyService.add('enter', null, this.editForm, false);
        this.createType = CreateType.createType;
        this.isView = View.isView;
        this.isSaving = false;
        if (this.createType === 1) {
            this.productService.queryByHasContainer(true)
                .subscribe(res => {
                    this.products = res.body;
                },res => this.onError(res.message));
        } else {
            this.containerService.query()
                .subscribe(res => {
                    this.containers = res.body;
                },res => this.onError(res.message));
        }
        this.refuelCenterService.queryByNational(true)
            .subscribe(res => {
                this.refuelCenters = res.body;
                if (this.refuelCenters.length === 1) {
                    this.oilTankContainer.refuelCenterId = this.refuelCenters[0].id;
                }
            },res => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.oilTankContainer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.oilTankContainerService.update(this.oilTankContainer));
        } else {
            this.subscribeToSaveResponse(
                this.oilTankContainerService.create(this.oilTankContainer));
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackContainerById(index: number, item: Container) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OilTankContainer>>) {
        result.subscribe((res: HttpResponse<OilTankContainer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OilTankContainer) {
        this.eventManager.broadcast({name: 'oilTankContainerListModification', content: 'OK'});
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
    selector: 'jhi-oil-tank-container-popup',
    template: ''
})
export class OilTankContainerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private oilTankContainerPopupService: OilTankContainerPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['parentType']) {
                if (params['parentType'] === 'container') {
                    CreateType.createType = 0;
                } else {
                    CreateType.createType = 1;
                }
            }

            if (params['parent']) {
                if (params['parent'] === 'container') {
                    CreateType.createType = 0;
                } else if (params['parent'] === 'product') {
                    CreateType.createType = 1;
                }
            }

            if (params['id']) {
                this.oilTankContainerPopupService
                    .open(OilTankContainerDialogComponent as Component, params['id']);
            } else {
                this.oilTankContainerPopupService
                    .open(OilTankContainerDialogComponent as Component);
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

class CreateType {
    static createType: number; // number '0' equal to create container type and number '1' equal to create product container type.
}
