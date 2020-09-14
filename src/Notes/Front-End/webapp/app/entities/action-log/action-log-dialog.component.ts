import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import {ActionLog} from './action-log.model';
import {ActionLogPopupService} from './action-log-popup.service';
import {ActionLogService} from './action-log.service';
import {Principal, UserType} from 'app/shared';
import {TranslateService} from '@ngx-translate/core';
import {saveAs} from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-action-log-dialog',
    templateUrl: './action-log-dialog.component.html'
})
export class ActionLogDialogComponent implements OnInit {

    actionLog: ActionLog;
    requestBody: any;
    isRequest: boolean;
    text: any;
    userTypes: any[];
    userTypesOptions: any[];
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
        this.isRequest = View.isRequest;
        this.principal.identity().then(value => {
            this.userTypes = value.userTypes;
        });
        if (this.actionLog.requestBody) {
            this.requestBody = JSON.parse(this.actionLog.requestBody);
        } else {
            this.requestBody = {};
        }
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

    downloadResponseBody(id: number) {
        this.actionLogService.downloadFile(id).subscribe(res => {
            saveAs(res.body, res.headers.get('_NAME'));
        });
    }
}

@Component({
    selector: 'jhi-action-log-popup',
    template: ''
})
export class ActionLogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private actionLogPopupService: ActionLogPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            View.isRequest = params['request'] === 'request';

            if (params['id']) {
                this.actionLogPopupService
                    .open(ActionLogDialogComponent as Component, params['id']);
            } else {
                this.actionLogPopupService
                    .open(ActionLogDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        // this.routeSub.unsubscribe();
    }
}

class View {
    static isRequest: boolean;
}
