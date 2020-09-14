import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {VoucherTemplate} from './voucher-template.model';
import {VoucherTemplatePopupService} from './voucher-template-popup.service';
import {VoucherTemplateService} from './voucher-template.service';
import {VoucherType, VoucherTypeService} from '../voucher-type';
import {VoucherMapping} from '../voucher-mapping/voucher-mapping.model';
import {BaseQuery, BaseQueryService} from '../base-query/.';
import {TranslateService} from '@ngx-translate/core';
import {AccountNumberFormat, AccountNumberFormatService} from '../account-number-format';
import {Principal} from '../../shared';
import {ProfileService} from '../../layouts/profiles/profile.service';
import {RefuelCenter, RefuelCenterService} from '../ao-entities/refuel-center';

// import { QueryBuilderConfig } from 'angular2-query-builder';

@Component({
    selector: 'jhi-voucher-template-dialog',
    templateUrl: './voucher-template-dialog.component.html'
})
export class VoucherTemplateDialogComponent implements OnInit {
    breadcrumbItems: any[];
    voucherTemplate: VoucherTemplate;
    isSaving: boolean;
    isView: boolean;
    voucherTypes: VoucherType[];
    voucherTemplates: VoucherTemplate[];
    voucherMapping: VoucherMapping;
    voucherMappingCreate: Boolean;
    voucherMappingEdit: Boolean;
    baseQueriesAll: BaseQuery[];
    baseQueries: BaseQuery[];
    config: any;
    query: any;
    voucherMappingCreateExtraMap: Boolean;
    voucherMappingCreateReferenceMap: Boolean;
    extraMap: any;
    referenceMap: any;
    extraMapTemp: any;
    referenceMapTemp: any;
    voucherMappingCreateSpecialMap: Boolean;
    specialMap: any;
    specialMapTemp: any;
    voucherMappingCreateCreditMap: Boolean;
    creditMap: any;
    creditMapTemp: any;
    voucherMappingCreateDebitMap: Boolean;
    debitMap: any;
    debitMapTemp: any;
    voucherMappingCreateDescriptionMap: Boolean;
    descriptionMap: any;
    descriptionMapTemp: any;
    voucherMappingCreateAccountNoMap: Boolean;
    accountNoMap: any;
    accountNoMapTemp: any;
    voucherMappingCreateSuffixMap: Boolean;
    suffixMap: any;
    suffixMapTemp: any;
    voucherMappingCreateKeyMap: Boolean;
    keyMap: any;
    keyMapTemp: any;
    cols: any;
    mapCols: any;
    baseQueryResult: any;
    mapQueryResult: any;
    resultList: any;
    mapResultList: any;
    baseQueryFields: any;
    mapQueryFields: any;
    locationId: any;
    customerId: any;
    date: any;
    startDate: any;
    finishDate: any;
    parameterDate: boolean;
    parameterStartDate: boolean;
    parameterFinishDate: boolean;
    parameterLocation: boolean;
    parameterCustomer: boolean;
    baseCategory: string;
    refuelCenters: RefuelCenter[];
    includeDocBuild: boolean;

    accountNumberFormats: AccountNumberFormat[];
    userTypes = [];
    docBuildAfterOperationsTypes = [];
    docBuildAgentTypes = [];
    docBuildBeforeOperationsTypes = [];
    class;
    View;

    constructor(private jhiAlertService: JhiAlertService,
                private translateService: TranslateService,
                private router: Router,
                private refuelCenterService: RefuelCenterService,
                private voucherTemplateService: VoucherTemplateService,
                private baseQueryService: BaseQueryService,
                private principal: Principal,
                private voucherTypeService: VoucherTypeService,
                private accountNumberFormatService: AccountNumberFormatService,
                private eventManager: JhiEventManager,
                private route: ActivatedRoute,
                private voucherTemplatePopupService: VoucherTemplatePopupService,
                private profileService: ProfileService) {
    }

    trackBaseQueryById(index: number, item: VoucherType) {
        return item.id;
    }

