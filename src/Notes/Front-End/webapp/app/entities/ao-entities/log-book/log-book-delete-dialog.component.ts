import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {LogBook} from './log-book.model';
import {LogBookPopupService} from './log-book-popup.service';
import {LogBookService} from './log-book.service';

@Component({
    selector: 'jhi-log-book-delete-dialog',
    templateUrl: './log-book-delete-dialog.component.html'
})
export class LogBookDeleteDialogComponent {

    logBook: LogBook;

    constructor(
        private logBookService: LogBookService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.logBookService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'logBookListModification',
                content: 'Deleted an logBook'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-log-book-delete-popup',
    template: ''
})
export class LogBookDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logBookPopupService: LogBookPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.logBookPopupService
                .open(LogBookDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
