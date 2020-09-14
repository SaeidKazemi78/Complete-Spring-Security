import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {ShiftWorkPopupService} from './shift-work-popup.service';
import {ShiftWorkService} from './shift-work.service';
import {Location, LocationService} from 'app/entities/location';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-shift-work-open-close-dialog',
    templateUrl: './shift-work-open-close-dialog.component.html'
})
export class ShiftWorkOpenCloseDialogComponent implements OnInit {

    mode: string;
    shiftType: string;
    locationId: number;
    refuelCenterId: number;
    id: number;
    tomorrow;
    showTomorrow: boolean;
    isBoundary: boolean;
    showButton: boolean;
    date: string;

    constructor(
        private shiftWorkService: ShiftWorkService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private locationService: LocationService,
        private route: ActivatedRoute
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirm() {
        if (this.mode === 'open') {
            if (this.refuelCenterId) {
                this.shiftWorkService.openByRefuelCenter(this.refuelCenterId, this.shiftType)
                    .subscribe(response => {
                        this.eventManager.broadcast({
                            name: 'shiftWorkListModification',
                            content: 'Deleted an shiftWork'
                        });
                        this.activeModal.dismiss(true);
                    });
            } else if (this.id) {
                this.shiftWorkService.open(this.id)
                    .subscribe(response => {
                        this.eventManager.broadcast({
                            name: 'shiftWorkListModification',
                            content: 'Deleted an shiftWork'
                        });
                        this.activeModal.dismiss(true);
                    });
            } else {
                this.shiftWorkService.openByLocation(this.locationId, !!this.tomorrow)
                    .subscribe(response => {
                        this.eventManager.broadcast({
                            name: 'shiftWorkListModification',
                            content: 'Deleted an shiftWork'
                        });
                        this.activeModal.dismiss(true);
                    });
            }
        } else {
            if (this.id) {
                this.shiftWorkService.close(this.id)
                    .subscribe(response => {
                        this.eventManager.broadcast({
                            name: 'shiftWorkListModification',
                            content: 'Deleted an shiftWork'
                        });
                        this.activeModal.dismiss(true);
                    }, error => {
                        this.allowToClose(error.error);
                    });
            } else if (this.locationId) {
                this.shiftWorkService.closeByLocation(this.locationId)
                    .subscribe(response => {
                        this.eventManager.broadcast({
                            name: 'shiftWorkListModification',
                            content: 'Deleted an shiftWork'
                        });
                        this.activeModal.dismiss(true);
                    }, error => {
                        this.allowToClose(error.error);
                    });
            } else if (this.refuelCenterId) {
                this.shiftWorkService.closeByRefuelCenter(this.refuelCenterId, this.shiftType)
                    .subscribe(response => {
                        this.eventManager.broadcast({
                            name: 'shiftWorkListModification',
                            content: 'Deleted an shiftWork'
                        });
                        this.activeModal.dismiss(true);
                    });
            }
        }
        /*(this.mode === 'open' ? (this.id ?
            this.shiftWorkService.open(this.id) :
            this.shiftWorkService.openByLocation(this.locationId, !!this.tomorrow)) :
            (this.id ?
                this.shiftWorkService.close(this.id) :
                this.shiftWorkService.closeByLocation(this.locationId)))
            .subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'shiftWorkListModification',
                    content: 'Deleted an shiftWork'
                });
                this.activeModal.dismiss(true);
            });*/
    }

    allowToClose(error) {
        if (this.isBoundary && error) {
            if (error.message === 'error.transitOrder.draft.exist') {
                this.showButton = true;
                this.date =  error.params['param0'];
            }
        }
    }

    ngOnInit(): void {
        this.showTomorrow = false;
        this.isBoundary = false;
        this.showButton = false;
        if (this.locationId) {
            this.locationService.find(this.locationId)
                .subscribe((res: HttpResponse<Location>) => {
                    if (res.body.level === 2) {
                        this.showTomorrow = true;
                    }
                    if (res.body.level === 3) {
                        this.isBoundary = true;
                    }
                });
        }

    }

    gotoOrder() {
        this.activeModal.dismiss('cancel');
        this.eventManager.broadcast({name: 'gotoBoundaryOrder', content: this.date});
    }
}

@Component({
    selector: 'jhi-shift-work-delete-popup',
    template: ''
})
export class ShiftWorkOpenClosePopupDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shiftWorkPopupService: ShiftWorkPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.shiftWorkPopupService
                .open(ShiftWorkOpenCloseDialogComponent as Component, params['id'], params['locationId'], params['mode'], params['type']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
