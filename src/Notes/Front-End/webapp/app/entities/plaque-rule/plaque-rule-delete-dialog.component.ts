import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PlaqueRule } from './plaque-rule.model';
import { PlaqueRulePopupService } from './plaque-rule-popup.service';
import { PlaqueRuleService } from './plaque-rule.service';

@Component({
    selector: 'jhi-plaque-rule-delete-dialog',
    templateUrl: './plaque-rule-delete-dialog.component.html'
})
export class PlaqueRuleDeleteDialogComponent {

    plaqueRule: PlaqueRule;

    constructor(
        private plaqueRuleService: PlaqueRuleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.plaqueRuleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'plaqueRuleListModification',
                content: 'Deleted an plaqueRule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-plaque-rule-delete-popup',
    template: ''
})
export class PlaqueRuleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private plaqueRulePopupService: PlaqueRulePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.plaqueRulePopupService
                .open(PlaqueRuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
