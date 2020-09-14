import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {VoucherTemplate} from './voucher-template.model';
import {VoucherTemplatePopupService} from './voucher-template-popup.service';
import {VoucherTemplateService} from './voucher-template.service';
import {VoucherType} from '../voucher-type/voucher-type.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BaseQueryService} from '../base-query';

@Component({
    selector: 'jhi-voucher-template-execute-query-dialog',
    templateUrl: './voucher-template-execute-query-dialog.component.html'
})
export class VoucherTemplateExecuteQueryDialogComponent {

    voucherTemplate: VoucherTemplate;
    isSaving: boolean;
    isView: boolean;

    locationId: any;
    customerId: any;
    date: any;
    startDate: any;
    finishDate: any;

    parameterDate = true;
    parameterStartDate = true;
    parameterFinishDate = true;
    parameterLocation = true;
    parameterCustomer = true;

    constructor(
        private voucherTemplateService: VoucherTemplateService,
        private baseQueryService: BaseQueryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;

        // this.baseQueryService.find(this.voucherTemplate.voucherMappings)

    }

    // baseQueryChange() {
    //     let baseQuery = this.baseQueries.find(value => value.id === this.voucherMapping.baseQueryId);
    //     if (baseQuery && this.voucherMapping) {
    //         this.voucherMapping.baseQueryTitle = baseQuery.title;
    //     }
    //     if (baseQuery) {
    //         if (baseQuery.parameters && baseQuery.parameters.length) {
    //             this.parameterDate = baseQuery.parameters.includes('DATE');
    //             this.parameterStartDate = baseQuery.parameters.includes('START_DATE');
    //             this.parameterFinishDate = baseQuery.parameters.includes('FINISH_DATE');
    //             this.parameterLocation = baseQuery.parameters.includes('LOCATION');
    //         } else {
    //             this.parameterDate =
    //                 this.parameterStartDate =
    //                     this.parameterFinishDate =
    //                         this.parameterLocation = false;
    //         }
    //     }
    // }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    /*confirmDelete(id: number) {
        this.isSaving = true;
        this.voucherTemplateService.executeQuery(id,this.dateTime,this.locationId).subscribe((response) => {
            this.isSaving = true;
            this.eventManager.broadcast({
                name: 'voucherTemplateListModification',
                content: 'Deleted an voucherTemplate'
            });
            this.activeModal.dismiss(true);
        });
    }*/

    confirmDelete(id: number) {
        this.isSaving = true;
        this.subscribeToSaveResponse(
            this.voucherTemplateService.executeQuery(id, this.date, this.locationId, this.customerId , this.startDate, this.finishDate,null));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherType>>) {
        result.subscribe((res: HttpResponse<VoucherType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherType) {
        this.eventManager.broadcast({name: 'voucherTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-voucher-template-execute-query-popup',
    template: ''
})
export class VoucherTemplateExecuteQueryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voucherTemplatePopupService: VoucherTemplatePopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voucherTemplatePopupService
                .open(VoucherTemplateExecuteQueryDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
