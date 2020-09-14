import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Container } from './container.model';
import { ContainerPopupService } from './container-popup.service';
import { ContainerService } from './container.service';

@Component({
    selector: 'jhi-container-delete-dialog',
    templateUrl: './container-delete-dialog.component.html'
})
export class ContainerDeleteDialogComponent {

    container: Container;

    constructor(
        private containerService: ContainerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.containerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'containerListModification',
                content: 'Deleted an container'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-container-delete-popup',
    template: ''
})
export class ContainerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private containerPopupService: ContainerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.containerPopupService
                .open(ContainerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
