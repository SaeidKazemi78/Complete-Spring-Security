import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {LastChangeDateElement} from './last-change-date-element.model';
import {LastChangeDateElementPopupService} from './last-change-date-element-popup.service';
import {LastChangeDateElementService} from './last-change-date-element.service';

@Component({
    selector: 'jhi-last-change-date-element-delete-dialog',
    templateUrl: './last-change-date-element-delete-dialog.component.html'
})
export class LastChangeDateElementDeleteDialogComponent {

    lastChangeDateElement: LastChangeDateElement;

    constructor(
        private lastChangeDateElementService: LastChangeDateElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lastChangeDateElementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'lastChangeDateElementListModification',
                content: 'Deleted an lastChangeDateElement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-last-change-date-element-delete-popup',
    template: ''
})
export class LastChangeDateElementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lastChangeDateElementPopupService: LastChangeDateElementPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.lastChangeDateElementPopupService
                .open(LastChangeDateElementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
