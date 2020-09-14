import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {CustomerService} from './customer.service';
import {CustomerPopupService} from './customer-popup.service';
import {Customer} from './customer.model';

@Component({
    selector: 'jhi-boundary-customer-archive-dialog',
    templateUrl: './boundary-customer-archive-dialog.component.html'
})
export class CustomerBoundaryArchiveDialogComponent {

    customer: Customer;

    constructor(
        private customerService: CustomerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmArchive(id: number) {

      if(this.customer.archive){
          this.customerService.deArchive(id).subscribe(response => {
              this.eventManager.broadcast({
                  name: 'customerListModification',
                  content: 'Archive an customer'
              });
              this.activeModal.dismiss(true);
          });
      } else {
          this.customerService.archive(id).subscribe(response => {
              this.eventManager.broadcast({
                  name: 'customerListModification',
                  content: 'Archive an customer'
              });
              this.activeModal.dismiss(true);
          });
      }

    }


}

@Component({
    selector: 'jhi-boundary-customer-archive-popup',
    template: ''
})
export class CustomerBoundaryArchivePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.customerPopupService
                .open(CustomerBoundaryArchiveDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