    loadAll() {

        this.refuelCenterService.query({}).subscribe((res: HttpResponse<RefuelCenter[]>) => {
            this.refuelCenters = res.body;
        });
    }

    baseQueryChange() {
        const baseQuery = this.baseQueries.find((value) => value.id === this.voucherMapping.baseQueryId);
        if (baseQuery && this.voucherMapping) {
            this.voucherMapping.baseQueryTitle = baseQuery.title;
        }
        if (baseQuery) {
            if (baseQuery.queryCategory) {
                this.baseCategory = baseQuery.queryCategory;
            } else {
                this.baseCategory = '';
            }

            if (baseQuery.parameters && baseQuery.parameters.length) {
                this.parameterDate = baseQuery.parameters.includes('DATE');
                this.parameterStartDate = baseQuery.parameters.includes('START_DATE');
                this.parameterFinishDate = baseQuery.parameters.includes('FINISH_DATE');
                this.parameterLocation = baseQuery.parameters.includes('LOCATION');
                this.parameterCustomer = baseQuery.parameters.includes('CUSTOMER');

            } else {
                this.parameterDate =
                    this.parameterStartDate =
                        this.parameterFinishDate =
                            this.parameterLocation =
                                this.parameterCustomer = false;
            }
        }
    }

    runQuery() {
        this.baseQueryService.resultList(this.voucherMapping.baseQueryId, this.date, this.locationId, this.startDate, this.finishDate, this.customerId).subscribe((baseQueryResult) => {
            this.baseQueryResult = baseQueryResult.body;
            this.resultList = [];
            if (!this.baseQueryResult.resultList) {
                return;
            }
            this.baseQueryResult.resultList.forEach((value) => {
                let column: any;
                column = {};
                for (let i = 0; i < this.baseQueryResult.header.length; i++) {
                    column[this.baseQueryResult.header[i]] = value[i];
                }
                this.resultList.push(column);

            });

            this.cols = [];
            this.config = {};
            this.config.fields = {};
            this.baseQueryFields = [];
            this.baseQueryResult.header.forEach((value) => {
                let header: any;
                this.baseQueryFields.push(value);
                header = {};
                header.field = value;
                this.config.fields[value] =
                    {
                        name: value,
                        type: 'string',
                        operators: [
                            '=',
                            '<>',
                            '<=',
                            '>=',
                            '>',
                            '<',
                            'like',
                            'is null',
                            'is not null'
                        ]
                    };
                header.header = value;
                this.cols.push(header);
            });
            this.cols = this.cols.reverse();
        });
        this.accountNumberFormatService.query().subscribe((value) => this.accountNumberFormats = value.body);
    }

    newVoucherMapping() {
        this.voucherMapping = new VoucherMapping();
        this.voucherMapping.extraMap = [];
        this.voucherMapping.referenceMap = [];
        this.voucherMapping.specialMap = [];
        this.voucherMapping.creditMap = [];
        this.voucherMapping.debitMap = [];
        this.voucherMapping.descriptionMap = [];
        this.voucherMapping.accountNoMap = [];
        this.voucherMapping.suffixMap = [];
        this.voucherMapping.keyMap = [];
        this.voucherMapping.baseQueryId = null;
        this.locationId = null;
        this.customerId = null;
        this.date = null;
        this.startDate = null;
        this.finishDate = null;
        this.voucherMappingCreate = true;
        this.resultList = null;
        this.init();
    }

