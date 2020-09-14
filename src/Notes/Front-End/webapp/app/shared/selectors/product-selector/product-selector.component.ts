import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input, OnChanges,
    OnInit,
    Output, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {JhiParseLinks} from 'ng-jhipster';

import {Product, ProductService} from '../../../entities/product/.';
import {ITEMS_PER_PAGE} from '../../.';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {ProductGroup, ProductGroupService} from '../../../entities/product-group/.';
import {LazyLoadEvent} from 'primeng/primeng';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProductSelectorComponent),
    multi: true
};

@Component({
    selector: 'jhi-product-selector',
    templateUrl: './product-selector.component.html',
    styleUrls: ['./product-selector.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR/*,
     CUSTOM_INPUT_CONTROL_VALIDATOR*/],
    encapsulation: ViewEncapsulation.None
})
export class ProductSelectorComponent implements OnInit, OnChanges  {

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() haveCustomerGroup = false;
    @Input() customerGroup = null;
    @Input() selectObject = false;
    @Output() selectedItem = new EventEmitter();

    products: Product[] = [];
    product: Product = new Product();
    selects: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any = 1;
    predicate: any = 'title';
    currentSearch: any = '';
    reverse = false;

    overlayVisible: boolean;

    constructor(
        private productService: ProductService,
        private productGroupService: ProductGroupService,
        private parseLinks: JhiParseLinks,
        private elementRef: ElementRef
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    loadAll() {
        if (!this.haveCustomerGroup || this.customerGroup) {
            this.productService.query({
                query: this.currentSearch.length > 0 ? this.currentSearch : null,
                customerGroup: this.customerGroup,
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(res => this.onSuccess(res.body, res.headers),res => this.onError(res.message)
            );
        } else {
            this.products = [];
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.product.title) {
            this.currentSearch += 'title$' + this.product.title + '&';
        }
        if (this.product.code) {
            this.currentSearch += 'code$' + this.product.code + '&';
        }
        if (this.product.productGroupTitle) {
            this.currentSearch += 'productGroup.title$' + this.product.productGroupTitle + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }


        this.loadAll();
    }

    ngOnInit() {
        this.onChange(this.value);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.customerGroup && !changes.customerGroup.isFirstChange()) {
            this.loadAll();
        }
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
            if (!this.multiSelect && val instanceof Array) {
                this.selects = val.filter(value => value instanceof Product);
            } else if (!this.multiSelect && val instanceof Product) {
                this.selects = val;
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
                            this.productService.find(value).subscribe(res => {
                                    if (this.selects.find(value_f => value_f.id === value) == null) {
                                        this.selects.push(res);
                                        this.onChange(this.value);
                                        this.onTouched();
                                    }

                                },res => this.onError(res.message));
                        }
                    }
                );
            } else if (!this.multiSelect && typeof val === 'number') {
                this.productService.find(val).subscribe(res => {
                        this.selects = res.body;
                        this.onChange(this.value);
                        this.onTouched();
                    },res => this.onError(res.message));
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

    trackId(index: number, item: Product) {
        return item.id;
    }

    trackProductGroupById(index: number, item: ProductGroup) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.products = data;
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
