import {Component, OnInit, OnDestroy, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import {CustomerOrderCapacity} from './customer-order-capacity.model';
import { CustomerOrderCapacityService } from './customer-order-capacity.service';
import {DatePipe} from '@angular/common';
import {SellContractProductService} from '../sell-contract-product';
import {HttpResponse} from '@angular/common/http';
import {SellContractCustomerService} from '../sell-contract/sell-contract-customer.service';
import {getPath} from 'app/core/router';

@Component({
    selector: 'jhi-customer-order-capacity-active-dialog',
    templateUrl: './customer-order-capacity-active-dialog.component.html'
})
export class CustomerOrderCapacityActiveDialogComponent {

    customerOrderCapacity: CustomerOrderCapacity;
    isActive;

    constructor(
        private customerOrderCapacityService: CustomerOrderCapacityService,
        public activeModal: NgbActiveModal,
        private activatedRoute: ActivatedRoute,
        private eventManager: JhiEventManager
    ) {

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmActive(id: number) {
        this.customerOrderCapacityService.active(id, this.isActive).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerOrderCapacityListModification',
                content: 'Active/DeActive an customerOrderCapacity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Injectable({ providedIn: 'root' })
export class CustomerOrderCapacityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe,
                private modalService: NgbModal,
                private router: Router,
                private sellContractProductService: SellContractProductService,
                private sellContractCustomerService: SellContractCustomerService,
                private customerOrderCapacityService: CustomerOrderCapacityService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, isActive?: string): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.customerOrderCapacityService.find(id)
                    .subscribe((customerOrderCapacityResponse: HttpResponse<CustomerOrderCapacity>) => {
                        const customerOrderCapacity: CustomerOrderCapacity = customerOrderCapacityResponse.body;
                        this.ngbModalRef = this.customerOrderCapacityModalRef(component, customerOrderCapacity, isActive === 'active');
                        resolve(this.ngbModalRef);
                    });
            }
        });
    }

    customerOrderCapacityModalRef(component: Component, customerOrderCapacity: CustomerOrderCapacity, isActive: boolean): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerOrderCapacity = customerOrderCapacity;
        modalRef.componentInstance.isActive = isActive;
        modalRef.result.then(result => {
            this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        },reason => {
            this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

@Component({
    selector: 'jhi-customer-order-capacity-active-popup',
    template: ''
})
export class CustomerOrderCapacityActivePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    constructor(
        private route: ActivatedRoute,
        private customerOrderCapacityPopupService: CustomerOrderCapacityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.customerOrderCapacityPopupService
                .open(CustomerOrderCapacityActiveDialogComponent as Component, params['id'], params['isActive']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
