import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {JhiAlertService, JhiLanguageService, JhiParseLinks} from 'ng-jhipster';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {LazyLoadEvent} from 'primeng/primeng';
import {SellContractCustomerPersonService} from './sell-contract-customer-person-selector.service';
import {CustomerPerson} from './sell-contract-customer-person-selector.model';

export const CUSTOM_PERSON_SELL_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SellContractCustomerPersonSelectorComponent),
    multi: true
};

@Component({
    selector: 'sell-contract-customer-person-selector',
    templateUrl: 'sell-contract-customer-person-selector.component.html',
    styleUrls: ['sell-contract-customer-person-selector.component.css'],
    providers: [CUSTOM_PERSON_SELL_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None

})
export class SellContractCustomerPersonSelectorComponent implements OnInit, OnChanges {

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() selectObject = false;
    @Input() locationId: number = null;
    @Input() customerId: number = null;
    @Input() type: 'order' | 'airplane' | 'refuel-center' = null;
    @Output() selectedItem = new EventEmitter();
    @Input() customerGroup: any;
    customerPersons: CustomerPerson[] = [];
    customerPerson: CustomerPerson = new CustomerPerson();
    selects: any;
    oldSelects: any;

    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any = 1;
    predicate: any = 'customerName';
    currentSearch: any = '';
    reverse = false;

    overlayVisible: boolean;
    @ViewChild('customerName') customerName: ElementRef;

    constructor(private alertService: JhiAlertService,
                private languageService: JhiLanguageService,
                private parseLinks: JhiParseLinks,
                private sellContractCustomerPersonService: SellContractCustomerPersonService,
                private elementRef: ElementRef) {
        this.itemsPerPage = 5;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.locationId && !changes.locationId.isFirstChange()) {
            // this.empty();
            this.loadAll();
        } else if (changes.type && !changes.type.isFirstChange()) {
            // this.empty();
            this.loadAll();
        }
    }

    loadAll() {
        if (this.customerGroup != null && this.customerGroup != undefined) {
            this.customerPerson.customerGroup = this.customerGroup;
        }
        if (this.customerId) {
            this.customerPerson.customerId = this.customerId;
        }

        (this.type !== 'order' ?
            this.sellContractCustomerPersonService.findForAirplane(this.type, {
                query: JSON.stringify(this.customerPerson),
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }) :
            this.sellContractCustomerPersonService.findByLocation(this.locationId,
                {
                    query: JSON.stringify(this.customerPerson),
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.sort()
                }
            ))
            .subscribe(res => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message));
    }

    ngOnInit() {
    }

    search() {
        this.page = 0;
        this.currentSearch = '';

        this.loadAll();
    }

    empty() {
        this.customerPerson = new CustomerPerson();
        this.value = null;

        if (this.multiSelect && this.selects !== []) {
            this.selects = [];
        } else if (!this.multiSelect && this.selects !== undefined) {
            this.selects = undefined;
        } else {
            return;
        }

        this.onChange(this.value);
        this.onTouched();
        this.selectedItem.emit(this.selects);
        this.oldSelects = this.selects;

    }

    clear() {
        this.customerPerson = new CustomerPerson();
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
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
        if (this.multiSelect && val instanceof Array) {
            this.selects = [];
            val.forEach(value => {
                    if (value instanceof CustomerPerson && this.selects.find(value_f => value_f.id === value) == null) {
                        this.sellContractCustomerPersonService.find(value).subscribe(
                            (res: HttpResponse<CustomerPerson>) => {
                                if (this.selects.find(value_f => value_f.id === value) == null) {
                                    this.selects.push(res.body);
                                    this.onChange(this.value);
                                    this.onTouched();
                                }
                            }, (res: HttpErrorResponse) => this.onError(res.message));
                    }
                }
            );
        } else if (!this.multiSelect && val instanceof CustomerPerson) {
            this.sellContractCustomerPersonService.find(val).subscribe(
                (res: HttpResponse<CustomerPerson>) => {
                    this.selects = res.body;
                    this.onChange(this.value);
                    this.onTouched();
                }, (res: HttpErrorResponse) => this.onError(res.message));
        } else {
            this.selects = undefined;
        }
        this.oldSelects = this.selects;

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
        if (this.oldSelects !== this.selects) {
            this.selectedItem.emit(this.selects);
        }
        this.oldSelects = this.selects;
    }

    showTable() {
        if (this.disabled == true) {
            return;
        }
        this.overlayVisible = !this.overlayVisible;
        setTimeout(() => {
            this.customerName.nativeElement.focus();
        }, 100);
    }

    close() {
        this.overlayVisible = false;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    private onSuccess(data, headers) {
        if (headers && headers.has('X-Total-Count')) {
            this.links = this.parseLinks.parse(headers.get('link'));
            this.totalItems = headers.get('X-Total-Count');
            this.queryCount = this.totalItems;
        } else {
            // this.links = null;
            this.totalItems = this.queryCount = undefined;
        }
        // this.page = pagingParams.page;
        this.customerPersons = data;

        if (this.customerId) {
            if (this.multiSelect) {
                this.selects = [];
                this.selects.push(this.customerPersons.find(data => data.customerId == this.customerId));
            }else{
                this.selects = (this.customerPersons.find(data => data.customerId == this.customerId));
            }
            this.onChange(this.value);
            this.onTouched();
            this.selectedItem.emit(this.selects);

        }
    }

    private onError(error) {
        console.log(error);
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
