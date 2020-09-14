import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {MainDayDepot} from './main-day-depot.model';
import {MainDayDepotPopupService} from './main-day-depot-popup.service';
import {MainDayDepotService} from './main-day-depot.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {HotkeyService} from '../../../shared/hotkey/HotkeyService';
import {RefuelCenter, RefuelCenterService} from '../refuel-center';
import {CarService} from '../../car';
import {PersonService} from '../../person';

@Component({
    selector: 'jhi-main-day-depot-dialog',
    templateUrl: './main-day-depot-dialog.component.html'
})
export class MainDayDepotDialogComponent implements OnInit {
    @ViewChild('myform') myform;

    mainDayDepot: MainDayDepot;
    isSaving: boolean;
    isView: boolean;
    isEdit: boolean;

    refuelCenters: RefuelCenter[];
    @ViewChild('editForm') editForm: NgForm;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private mainDayDepotService: MainDayDepotService,
                private refuelCenterService: RefuelCenterService,
                private hotkeyService: HotkeyService,
                private carService: CarService,
                private personService: PersonService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.hotkeyService.add('enter', null, this.editForm, false);
        this.isView = View.isView;
        this.isEdit = this.mainDayDepot.id && !this.isView;
        this.isSaving = false;
        this.refuelCenterService.queryByNational(true)
            .subscribe((res: HttpResponse<RefuelCenter[]>) => {
                this.refuelCenters = res.body;
                if (this.refuelCenters.length === 1) {
                    this.mainDayDepot.refuelCenterId = this.refuelCenters[0].id;
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mainDayDepot.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mainDayDepotService.update(this.mainDayDepot));
        } else {
            this.subscribeToSaveResponse(
                this.mainDayDepotService.create(this.mainDayDepot));
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MainDayDepot>>) {
        result.subscribe((res: HttpResponse<MainDayDepot>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MainDayDepot) {
        this.eventManager.broadcast({name: 'mainDayDepotListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onChangeCarFile(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];

            this.carService.uploadFile(file)
                .subscribe((res: HttpResponse<string>) => {
                },error => {
                    console.log(error);
                });
        }
        this.myform.nativeElement.reset();
    }

    onChangePersonFile(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];

            this.personService.uploadFile(file)
                .subscribe((res: HttpResponse<string>) => {
                },error => {
                    console.log(error);
                });
        }
        this.myform.nativeElement.reset();
    }
}

@Component({
    selector: 'jhi-main-day-depot-popup',
    template: ''
})
export class MainDayDepotPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private mainDayDepotPopupService: MainDayDepotPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.mainDayDepotPopupService
                    .open(MainDayDepotDialogComponent as Component, params['id']);
            } else {
                this.mainDayDepotPopupService
                    .open(MainDayDepotDialogComponent as Component);
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
