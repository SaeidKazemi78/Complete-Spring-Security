import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-wallet-payment',
    templateUrl: './wallet-payment-page.component.html'
})
export class WalletPaymentPageComponent implements OnInit, OnDestroy {
    showBack = true;
    showButton = true;
    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;
    identifier: any;
    constructor(  private activatedRoute: ActivatedRoute,) {
        this.identifier = activatedRoute.snapshot.params['requestIdentifier'];
    }

    onPayStatus(event){

        if(event == 'COMPLETE') {
            this.showBack = true;
            this.showButton = false;
        }


    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }


}
