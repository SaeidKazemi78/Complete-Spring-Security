import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BoundarySellPopupService} from 'app/entities/boundary-sell/boundary-sell-popup.service';
import {BoundarySellDeActiveDialogComponent} from 'app/entities/boundary-sell/boundary-sell-de-active-dialog.component';
import {Order, OrderService, OrderType} from 'app/entities/order';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-boundary-sell-active-dialog',
    templateUrl: './boundary-sell-active-dialog.component.html'
})
export class BoundarySellActiveDialogComponent {

    constructor(public activeModal: NgbActiveModal, private orderService:OrderService,
                private eventManager: JhiEventManager){

    }

    OrderType = OrderType;
    order: Order;

    confirmActive(id:number){
        console.log(" Id  : " + id);
        this.orderService.active(id).subscribe(response => {
            console.log( "Res : ");
            console.log(response);
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'deActive an order'
            });
            this.eventManager.broadcast({
                name: 'orderDeActive' + id,
                content: 'deActive an order'
            });
            this.activeModal.dismiss(true);

        });

    }



    clear() {
        this.activeModal.dismiss('cancel');
    }


}










@Component({
    selector: 'jhi-boundary-sell-active-popup',
    template: ''
})

export class BoundarySellActivePopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    constructor(
        private route: ActivatedRoute,
        private boundarySellPopupService: BoundarySellPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.boundarySellPopupService
                .open(BoundarySellActiveDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
