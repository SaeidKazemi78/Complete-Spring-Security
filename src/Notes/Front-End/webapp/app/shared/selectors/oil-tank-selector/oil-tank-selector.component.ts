import {
    Component, OnInit, Input, forwardRef, ViewEncapsulation, EventEmitter, Output,
    HostListener, ElementRef, OnChanges, SimpleChanges
} from '@angular/core';
import { JhiParseLinks } from 'ng-jhipster';

import { OilTank, OilTankService  } from '../../../entities/ao-entities/oil-tank/.';
import { ITEMS_PER_PAGE } from '../../.';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import { LazyLoadEvent } from 'primeng/primeng';
import { TranslateService } from '@ngx-translate/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OilTankSelectorComponent),
    multi: true
};

@Component({
    selector: 'jhi-oil-tank-selector',
    templateUrl: './oil-tank-selector.component.html',
    styleUrls: ['./oil-tank-selector.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR/*,
     CUSTOM_INPUT_CONTROL_VALIDATOR*/],
    encapsulation: ViewEncapsulation.None
})
export class OilTankSelectorComponent implements OnInit , OnChanges {

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() refuelCenterId = null;
    @Input() widthGrid = '100%';
    @Input() selectObject = false;
    @Output() selectedItem = new EventEmitter();

    oilTanks: OilTank[];
    oilTank: OilTank = new OilTank();
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
        private oilTankService: OilTankService,

        private parseLinks: JhiParseLinks,
        private elementRef: ElementRef
        ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    loadAll() {
        if (this.refuelCenterId) {
        this.oilTankService.findByRefuelCenter(this.refuelCenterId, {
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<OilTank[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        }
        else {
            this.oilTanks = [];
        }
    }

    empty() {
        this.value = null;
        if (this.multiSelect) { this.selects = []; }
        else { this.selects = undefined; }
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
        if (this.oilTank.title) {
            this.currentSearch += 'title$' + this.oilTank.title + '&';
        }
        if (this.oilTank.productTitle) {
            this.currentSearch += 'productTitle$' + this.oilTank.productTitle + '&';
        }
        if (this.oilTank.oilTankType) {
            this.currentSearch += 'oilTankType#OilTankType.' + this.oilTank.oilTankType + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.loadAll();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.refuelCenterId && !changes.refuelCenterId.isFirstChange()) {
            this.loadAll();
        }
        if (changes.personId) {
            this.loadAll();
        }
    }
    ngOnInit() {
                this.onChange(this.value);
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
        }
        else { return null; }
    }

    set value(val: any) {
        if (this.selectObject) {
            if (!this.multiSelect && val instanceof Array) {
                this.selects = val.filter(value => value.id);
            } else if (!this.multiSelect && val.id) {
                this.selects = val;
            } else if (this.multiSelect) {
                this.selects = [];
                   }
            else {
                this.selects = undefined;
                   }
            this.onChange(this.value);
            this.onTouched();
        } else {
            if (this.multiSelect && val instanceof Array) {
                this.selects = [];
                val.forEach(value => {
                        if (typeof value === 'number' && this.selects.find(value_f => value_f.id === value) == null) {
                            this.oilTankService.find(value).subscribe(res => {
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
                this.oilTankService.find(val).subscribe(res => {
                        this.selects = res;
                        this.onChange(this.value);
                        this.onTouched();
                    }, (res: HttpErrorResponse) => this.onError(res.message));
            } else { this.selects = undefined; }
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
                this.selects = this.selects.filter(value2 => value2.id !== event.data.id);
            }
            this.selectedItem.emit(this.selects);
        } else {
            this.overlayVisible = false;
        }

    }

    showTable() {
        if (this.disabled === true) { return; }
        this.overlayVisible = !this.overlayVisible;
    }

    close() {
        this.overlayVisible = false;
    }

    trackId(index: number, item: OilTank) {
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
        this.oilTanks = data;
        console.log(this.oilTanks);
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
