import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {WaterMethanolMixer} from './water-methanol-mixer.model';
import {WaterMethanolMixerPopupService} from './water-methanol-mixer-popup.service';
import {WaterMethanolMixerService} from './water-methanol-mixer.service';
import {OilTank, OilTankService} from '../oil-tank/index';

@Component({
    selector: 'jhi-water-methanol-mixer-dialog',
    templateUrl: './water-methanol-mixer-dialog.component.html'
})
export class WaterMethanolMixerDialogComponent implements OnInit {

    waterMethanolMixer: WaterMethanolMixer;
    isSaving: boolean;
    isView: boolean;

    oiltanks: OilTank[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private waterMethanolMixerService: WaterMethanolMixerService,
                private oilTankService: OilTankService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isView = View.isView;
        this.isSaving = false;
        this.oilTankService.query()
            .subscribe((res: HttpResponse<OilTank[]>) => {
                this.oiltanks = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.waterMethanolMixer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.waterMethanolMixerService.update(this.waterMethanolMixer));
        } else {
            this.subscribeToSaveResponse(
                this.waterMethanolMixerService.create(this.waterMethanolMixer));
        }
    }

    trackOilTankById(index: number, item: OilTank) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WaterMethanolMixer>>) {
        result.subscribe((res: HttpResponse<WaterMethanolMixer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WaterMethanolMixer) {
        this.eventManager.broadcast({name: 'waterMethanolMixerListModification', content: 'OK'});
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
    selector: 'jhi-water-methanol-mixer-popup',
    template: ''
})
export class WaterMethanolMixerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private waterMethanolMixerPopupService: WaterMethanolMixerPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];

            if (params['id']) {
                this.waterMethanolMixerPopupService
                    .open(WaterMethanolMixerDialogComponent as Component, params['id']);
            } else {
                this.waterMethanolMixerPopupService
                    .open(WaterMethanolMixerDialogComponent as Component);
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
