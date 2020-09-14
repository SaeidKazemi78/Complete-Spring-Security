import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ChangeFilterElement} from './change-filter-element.model';
import {ChangeFilterElementPopupService} from './change-filter-element-popup.service';
import {ChangeFilterElementService} from './change-filter-element.service';

@Component({
    selector: 'jhi-change-filter-element-delete-dialog',
    templateUrl: './change-filter-element-delete-dialog.component.html'
})
export class ChangeFilterElementDeleteDialogComponent {

    changeFilterElement: ChangeFilterElement;

    constructor(
        private changeFilterElementService: ChangeFilterElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.changeFilterElementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'changeFilterElementListModification',
                content: 'Deleted an changeFilterElement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-change-filter-element-delete-popup',
    template: ''
})
export class ChangeFilterElementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changeFilterElementPopupService: ChangeFilterElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.changeFilterElementPopupService
                .open(ChangeFilterElementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
