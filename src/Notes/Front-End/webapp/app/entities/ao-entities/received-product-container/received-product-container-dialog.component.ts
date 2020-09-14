import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ReceivedProductContainer} from './received-product-container.model';
import {ReceivedProductContainerPopupService} from './received-product-container-popup.service';
import {ReceivedProductContainerService} from './received-product-container.service';
import {OilTankContainer, OilTankContainerService} from '../oil-tank-container/index';
import {DayDepotContainer, DayDepotContainerService} from '../day-depot-container/index';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';

@Component({
    selector: 'jhi-received-product-container-dialog',
    templateUrl: './received-product-container-dialog.component.html'
})
export class ReceivedProductContainerDialogComponent implements OnInit {

    receivedProductContainer: ReceivedProductContainer;
    isSaving: boolean;
    isView: boolean;

    oiltankcontainers: OilTankContainer[];

    daydepotcontainers: DayDepotContainer[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private receivedProductContainerService: ReceivedProductContainerService,
                private oilTankContainerService: OilTankContainerService,
                private hotKeyService: HotkeyService,
                private dayDepotContainerService: DayDepotContainerService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotKeyService.add('enter', null, this.editForm, false);
        this.isView = View.isView;
        this.isSaving = false;
        this.oilTankContainerService.query()
            .subscribe((res: HttpResponse<OilTankContainer[]>) => {
                this.oiltankcontainers = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.receivedProductContainer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.receivedProductContainerService.update(this.receivedProductContainer));
        } else {
            this.subscribeToSaveResponse(
                this.receivedProductContainerService.create(this.receivedProductContainer));
        }
    }

    trackOilTankContainerById(index: number, item: OilTankContainer) {
        return item.id;
    }

    trackDayDepotContainerById(index: number, item: DayDepotContainer) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReceivedProductContainer>>) {
        result.subscribe((res: HttpResponse<ReceivedProductContainer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReceivedProductContainer) {
        this.eventManager.broadcast({name: 'receivedProductContainerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-received-product-container-popup',
    template: ''
})
export class ReceivedProductContainerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private receivedProductContainerPopupService: ReceivedProductContainerPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.receivedProductContainerPopupService
                    .open(ReceivedProductContainerDialogComponent as Component, params['id']);
            } else if (params['dayDepotContainerId']) {
                this.receivedProductContainerPopupService
                    .open(ReceivedProductContainerDialogComponent as Component, null, params['dayDepotContainerId']);
            } else {
                console.log('not be');
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

class View {
    static isView: boolean;
}
