import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerDeactiveRule } from './customer-deactive-rule.model';
import { CustomerDeactiveRulePopupService } from './customer-deactive-rule-popup.service';
import { CustomerDeactiveRuleService } from './customer-deactive-rule.service';

@Component({
    selector: 'jhi-customer-deactive-rule-delete-dialog',
    templateUrl: './customer-deactive-rule-delete-dialog.component.html'
})
export class CustomerDeactiveRuleDeleteDialogComponent {

    customerDeactiveRule: CustomerDeactiveRule;

    constructor(
        private customerDeactiveRuleService: CustomerDeactiveRuleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerDeactiveRuleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerDeactiveRuleListModification',
                content: 'Deleted an customerDeactiveRule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-deactive-rule-delete-popup',
    template: ''
})
export class CustomerDeactiveRuleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerDeactiveRulePopupService: CustomerDeactiveRulePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.customerDeactiveRulePopupService
                .open(CustomerDeactiveRuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
