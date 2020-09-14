import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import { ActionLogMapping} from './action-log-mapping.model';
import {ActionLogMappingPopupService} from './action-log-mapping-popup.service';
import {ActionLogMappingService} from './action-log-mapping.service';
import {Principal, UserType} from 'app/shared';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-action-log-mapping-dialog',
    templateUrl: './action-log-mapping-dialog.component.html'
})
export class ActionLogMappingDialogComponent implements OnInit {

    actionLogMapping: ActionLogMapping = new ActionLogMapping();
    text: any;
    userTypes: any[];
    UserType = UserType;
    refuelCenters: any[];

    constructor(public activeModal: NgbActiveModal,
                private dataUtils: JhiDataUtils,
                private jhiAlertService: JhiAlertService,
                private actionLogService: ActionLogMappingService,
                private principal: Principal,
                private elementRef: ElementRef,
                private eventManager: JhiEventManager,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        this.principal.identity().then(value => {
            this.userTypes = value.userTypes;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    trackLocationById(index: number, item: Location) {
        // return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    save() {
        this.actionLogService.update(this.actionLogMapping).subscribe(actionLogMapping => {
            this.onSaveSuccess(actionLogMapping);
        }, error => this.onSaveError(error));
    }

    private onSaveSuccess(result: ActionLogMapping) {
        this.eventManager.broadcast({name: 'actionLogMappingListModification', content: 'OK'});
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-action-log-mapping-popup',
    template: ''
})
export class ActionLogMappingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private actionLogPopupService: ActionLogMappingPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {

            if (params['id']) {
                this.actionLogPopupService
                    .open(ActionLogMappingDialogComponent as Component, params['id']);
            } else {
                this.actionLogPopupService
                    .open(ActionLogMappingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        // this.routeSub.unsubscribe();
    }
}
