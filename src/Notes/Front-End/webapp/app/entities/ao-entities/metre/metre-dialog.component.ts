import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Metre} from './metre.model';
import {MetrePopupService} from './metre-popup.service';
import {MetreService} from './metre.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {OilTank, OilTankService} from '../oil-tank';

@Component({
    selector: 'jhi-metre-dialog',
    templateUrl: './metre-dialog.component.html'
})
export class MetreDialogComponent implements OnInit {

    metre: Metre;
    isSaving: boolean;
    isView: boolean;
    disableSave: boolean;
    disableActiveMetre: boolean;
    oilTankId: number;
    oilTank: OilTank;

    oiltanks: OilTank[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private metreService: MetreService,
                private oilTankService: OilTankService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.oilTankId = UsefulId.oilTankId;
        this.disableActiveMetre = true;
        this.isView = View.isView;
        this.isSaving = false;
        this.oilTankService.query()
            .subscribe((res: HttpResponse<OilTank[]>) => {
                this.oiltanks = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        if (!this.isView) {
            this.handleStatusActiveMetre();
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    handleStatusActiveMetre() {
        // this.metreService.getMetreActiveStatus(this.oilTankId)
        //     .subscribe((res: boolean) => {
        //         console.log(!res);
        //         this.disableActiveMetre = !res;
        //     });
        this.disableActiveMetre = false;
    }

    save() {
        this.isSaving = true;
        if (this.metre.id !== undefined) {
            if (this.metre.active === false || this.disableActiveMetre === false) {
                this.subscribeToSaveResponse(
                    this.metreService.update(this.metre));
            }
        } else {
            if (this.metre.active === false || this.disableActiveMetre === false) {
                this.subscribeToSaveResponse(
                    this.metreService.create(this.metre));
            }
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    onChangeValue(data) {
        console.log(data.target.value);
        if ((this.metre.maxMetre && this.metre.amount) || this.metre.maxMetre === 0) {
            this.disableSave = this.metre.maxMetre <= this.metre.amount;
        } else {
            this.disableSave = false;
        }
        console.log(this.disableSave);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Metre>>) {
        result.subscribe((res: HttpResponse<Metre>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Metre) {
        this.eventManager.broadcast({name: 'metreListModification', content: 'OK'});
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
    selector: 'jhi-metre-popup',
    template: ''
})
export class MetrePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private metrePopupService: MetrePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                if (params['oilTankId']) {
                    UsefulId.oilTankId = params['oilTankId'];
                }
                this.metrePopupService
                    .open(MetreDialogComponent as Component, params['id']);
            } else if (params['oilTankId']) {
                UsefulId.oilTankId = params['oilTankId'];
                this.metrePopupService
                    .open(MetreDialogComponent as Component, null, params['oilTankId']);
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

class UsefulId {
    static oilTankId: number;
}
