import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ReceivedProductContainer} from './received-product-container.model';
import {ReceivedProductContainerPopupService} from './received-product-container-popup.service';
import {ReceivedProductContainerService} from './received-product-container.service';

@Component({
    selector: 'jhi-received-product-container-delete-dialog',
    templateUrl: './received-product-container-delete-dialog.component.html'
})
export class ReceivedProductContainerDeleteDialogComponent {

    receivedProductContainer: ReceivedProductContainer;

    constructor(
        private receivedProductContainerService: ReceivedProductContainerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.receivedProductContainerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'receivedProductContainerListModification',
                content: 'Deleted an receivedProductContainer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-received-product-container-delete-popup',
    template: ''
})
export class ReceivedProductContainerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private receivedProductContainerPopupService: ReceivedProductContainerPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.receivedProductContainerPopupService
                .open(ReceivedProductContainerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
