import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import {ActionLog, ActionLogMapping} from './action-log.model';
import {ActionLogPopupService} from './action-log-popup.service';
import {ActionLogService} from './action-log.service';
import {Principal, UserType} from 'app/shared';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'jhi-action-log-mapping-dialog',
    templateUrl: './action-log-mapping-dialog.component.html'
})
export class ActionLogMappingDialogComponent implements OnInit {

    actionLogMapping: ActionLogMapping = new ActionLogMapping();
    actionLog: ActionLog;
    text: any;
    userTypes: any[];
    UserType = UserType;
    refuelCenters: any[];

    constructor(public activeModal: NgbActiveModal,
                private dataUtils: JhiDataUtils,
                private jhiAlertService: JhiAlertService,
                private actionLogService: ActionLogService,
                private principal: Principal,
                private elementRef: ElementRef,
                private eventManager: JhiEventManager,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        this.principal.identity().then(value => {
            this.userTypes = value.userTypes;
        });

        this.actionLogMapping.templateUrl = this.actionLogMapping.url = this.actionLog.url;
        this.actionLogMapping.method =  this.actionLog.method;
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
        this.actionLogService.createActionLogMapping(this.actionLogMapping).subscribe(actionLogMapping => {
            this.onSaveSuccess(actionLogMapping);
        }, error => this.onSaveError(error));
    }

    private onSaveSuccess(result: ActionLogMapping) {
        this.eventManager.broadcast({name: 'actionLogListModification', content: 'OK'});
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
                private actionLogPopupService: ActionLogPopupService) {
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
