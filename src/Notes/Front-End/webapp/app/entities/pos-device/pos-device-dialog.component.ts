import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {PosDevice, PosDeviceAccount, PosDeviceServiceType} from './pos-device.model';
import {PosDevicePopupService} from './pos-device-popup.service';
import {PosDeviceService} from './pos-device.service';
import {NiopdcBankAccount, NiopdcBankAccountService} from '../niopdc-bank-account';
import {DepositIdentifier, DepositIdentifierService} from '../deposit-identifier';
import {TranslateService} from '@ngx-translate/core';
import {ContractType} from '../sell-contract';

@Component({
    selector: 'jhi-pos-device-dialog',
    templateUrl: './pos-device-dialog.component.html'
})
export class PosDeviceDialogComponent implements OnInit {

    posDevice: PosDevice;
    isSaving: boolean;
    isView: boolean;
    locationId: number;

    niopdcbankaccounts: NiopdcBankAccount[];
    depositIdentifiers: DepositIdentifier[];
    customNiopdcBankAccounts: any[];
    customDepositIdentifiers: any[];
    serviceTypes: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private posDeviceService: PosDeviceService,
        private niopdcBankAccountService: NiopdcBankAccountService,
        private depositIdentifierService: DepositIdentifierService,
        private translateService: TranslateService,
        private eventManager: JhiEventManager
    ) {
        this.serviceTypes = [];
        for (const serviceType in PosDeviceServiceType) {
            if (isNaN(parseInt(serviceType, 10))) {
                const item = {
                    value: serviceType,
                    label: serviceType
                };
                this.translateService.get('niopdcgatewayApp.PosDeviceServiceType.' + serviceType).subscribe(value => {
                    item.label = value;
                });
                this.serviceTypes.push(item);
            }
        }

    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;

        if (this.posDevice.locationId) {
            this.locationId = this.posDevice.locationId;
            this.niopdcBankAccountService.findAllByLocationId(this.posDevice.locationId)
                .subscribe((res: HttpResponse<NiopdcBankAccount[]>) => {
                    this.niopdcbankaccounts = res.body;

                    this.customNiopdcBankAccounts = [{}];
                    this.niopdcbankaccounts.forEach(value => {
                        this.customNiopdcBankAccounts.push({
                            value: value.id,
                            label: value.title + '( ' + value.accountNumber + ' )'
                        });

                    });
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }

        if (this.posDevice.locationId) {
            this.depositIdentifierService.findAllForLocation(this.posDevice.locationId)
                .subscribe((res: HttpResponse<DepositIdentifier[]>) => {
                    this.depositIdentifiers = res.body;
                    this.depositIdentifiers.forEach(value => {
                        this.translateService.get('niopdcgatewayApp.Bank.' + value.bank).subscribe(value1 => {
                            value.title = value.code + ' - ' + value1;
                        });

                        this.customDepositIdentifiers = [{}];
                        this.depositIdentifiers.forEach(value => {
                            const items = {
                                value: value.code,
                                label: value.code
                            };
                            this.translateService.get('niopdcgatewayApp.Bank.' + value.bank).subscribe(value1 => {
                                items.label = value.code + ' - ' + value1;
                            });

                            this.customDepositIdentifiers.push(items);

                        });

                    });
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
        if (!(this.posDevice.posDeviceAccounts && this.posDevice.posDeviceAccounts.length)) {
            this.addAccount();
        } else {
            let i = 1;
            this.posDevice.posDeviceAccounts.forEach(value => {
                value.tid = i;
                i++;
            });
        }

    }

    addAccount() {
        const posDeviceAccount = new PosDeviceAccount();
        posDeviceAccount.tid = (!(this.posDevice.posDeviceAccounts && this.posDevice.posDeviceAccounts.length) ?
            0 :
            this.posDevice.posDeviceAccounts.map(value => value.tid).reduce((a, b) => Math.max(a, b))) + 1;
        this.posDevice.posDeviceAccounts.push(posDeviceAccount);
    }

    deleteAccount(item) {
        this.posDevice.posDeviceAccounts = this.posDevice.posDeviceAccounts.filter(value => value !== item);
    }

    changeNiopdcBankAccount(item) {
        const niopdcBankAccount = this.niopdcbankaccounts.find(value => value.id === item.niopdcBankAccountId);
        item.accountIdentifier = niopdcBankAccount ? niopdcBankAccount.accountIdentifier : '';
    }

    onLocationSelected(location) {
        if (this.posDevice.locationId && this.posDevice.locationId !== location.id) {
            this.posDevice.posDeviceAccounts = [];
        }
        this.posDevice.locationId = location.id;
        this.customDepositIdentifiers = [{}];
        this.customNiopdcBankAccounts = [{}];
        this.niopdcBankAccountService.findAllByLocationId(this.posDevice.locationId)
            .subscribe((res: HttpResponse<NiopdcBankAccount[]>) => {
                this.niopdcbankaccounts = res.body;
                this.customNiopdcBankAccounts = [{}];
                this.niopdcbankaccounts.forEach(value => {
                    this.customNiopdcBankAccounts.push({
                        value: value.id,
                        label: value.title + '( ' + value.accountNumber + ' )'
                    });

                });
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.depositIdentifierService.findAllForLocation(this.posDevice.locationId)
            .subscribe((res: HttpResponse<DepositIdentifier[]>) => {
                this.depositIdentifiers = res.body;
                this.depositIdentifiers.forEach(value => {
                    this.translateService.get('niopdcgatewayApp.Bank.' + value.bank).subscribe(value1 => {
                        value.title = value.code + ' - ' + value1;
                    });

                    this.customDepositIdentifiers = [{}];
                    this.depositIdentifiers.forEach(value => {
                        const items = {
                            value: value.code,
                            label: value.code
                        };
                        this.translateService.get('niopdcgatewayApp.Bank.' + value.bank).subscribe(value1 => {
                            items.label = value.code + ' - ' + value1;
                        });

                        this.customDepositIdentifiers.push(items);

                    });

                });
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.posDevice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.posDeviceService.update(this.posDevice));
        } else {
            this.subscribeToSaveResponse(
                this.posDeviceService.create(this.posDevice));
        }
    }

    trackDepositIdentifierById(index: number, item: DepositIdentifier) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PosDevice>>) {
        result.subscribe((res: HttpResponse<PosDevice>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PosDevice) {
        this.eventManager.broadcast({name: 'posDeviceListModification', content: 'OK'});
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
    selector: 'jhi-pos-device-popup',
    template: ''
})
export class PosDevicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private posDevicePopupService: PosDevicePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.posDevicePopupService
                    .open(PosDeviceDialogComponent as Component, params['id']);
            } else {
                this.posDevicePopupService
                    .open(PosDeviceDialogComponent as Component);
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
