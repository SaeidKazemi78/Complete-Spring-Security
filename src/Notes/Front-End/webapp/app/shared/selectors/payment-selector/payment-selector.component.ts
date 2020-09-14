import {
    Component, OnInit, Input, forwardRef, ViewEncapsulation, EventEmitter, Output,
    HostListener, ElementRef
} from '@angular/core';
import {JhiParseLinks} from 'ng-jhipster';

import {Payment, PaymentService} from '../../../entities/payment/.';
import {ITEMS_PER_PAGE} from '../../.';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {LazyLoadEvent} from 'primeng/primeng';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PaymentSelectorComponent),
    multi: true
};

@Component({
    selector: 'jhi-payment-selector',
    templateUrl: './payment-selector.component.html',
    styleUrls: ['./payment-selector.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR/*,
     CUSTOM_INPUT_CONTROL_VALIDATOR*/],
    encapsulation: ViewEncapsulation.None
})
export class PaymentSelectorComponent implements OnInit {

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() rightZero = false;
    @Input() selectObject = false;
    @Input() requestIdentifier;
    @Output() selectedItem = new EventEmitter();
    @Output() exist = new EventEmitter();
    firstCheck = false;

    payments: Payment[];
    payment: Payment = new Payment();
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

    constructor(
        private paymentService: PaymentService,
        private parseLinks: JhiParseLinks,
        private elementRef: ElementRef
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    loadAll() {
        this.paymentService.queryByIdentifier(this.requestIdentifier).subscribe(
            (res: HttpResponse<Payment[]>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.payment.receiptNo) {
            this.currentSearch += 'receiptNo$' + this.payment.receiptNo + '&';
        }
        if (this.payment.receiptDateTime) {
            this.currentSearch += 'receiptDateTime→' + this.payment.receiptDateTime.toISOString() + '&';
        }
        if (this.payment.currentAmount) {
            this.currentSearch += 'currentAmount☼' + this.payment.currentAmount + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.loadAll();
    }

    ngOnInit() {
        this.onChange(this.value);
        this.loadAll();
    }

    writeValue(val: any) {
        if (val !== this.value) {
            this.value = val;
        }
    }

    onChange: any = () => {
    }
    onTouched: any = () => {
    }

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
            if (!this.multiSelect && val instanceof Array) {
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
                            this.paymentService.find(value).subscribe(res => {
                                    if (this.selects.find(value_f => value_f.id === value) == null) {
                                        this.selects.push(res);
                                        this.onChange(this.value);
                                        this.onTouched();
                                    }

                                }, (res: HttpErrorResponse) => this.onError(res.message));
                        }
                    }
                );
            } else if (!this.multiSelect && typeof val === 'number') {
                this.paymentService.find(val).subscribe(res => {
                        this.selects = res;
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
            this.selectedItem.emit(this.selects);
        } else {
            this.overlayVisible = false;
        }

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

    trackId(index: number, item: Payment) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    private onSuccess(data) {
        this.queryCount = this.totalItems;
        this.payments = data;
        if (this.payments && this.payments.length && !this.firstCheck) {
            this.exist.emit(true);
        }

    }

    private onError(error) {
    }

    loadLazy(event: LazyLoadEvent) {
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder !== 1;
        }

        this.loadAll();
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
