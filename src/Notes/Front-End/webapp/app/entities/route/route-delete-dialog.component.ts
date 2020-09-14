import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Route } from './route.model';
import { RoutePopupService } from './route-popup.service';
import { RouteService } from './route.service';

@Component({
    selector: 'jhi-route-delete-dialog',
    templateUrl: './route-delete-dialog.component.html'
})
export class RouteDeleteDialogComponent {

    route: Route;

    constructor(
        private routeService: RouteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.routeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'routeListModification',
                content: 'Deleted an route'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-route-delete-popup',
    template: ''
})
export class RouteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private routePopupService: RoutePopupService
) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.routePopupService
                .open(RouteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
