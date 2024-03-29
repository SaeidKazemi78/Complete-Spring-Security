import {
    Component, OnInit, Input, forwardRef, ViewEncapsulation, EventEmitter, Output,
    HostListener, ElementRef
} from '@angular/core';

import {JhiAlertService, JhiLanguageService, JhiParseLinks} from 'ng-jhipster';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {SellContractProductService} from '../../../entities/sell-contract-product';
import {SellContractProduct} from '../../../entities/sell-contract-product';
import {ITEMS_PER_PAGE} from '../../';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CustomerSellContract} from '../../../entities/sell-contract';

export const CUSTOM_SELL_CONTARTCT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SellContractCustomerSelectorComponent),
    multi: true
};

@Component({
    selector: 'sell-contract-customer-selector',
    templateUrl: 'sell-contract-customer-selector.component.html',
    styleUrls: ['sell-contract-customer-selector.component.css'],
    providers: [CUSTOM_SELL_CONTARTCT_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None

})
export class SellContractCustomerSelectorComponent implements OnInit {

    @Input() companyId;

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() selectObject = false;
    @Output() selectedItem = new EventEmitter();
    @Input() customerSellContracts: CustomerSellContract[];

    sellContractProduct: SellContractProduct = new SellContractProduct();
    selects: any;

    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any = 1;
    predicate: any = 'id';
    currentSearch: any = '';
    reverse = true;

    overlayVisible: boolean;

    constructor(private alertService: JhiAlertService,
                private languageService: JhiLanguageService,
                private parseLinks: JhiParseLinks,
                private sellContractProductService: SellContractProductService,
                private elementRef: ElementRef) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    ngOnInit() {
        this.onChange(this.value);
    }

    empty() {
        this.value = null;
        if (this.multiSelect) {
            this.selects = [];
        } else {
            this.selects = undefined;
        }
        this.onChange(this.value);
        this.onTouched();
        this.selectedItem.emit(this.selects);

    }

    writeValue(val: any) {
        if (val !== this.value) {
            this.value = val;
        }
    }

    onChange: any = () => {
    };
    onTouched: any = () => {
    };

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    get value() {
        if (this.selects) {
            return this.selectObject ? this.selects : (this.multiSelect) ? this.selects.map(value => value.id) : this.selects.id;
        } else {
            return null;
        }
    }

    set value(val: any) {
        if (this.selectObject) {
            if (this.multiSelect && val instanceof Array) {
                this.selects = val.filter(value => value.id);
            } else if (!this.multiSelect && val.id) {
                this.selects = val;
            } else if (this.multiSelect) {
                this.selects = [];
            } else {
                this.selects = undefined;
            }
            this.onChange(this.value);
            this.onTouched();
        } else {
            if (this.multiSelect && val instanceof Array) {
                this.selects = [];
                val.forEach(value => {
                        if (typeof value === 'number' && this.selects.find(value_f => value_f.id === value) == null) {
                            this.sellContractProductService.find(value).subscribe(
                                (res: HttpResponse<SellContractProduct>) => {
                                    if (this.selects.find(value_f => value_f.id === value) == null) {
                                        this.selects.push(res.body);
                                        this.onChange(this.value);
                                        this.onTouched();
                                    }
                                }, (res: HttpErrorResponse) => this.onError(res.message));
                        }
                    }
                );
            } else if (!this.multiSelect && typeof val === 'number') {
                this.sellContractProductService.find(val).subscribe(
                    (res: HttpResponse<SellContractProduct>) => {
                        this.selects = res.body;
                        this.onChange(this.value);
                        this.onTouched();
                    }, (res: HttpErrorResponse) => this.onError(res.message));
            } else {
                this.selects = undefined;
            }
        }

    }

    onSelect(event, selected) {
        this.onChange(this.value);
        if (this.multiSelect) {
            if (selected) {
                if (this.selects.find(value => value.id === event.data.id) == null) {
                    this.selects.push(event.data);
                }
            } else {
                this.selects = this.selects.filter(value2 => value2.id != event.data.id);
            }
        } else {
            this.overlayVisible = false;
        }
        this.selectedItem.emit(this.selects);

    }

    showTable() {
        if (this.disabled == true) {
            return;
        }
        this.overlayVisible = !this.overlayVisible;
    }

    close() {
        this.overlayVisible = false;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    /* private onSuccess(data, headers) {
         this.sellContractProducts = data;
     }*/

    private onError(error) {
        console.log(error);
    }

    @HostListener('document:click', ['$event'])
    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.close();
        }
    }

}