    addVoucherMapping() {

        if (!this.voucherTemplate.voucherMappings) {
            this.voucherTemplate.voucherMappings = [];
        }
        // const voucherMapping = new VoucherMapping();
        this.voucherMapping.extraMap = JSON.stringify(this.voucherMapping.extraMap);
        this.voucherMapping.referenceMap = JSON.stringify(this.voucherMapping.referenceMap);
        this.voucherMapping.specialMap = JSON.stringify(this.voucherMapping.specialMap);
        this.voucherMapping.creditMap = JSON.stringify(this.voucherMapping.creditMap);
        this.voucherMapping.debitMap = JSON.stringify(this.voucherMapping.debitMap);
        this.voucherMapping.descriptionMap = JSON.stringify(this.voucherMapping.descriptionMap);
        this.voucherMapping.accountNoMap = JSON.stringify(this.voucherMapping.accountNoMap);
        this.voucherMapping.suffixMap = JSON.stringify(this.voucherMapping.suffixMap);
        this.voucherMapping.keyMap = JSON.stringify(this.voucherMapping.keyMap);

        const baseEntity = this.voucherTemplate.voucherMappings.find((value) => value === this.voucherMapping);
        console.log(baseEntity);

        if (this.voucherMappingCreate) {
            this.voucherTemplate.voucherMappings.push(this.voucherMapping);
        }

        this.voucherMappingCreate = this.voucherMappingEdit = false;

    }

