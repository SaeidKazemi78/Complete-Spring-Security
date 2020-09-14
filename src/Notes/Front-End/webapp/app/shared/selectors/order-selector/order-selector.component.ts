import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {JhiParseLinks} from 'ng-jhipster';

import {Order, OrderService} from '../../../entities/order/.';
import {ITEMS_PER_PAGE} from '../../.';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {LazyLoadEvent} from 'primeng/primeng';
import {CustomerType, CustomerTypeService} from 'app/entities/customer-type';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OrderSelectorComponent),
    multi: true
};

@Component({
    selector: 'jhi-order-selector',
    templateUrl: './order-selector.component.html',
    styleUrls: ['./order-selector.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR/*,
     CUSTOM_INPUT_CONTROL_VALIDATOR*/],
    encapsulation: ViewEncapsulation.None
})
export class OrderSelectorComponent implements OnInit {

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() selectObject = false;
    @Input() productRateId: number;
    @Output() selectedItem = new EventEmitter();

    orders: Order[];
    order: Order = new Order();
    selects: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any = 1;
    predicate: any = 'id';
    currentSearch: any = '';
    reverse: boolean = true;

    overlayVisible: boolean;
    types: CustomerType[] = [];
    customerTypes: CustomerType[] = [];
    startDate: any;
    finishDate: any;

    constructor(
        private orderService: OrderService,
        private parseLinks: JhiParseLinks,
        private typeService: CustomerTypeService,
        private elementRef: ElementRef
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    get value() {
        if (this.selects) {
            return this.selectObject ? this.selects : (this.multiSelect) ? this.selects.map((value) => value.id) : this.selects.id;
        } else {
            return null;
        }
    }

    set value(val: any) {
        if (this.selectObject) {
            if (!this.multiSelect && val instanceof Array) {
                this.selects = val.filter((value) => value.id);
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
                val.forEach((value) => {
                        if (typeof value === 'number' && this.selects.find((value_f) => value_f.id === value) == null) {
                            this.orderService.find(value).subscribe(
                                (res) => {
                                    if (this.selects.find(value_f => value_f.id === value) == null) {
                                        this.selects.push(res);
                                        this.onChange(this.value);
                                        this.onTouched();
                                    }

                                }, (res) => this.onError(res.json));
                        }
                    }
                );
            } else if (!this.multiSelect && typeof val === 'number') {
                this.orderService.find(val).subscribe(
                    (res) => {
                        this.selects = res;
                        this.onChange(this.value);
                        this.onTouched();
                    }, (res) => this.onError(res.json));
            } else {
                this.selects = undefined;
            }
        }

    }

    loadAll() {
        this.orderService.queryByMode('order', {
            productRateId: this.productRateId,
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res) => this.onSuccess(res, res.headers),
            (res) => this.onError(res.json)
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
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.order.customerGroupTitle) {
            this.currentSearch += 'customerType|customerGroup#CustomerGroup.' + this.order.customerGroupTitle + '&';
        }
        if (this.order.customerTypeId) {
            this.currentSearch += 'customerType|id☼' + this.order.customerTypeId + '&';
        }
        if (this.order.customerName) {
            this.currentSearch += 'customer|name$' + this.order.customerName + '&';
        }
        if (this.order.personName) {
            this.currentSearch += 'person|name$' + this.order.personName + '&';
        }
        if (this.order.sellContractNumber) {
            this.currentSearch += 'sellContract|contractNo$' + this.order.sellContractNumber + '&';
        }
        if (this.order.orderNo) {
            this.currentSearch += 'orderNo$' + this.order.orderNo + '&';
        }
        if (this.startDate) {
            this.currentSearch += 'registerDate→' + this.startDate.toISOString() + '&';
        }
        if (this.finishDate) {
            this.currentSearch += 'registerDate←' + this.finishDate.toISOString() + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.loadAll();
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    ngOnInit() {
        this.onChange(this.value);
        this.typeService.query({page: null}).subscribe(res => {
                this.types = res.body;
                this.customerTypes = this.types;
            }
        );
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

    onSelect(event, selected) {
        this.onChange(this.value);
        if (this.multiSelect) {
            if (selected) {
                if (this.selects.find(value => value.id === event.data.id) == null) {
                    this.selects.push(event.data);
                }
            } else {
                this.selects = this.selects.filter((value2) => value2.id != event.data.id);
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

    trackId(index: number, item: Order) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadLazy(event: LazyLoadEvent) {
        this.page = (event.first / event.rows) + 1;
        this.itemsPerPage = event.rows;
        if (event.sortField) {
            this.predicate = event.sortField;
            this.reverse = event.sortOrder === 1;
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

    onChangeCustomerGroup() {
        this.customerTypes = this.types.filter(value2 => !this.order.customerGroupTitle || value2.customerGroup === this.order.customerGroupTitle);
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.orders = data.body;
    }

    private onError(error) {
    }
}
