import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {RequestFilterElement} from './request-filter-element.model';
import {RequestFilterElementPopupService} from './request-filter-element-popup.service';
import {RequestFilterElementService} from './request-filter-element.service';

@Component({
    selector: 'jhi-request-filter-element-send-dialog',
    templateUrl: './request-filter-element-send-dialog.component.html'
})
export class RequestFilterElementSendDialogComponent {

    requestFilterElement: RequestFilterElement;

    constructor(
        private requestFilterElementService: RequestFilterElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmSend(id: number) {
        this.requestFilterElementService.send(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestFilterElementListModification',
                content: 'Sendd an requestFilterElement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-request-filter-element-send-popup',
    template: ''
})
export class RequestFilterElementSendPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private requestFilterElementPopupService: RequestFilterElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.requestFilterElementPopupService
                .open(RequestFilterElementSendDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