    removeVoucherMapping(item) {
        this.voucherTemplate.voucherMappings.splice(
            this.voucherTemplate.voucherMappings
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMapping(item) {
        this.voucherMapping = item;
        this.voucherMapping.extraMap = JSON.parse(item.extraMap);
        this.voucherMapping.referenceMap = JSON.parse(item.referenceMap);
        this.voucherMapping.specialMap = JSON.parse(item.specialMap);
        this.voucherMapping.creditMap = JSON.parse(item.creditMap);
        this.voucherMapping.debitMap = JSON.parse(item.debitMap);
        this.voucherMapping.descriptionMap = JSON.parse(item.descriptionMap);
        this.voucherMapping.accountNoMap = JSON.parse(item.accountNoMap);
        this.voucherMapping.suffixMap = JSON.parse(item.suffixMap);
        this.voucherMapping.keyMap = JSON.parse(item.keyMap);
        this.voucherMapping.baseQueryId = item.baseQueryId;
        this.voucherMapping.rowNo = item.rowNo;
        this.voucherMapping.voucherTemplateId = item.voucherTemplateId;
        this.voucherMapping.id = item.id;
        this.resultList = null;
        this.locationId = null;
        this.customerId = null;
        this.date = null;
        this.startDate = null;
        this.finishDate = null;
        this.voucherMappingEdit = true;
        this.init();
        this.baseQueryChange();
    }

    cancelVoucherMapping() {
        this.voucherMappingCreate = this.voucherMappingEdit = false;
    }

    init() {
        this.config = null;
        this.resultList = null;
        this.mapResultList = null;
        this.mapCols = null;
        this.baseQueryFields = null;
    }

    newVoucherMappingExtraMap() {
        this.extraMap = {};
        this.extraMap.value = '';
        this.extraMap.name = '';
        this.extraMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateExtraMap = true;
    }

    newVoucherMappingReferenceMap() {
        this.referenceMap = {};
        this.referenceMap.value = '';
        this.referenceMap.name = '';
        this.referenceMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateReferenceMap = true;
    }

    addVoucherMappingExtraMap() {
        if (!this.voucherMapping.extraMap) {
            this.voucherMapping.extraMap = [];
        }
        this.voucherMapping.extraMap.push(this.extraMap);
        this.extraMapTemp = null;
        this.voucherMappingCreateExtraMap = false;
    }

    addVoucherMappingReferenceMap() {
        if (!this.voucherMapping.referenceMap) {
            this.voucherMapping.referenceMap = [];
        }
        this.voucherMapping.referenceMap.push(this.referenceMap);
        this.referenceMapTemp = null;
        this.voucherMappingCreateReferenceMap = false;
    }

    removeVoucherMappingExtraMap(item) {
        this.voucherMapping.extraMap.splice(
            this.voucherMapping.extraMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    removeVoucherMappingReferenceMap(item) {
        this.voucherMapping.referenceMap.splice(
            this.voucherMapping.referenceMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMappingExtraMap(item) {
        this.extraMap = item;
        this.extraMapTemp = item;
        this.removeVoucherMappingExtraMap(item);
        this.voucherMappingCreateExtraMap = true;
    }

    updateVoucherMappingReferenceMap(item) {
        this.referenceMap = item;
        this.referenceMapTemp = item;
        this.removeVoucherMappingReferenceMap(item);
        this.voucherMappingCreateReferenceMap = true;
    }

    cancelVoucherMappingExtraMap() {
        if (this.extraMapTemp != null) {
            this.voucherMapping.extraMap.push(this.extraMapTemp);
        }
        this.voucherMappingCreateExtraMap = false;
    }

    cancelVoucherMappingReferenceMap() {
        if (this.referenceMapTemp != null) {
            this.voucherMapping.referenceMap.push(this.referenceMapTemp);
        }
        this.voucherMappingCreateReferenceMap = false;
    }

    newVoucherMappingSpecialMap() {
        this.specialMap = {};
        this.specialMap.value = '';
        this.specialMap.name = '';
        this.specialMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateSpecialMap = true;
    }

    addVoucherMappingSpecialMap() {
        if (!this.voucherMapping.specialMap) {
            this.voucherMapping.specialMap = [];
        }
        this.voucherMapping.specialMap.push(this.specialMap);
        this.specialMapTemp = null;
        this.voucherMappingCreateSpecialMap = false;
    }

    removeVoucherMappingSpecialMap(item) {
        this.voucherMapping.specialMap.splice(
            this.voucherMapping.specialMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMappingSpecialMap(item) {
        this.specialMap = item;
        this.specialMapTemp = item;
        this.removeVoucherMappingSpecialMap(item);
        this.voucherMappingCreateSpecialMap = true;
    }

    cancelVoucherMappingSpecialMap() {
        if (this.specialMapTemp != null) {
            this.voucherMapping.specialMap.push(this.specialMapTemp);
        }
        this.voucherMappingCreateSpecialMap = false;
    }

    newVoucherMappingCreditMap() {
        this.creditMap = {};
        this.creditMap.value = '';
        this.creditMap.name = '';
        this.creditMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateCreditMap = true;
    }

    addVoucherMappingCreditMap() {
        if (!this.voucherMapping.creditMap) {
            this.voucherMapping.creditMap = [];
        }
        this.voucherMapping.creditMap.push(this.creditMap);
        this.creditMapTemp = null;
        this.voucherMappingCreateCreditMap = false;
    }

    removeVoucherMappingCreditMap(item) {
        this.voucherMapping.creditMap.splice(
            this.voucherMapping.creditMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMappingCreditMap(item) {
        this.creditMap = item;
        this.creditMapTemp = item;
        this.removeVoucherMappingCreditMap(item);
        this.voucherMappingCreateCreditMap = true;
    }

    cancelVoucherMappingCreditMap() {
        if (this.creditMapTemp != null) {
            this.voucherMapping.creditMap.push(this.creditMapTemp);
        }
        this.voucherMappingCreateCreditMap = false;
    }

    newVoucherMappingDebitMap() {
        this.debitMap = {};
        this.debitMap.value = '';
        this.debitMap.name = '';
        this.debitMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateDebitMap = true;
    }

    addVoucherMappingDebitMap() {
        if (!this.voucherMapping.debitMap) {
            this.voucherMapping.debitMap = [];
        }
        this.voucherMapping.debitMap.push(this.debitMap);
        this.debitMapTemp = null;
        this.voucherMappingCreateDebitMap = false;
    }

    removeVoucherMappingDebitMap(item) {
        this.voucherMapping.debitMap.splice(
            this.voucherMapping.debitMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMappingDebitMap(item) {
        this.debitMap = item;
        this.debitMapTemp = item;
        this.removeVoucherMappingDebitMap(item);
        this.voucherMappingCreateDebitMap = true;
    }

    cancelVoucherMappingDebitMap() {
        if (this.debitMapTemp != null) {
            this.voucherMapping.debitMap.push(this.debitMapTemp);
        }
        this.voucherMappingCreateDebitMap = false;
    }

    newVoucherMappingDescriptionMap() {
        this.descriptionMap = {};
        this.descriptionMap.value = '';
        this.descriptionMap.name = '';
        this.descriptionMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateDescriptionMap = true;
    }

    addVoucherMappingDescriptionMap() {
        if (!this.voucherMapping.descriptionMap) {
            this.voucherMapping.descriptionMap = [];
        }
        this.voucherMapping.descriptionMap.push(this.descriptionMap);
        this.descriptionMapTemp = null;
        this.voucherMappingCreateDescriptionMap = false;
    }

    removeVoucherMappingDescriptionMap(item) {
        this.voucherMapping.descriptionMap.splice(
            this.voucherMapping.descriptionMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMappingDescriptionMap(item) {
        this.descriptionMap = item;
        this.descriptionMapTemp = item;
        this.removeVoucherMappingDescriptionMap(item);
        this.voucherMappingCreateDescriptionMap = true;
    }

    cancelVoucherMappingDescriptionMap() {
        if (this.descriptionMapTemp != null) {
            this.voucherMapping.descriptionMap.push(this.descriptionMapTemp);
        }
        this.voucherMappingCreateDescriptionMap = false;
    }

    newVoucherMappingAccountNoMap() {
        this.accountNoMap = {};
        this.accountNoMap.value = '';
        this.accountNoMap.name = '';
        this.accountNoMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateAccountNoMap = true;
    }

    addVoucherMappingAccountNoMap() {
        if (!this.voucherMapping.accountNoMap) {
            this.voucherMapping.accountNoMap = [];
        }
        this.voucherMapping.accountNoMap.push(this.accountNoMap);
        this.accountNoMapTemp = null;
        this.voucherMappingCreateAccountNoMap = false;
    }

    removeVoucherMappingAccountNoMap(item) {
        this.voucherMapping.accountNoMap.splice(
            this.voucherMapping.accountNoMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMappingAccountNoMap(item) {
        this.accountNoMap = item;
        this.accountNoMapTemp = item;
        this.removeVoucherMappingAccountNoMap(item);
        this.voucherMappingCreateAccountNoMap = true;
    }

    cancelVoucherMappingAccountNoMap() {
        if (this.accountNoMapTemp != null) {
            this.voucherMapping.accountNoMap.push(this.accountNoMapTemp);
        }
        this.voucherMappingCreateAccountNoMap = false;
    }

    newVoucherMappingSuffixMap() {
        this.suffixMap = {};
        this.suffixMap.value = '';
        this.suffixMap.name = '';
        this.suffixMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateSuffixMap = true;
    }

    addVoucherMappingSuffixMap() {
        if (!this.voucherMapping.suffixMap) {
            this.voucherMapping.suffixMap = [];
        }
        this.voucherMapping.suffixMap.push(this.suffixMap);
        this.suffixMapTemp = null;
        this.voucherMappingCreateSuffixMap = false;
    }

    removeVoucherMappingSuffixMap(item) {
        this.voucherMapping.suffixMap.splice(
            this.voucherMapping.suffixMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMappingSuffixMap(item) {
        this.suffixMap = item;
        this.suffixMapTemp = item;
        this.removeVoucherMappingSuffixMap(item);
        this.voucherMappingCreateSuffixMap = true;
    }

    cancelVoucherMappingSuffixMap() {
        if (this.suffixMapTemp != null) {
            this.voucherMapping.suffixMap.push(this.suffixMapTemp);
        }
        this.voucherMappingCreateSuffixMap = false;
    }

    newVoucherMappingKeyMap() {
        this.keyMap = {};
        this.keyMap.value = '';
        this.keyMap.name = '';
        this.keyMap.map = {
            condition: 'and',
            rules: []
        };
        this.voucherMappingCreateKeyMap = true;
    }

    addVoucherMappingKeyMap() {
        if (!this.voucherMapping.keyMap) {
            this.voucherMapping.keyMap = [];
        }
        this.voucherMapping.keyMap.push(this.keyMap);
        this.keyMapTemp = null;
        this.voucherMappingCreateKeyMap = false;
    }

    removeVoucherMappingKeyMap(item) {
        this.voucherMapping.keyMap.splice(
            this.voucherMapping.keyMap
                .findIndex((value) => value === item)
            , 1
        );
    }

    updateVoucherMappingKeyMap(item) {
        this.keyMap = item;
        this.keyMapTemp = item;
        this.removeVoucherMappingKeyMap(item);
        this.voucherMappingCreateKeyMap = true;
    }

    cancelVoucherMappingKeyMap() {
        if (this.keyMapTemp != null) {
            this.voucherMapping.keyMap.push(this.keyMapTemp);
        }
        this.voucherMappingCreateKeyMap = false;
    }

    showQuery() {

        const voucherMapping = new VoucherMapping();
        voucherMapping.extraMap = JSON.stringify(this.voucherMapping.extraMap);
        voucherMapping.referenceMap = JSON.stringify(this.voucherMapping.referenceMap);
        voucherMapping.specialMap = JSON.stringify(this.voucherMapping.specialMap);
        voucherMapping.creditMap = JSON.stringify(this.voucherMapping.creditMap);
        voucherMapping.debitMap = JSON.stringify(this.voucherMapping.debitMap);
        voucherMapping.descriptionMap = JSON.stringify(this.voucherMapping.descriptionMap);
        voucherMapping.accountNoMap = JSON.stringify(this.voucherMapping.accountNoMap);
        voucherMapping.suffixMap = JSON.stringify(this.voucherMapping.suffixMap);
        voucherMapping.keyMap = JSON.stringify(this.voucherMapping.keyMap);
        voucherMapping.baseQueryId = this.voucherMapping.baseQueryId;
        voucherMapping.voucherTemplateId = this.voucherMapping.voucherTemplateId;
        voucherMapping.id = this.voucherMapping.id;
        this.voucherTemplateService.showQuery(voucherMapping, this.date, this.locationId, this.startDate, this.finishDate, this.customerId).subscribe((baseQueryResult) => {
            this.mapQueryResult = baseQueryResult.body;
            this.mapResultList = [];
            this.mapQueryResult.resultList.forEach((value) => {
                let column: any;
                column = {};
                for (let i = 0; i < this.mapQueryResult.header.length; i++) {
                    column[this.mapQueryResult.header[i]] = value[i];
                }
                this.mapResultList.push(column);
            });
            this.mapCols = [];
            this.mapQueryFields = [];
            this.mapQueryResult.header.forEach((value) => {
                let header: any;
                this.mapQueryFields.push(value);
                header = {};
                header.field = value;
                header.header = value;
                this.mapCols.push(header);
            });
            this.mapCols = this.mapCols.reverse();

        });
    }

    ngOnInit() {

        this.voucherTemplateService.query().subscribe((value) => {
            this.voucherTemplates = value.body.filter((value) => value.referrer === 'NORMAL');
        });
        this.docBuildAfterOperationsTypes.push({
            label: this.translateService.instant('niopdcgatewayApp.voucherTemplate.docBuildAfterOperationsTypes.walletCharge'),
            'value': 'WALLET_CHARGE'
        });
        this.docBuildAfterOperationsTypes.push({
            label: this.translateService.instant('niopdcgatewayApp.voucherTemplate.docBuildAfterOperationsTypes.creditCharge'),
            'value': 'CREDIT_CHARGE'
        });
        this.docBuildAfterOperationsTypes.push({
            label: this.translateService.instant('niopdcgatewayApp.voucherTemplate.docBuildAfterOperationsTypes.docBuild'),
            'value': 'DOC_BUILD'
        });

        this.docBuildAgentTypes.push({
            label: this.translateService.instant('niopdcgatewayApp.voucherTemplate.docBuildAgentTypes.dayClose'),
            'value': 'DAY_CLOSE'
        });
        this.loadAll();
        this.route.params.subscribe((params) => {
            View.isView = !!params['view'];
            if (params['id']) {
                this.voucherTemplate = new VoucherTemplate();
                this.voucherTemplate.id = params['id'];
                this.voucherTemplateService.find(params['id']).subscribe((voucherTemplate) => {
                    this.voucherTemplate = voucherTemplate.body;
                    this.baseQueryChange();
                });
            } else {
                const voucherTemplate = new VoucherTemplate();
                this.voucherTemplate = voucherTemplate;
            }
        });

        this.voucherMapping = new VoucherMapping();

        this.voucherMapping.extraMap = [];
        this.voucherMapping.referenceMap = [];
        this.voucherMapping.specialMap = [];
        this.voucherMapping.creditMap = [];
        this.voucherMapping.debitMap = [];
        this.voucherMapping.descriptionMap = [];
        this.voucherMapping.accountNoMap = [];
        this.voucherMapping.suffixMap = [];
        this.voucherMapping.keyMap = [];

        this.extraMap = {};
        this.extraMap.value = '';
        this.extraMap.name = '';
        this.extraMap.map = {
            condition: 'and',
            rules: []
        };

        this.referenceMap = {};
        this.referenceMap.value = '';
        this.referenceMap.name = '';
        this.referenceMap.map = {
            condition: 'and',
            rules: []
        };

        this.specialMap = {};
        this.specialMap.value = '';
        this.specialMap.name = '';
        this.specialMap.map = {
            condition: 'and',
            rules: []
        };

        this.creditMap = {};
        this.creditMap.value = '';
        this.creditMap.name = '';
        this.creditMap.map = {
            condition: 'and',
            rules: []
        };

        this.debitMap = {};
        this.debitMap.value = '';
        this.debitMap.name = '';
        this.debitMap.map = {
            condition: 'and',
            rules: []
        };

        this.descriptionMap = {};
        this.descriptionMap.value = '';
        this.descriptionMap.name = '';
        this.descriptionMap.map = {
            condition: 'and',
            rules: []
        };

        this.accountNoMap = {};
        this.accountNoMap.value = '';
        this.accountNoMap.name = '';
        this.accountNoMap.map = {
            condition: 'and',
            rules: []
        };

        this.suffixMap = {};
        this.suffixMap.value = '';
        this.suffixMap.name = '';
        this.suffixMap.map = {
            condition: 'and',
            rules: []
        };

        this.keyMap = {};
        this.keyMap.value = '';
        this.keyMap.name = '';
        this.keyMap.map = {
            condition: 'and',
            rules: []
        };

        this.isView = View.isView;
        this.isSaving = false;
        this.voucherTypeService.query()
            .subscribe((res: HttpResponse<VoucherType[]>) => {
                this.voucherTypes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.baseQueryService.query().subscribe(
            (res) => {
                this.baseQueriesAll = res.body;
                this.baseQueries = this.baseQueriesAll;
                this.onReferrerChange();
            }
        );

        this.setBreadCrumb();

        this.principal.identity().then((value) => {
            if (value.userTypes.includes('HEAD')) {
                this.userTypes.push({
                    label: this.translateService.instant('niopdcgatewayApp.userType.HEAD'),
                    'value': 'HEAD'
                });
            }
            if (value.userTypes.includes('AREA')) {
                this.userTypes.push({
                    label: this.translateService.instant('niopdcgatewayApp.userType.AREA'),
                    'value': 'AREA'
                });
            }
            if (value.userTypes.includes('REFUEL_CENTER')) {
                this.userTypes.push({
                    label: this.translateService.instant('niopdcgatewayApp.userType.REFUEL_CENTER'),
                    'value': 'REFUEL_CENTER'
                });
            }
            if (value.userTypes.includes('ZONE')) {
                this.userTypes.push({
                    label: this.translateService.instant('niopdcgatewayApp.userType.ZONE'),
                    'value': 'ZONE'
                });
            }
            if (value.userTypes.includes('BOUNDARY')) {
                this.userTypes.push({
                    label: this.translateService.instant('niopdcgatewayApp.userType.BOUNDARY'),
                    'value': 'BOUNDARY'
                });
            }
        });

    }

    onReferrerChange() {
        this.baseQueries = this.baseQueriesAll
            .filter((value) => this.voucherTemplate.referrer === 'NORMAL' ?
                value.parameters && value.parameters.length :
                !value.parameters || !value.parameters.length);
    }

    onLocationChange() {
        this.onReferrerChange();
        if (this.voucherTemplate.locationIds.length > 0) {
            this.baseQueries = this.baseQueries.filter((element) => this.findLocation(element.locationIds));
        }
    }

    findLocation(locationIds: number[]) {
        let flag = false;

        for (const entry of this.voucherTemplate.locationIds) {
            flag = locationIds.includes(entry) || flag;
        }
        return flag;
    }

    setBreadCrumb() {
        this.breadcrumbItems = [];
        this.translateService.get('global.menu.home').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.voucherTemplate.home.title').subscribe((title) => {
            this.breadcrumbItems.push({label: title, routerLink: ['/voucher-template']});
        });
        this.translateService.get(this.voucherTemplate.id ? 'entity.action.edit' : 'entity.action.create').subscribe((title) => {
            this.breadcrumbItems.push({label: title});
        });
    }

    clear() {
        this.router.navigate(['/voucher-template']);
        // this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.voucherTemplate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voucherTemplateService.update(this.voucherTemplate));
        } else {
            this.subscribeToSaveResponse(
                this.voucherTemplateService.create(this.voucherTemplate));
        }
    }

    trackVoucherTypeById(index: number, item: VoucherType) {
        return item.id;
    }

    mapQuery(jsonArray: any) {
        if (jsonArray.length < 1) {
            return;
        }
        let finalMap = 'CASE ';
        let _elses = jsonArray.filter(c => c.isElse === true);
        for (let item of jsonArray) {

            let map = item['map'];
            let isElse = item['isElse'];
            if (isElse) {
                continue;
            }

            let str = JSON.stringify(map);
            if (!str.includes('{"condition":"and","rules":[]}')) {
                let condition = map['condition'];
                let rules = map['rules'];
                let txt = ' WHEN ';
                let index = 0;
                for (let rule of rules) {
                    let field = rule['field'];
                    let operator = rule['operator'];
                    let value = rule['value'];
                    if (value) {
                        txt += field + ' ' + operator + ' \'' + value + '\' ';
                    } else {
                        txt += field + ' ' + operator + ' ';
                    }
                    index++;
                    if (index < rules.length) {
                        txt += condition + ' ';
                    }
                }
                finalMap += txt + ' THEN ' + item['value'];
            }
        }

        if (_elses.length > 0) {
            let _else = _elses[0];
            let value = _else['value'];
            finalMap += ' ELSE ' + value;
        }

        if (finalMap.length > 5) {
            return finalMap + ' END';
        }
        return '';
    }

    changeDocBuildAfterOperations() {
        if (this.voucherTemplate.docBuildAfterOperations.includes('DOC_BUILD')) {
            this.includeDocBuild = true;

        } else {
            this.includeDocBuild = false;
            this.voucherTemplate.buildAfterVoucherTemplateId = null;
            this.voucherTemplate.buildAfterVoucherTemplateReversed = null;
        }

    }

    /*@Component({
        selector: 'jhi-voucher-template-popup',
        template: ''
    })
    export class VoucherTemplatePopupComponent implements OnInit, OnDestroy {

        routeSub: any;

        constructor(private route: ActivatedRoute,
                    private voucherTemplatePopupService: VoucherTemplatePopupService) {
        }

        ngOnInit() {
            this.routeSub = this.route.params.subscribe((params) => {
                View.isView = !!params['view'];

                if (params['id']) {
                    this.voucherTemplatePopupService
                        .open(VoucherTemplateDialogComponent as Component, params['id']);
                } else {
                    this.voucherTemplatePopupService
                        .open(VoucherTemplateDialogComponent as Component);
                }
            });
        }

        ngOnDestroy() {
            this.routeSub.unsubscribe();
        }
    }*/

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoucherTemplate>>) {
        result.subscribe((res: HttpResponse<VoucherTemplate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoucherTemplate) {
        this.eventManager.broadcast({name: 'voucherTemplateListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/voucher-template']);
        // this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

class View {
    static isView: boolean;
}
