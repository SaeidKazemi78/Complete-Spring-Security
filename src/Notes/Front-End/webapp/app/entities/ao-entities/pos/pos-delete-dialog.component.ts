import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Pos} from './pos.model';
import {PosPopupService} from './pos-popup.service';
import {PosService} from './pos.service';

@Component({
    selector: 'jhi-pos-delete-dialog',
    templateUrl: './pos-delete-dialog.component.html'
})
export class PosDeleteDialogComponent {

    pos: Pos;

    constructor(
        private posService: PosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.posService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'posListModification',
                content: 'Deleted an pos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pos-delete-popup',
    template: ''
})
export class PosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private posPopupService: PosPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.posPopupService
                .open(PosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
