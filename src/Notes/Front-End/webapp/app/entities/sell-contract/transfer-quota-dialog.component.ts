import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SellContractService} from './sell-contract.service';
import {TransferQuotaPopupService} from './transfer-quota-popup.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SellContractProductService} from '../sell-contract-product';
import {TransferQuota} from './sell-contract.model';

@Component({
    selector: 'jhi-transfer-quota-dialog',
    templateUrl: './transfer-quota-dialog.component.html'
})
export class TransferQuotaDialogComponent implements OnInit {
    isSaving: boolean;
    sellContractId: number;
    fromSellContractsProducts: any[] = [];
    customFromSellContractsProducts: any[] = [];
    toSellContractsProducts: any[] = [];
    customToSellContractsProducts: any[] = [];
    transferQuota: TransferQuota = new TransferQuota();

    constructor(
        private sellContractService: SellContractService,
        private sellContractProductService: SellContractProductService,
        public activeModal: NgbActiveModal,
        private route: ActivatedRoute
    ) {
        this.sellContractId = route.snapshot.queryParams['id'];
    }

    ngOnInit() {
        this.isSaving = false;
        this.loadFromSellContractProduct();
    }

    clear() {
        this.activeModal.dismiss();
    }

    save() {
        this.sellContractService.createTransferQuota(this.transferQuota)
            .subscribe(value => {
                this.activeModal.dismiss();
            });
    }

    loadFromSellContractProduct() {
        this.sellContractProductService.queryByhaveQuotaCredit(this.transferQuota.sellContractId)
            .subscribe(value => {
                this.fromSellContractsProducts = value.body;
                const sellContractProduct = {
                    value: null,
                    label: ''
                };
                this.customFromSellContractsProducts = [];
                this.customFromSellContractsProducts.push(sellContractProduct);
                this.fromSellContractsProducts.forEach(value1 => {
                    this.customFromSellContractsProducts.push({
                        value: value1.id,
                        label: value1.productTitle
                    });
                });
            });
    }

    onChangeFromSellContractProduct(fromId) {
        if (fromId) {
            this.sellContractProductService.queryForTransferQuota(fromId)
                .subscribe(value => {
                    this.toSellContractsProducts = value.body;
                    const sellContractProduct = {
                        value: null,
                        label: ''
                    };
                    this.customToSellContractsProducts = [];
                    this.customToSellContractsProducts.push(sellContractProduct);
                    this.toSellContractsProducts.forEach(value1 => {
                        this.customToSellContractsProducts.push({
                            value: value1.id,
                            label: value1.productTitle
                        });
                    });
                });
        }
    }
}

@Component({
    selector: 'jhi-transfer-quota-popup',
    template: ''
})
export class TransferQuotaPopupDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transferQuotaPopupService: TransferQuotaPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            UsefulId.id = Number(params['id']);

            if (params['id']) {
                this.transferQuotaPopupService
                    .open(TransferQuotaDialogComponent as Component, params['id']);
            }
            console.log('not be');
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class UsefulId {
    static id: number;
}
