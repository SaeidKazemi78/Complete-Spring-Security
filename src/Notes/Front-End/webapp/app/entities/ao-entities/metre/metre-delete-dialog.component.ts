import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Metre} from './metre.model';
import {MetrePopupService} from './metre-popup.service';
import {MetreService} from './metre.service';

@Component({
    selector: 'jhi-metre-delete-dialog',
    templateUrl: './metre-delete-dialog.component.html'
})
export class MetreDeleteDialogComponent {

    metre: Metre;

    constructor(
        private metreService: MetreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.metreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'metreListModification',
                content: 'Deleted an metre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-metre-delete-popup',
    template: ''
})
export class MetreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private metrePopupService: MetrePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.metrePopupService
                .open(MetreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
