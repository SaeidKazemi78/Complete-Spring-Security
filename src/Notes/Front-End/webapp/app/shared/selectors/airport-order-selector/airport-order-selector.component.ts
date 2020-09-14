import {
    Component, OnInit, Input, forwardRef, ViewEncapsulation, EventEmitter, Output,
    HostListener, ElementRef, OnChanges, SimpleChanges, ViewChild
} from '@angular/core';

import {JhiAlertService, JhiLanguageService, JhiParseLinks} from 'ng-jhipster';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Airport, AirportService} from '../../../entities/ao-entities/airport';
import {ITEMS_PER_PAGE} from '../../';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

export const CUSTOM_AirportOrder_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AirportOrderSelectorComponent),
    multi: true
};

@Component({
    selector: 'app-airport-order-selector',
    templateUrl: 'airport-order-selector.component.html',
    styleUrls: ['airport-order-selector.component.css'],
    providers: [CUSTOM_AirportOrder_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None

})
export class AirportOrderSelectorComponent implements OnInit , OnChanges {

    @Input() companyId;

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() selectObject = false;
    @Input() inputAirports: Airport[] = [];
    @Output() selectedItem = new EventEmitter();

    airports: Airport[];
    airport: Airport = new Airport();
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
    airportsFinal: Airport[] = [];
    @ViewChild('globalCode') globalCode: ElementRef;

    constructor(private alertService: JhiAlertService,
                private languageService: JhiLanguageService,
                private parseLinks: JhiParseLinks,
                private airportService: AirportService,
                private elementRef: ElementRef) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    ngOnInit() {
        this.onChange(this.value);
        this.loadAll();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.inputAirports && !changes.inputAirports.isFirstChange()) {
            this.loadAll();
        }
    }

    loadAll() {
        this.airports = this.inputAirports;
        console.log(this.airports);
        /*this.airportService.queryByOrder().subscribe(
            (res: HttpResponse<Airport[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );*/
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
                        if (typeof value === 'number' && this.selects.find(value_f => value_f.id === value) == null && this.inputAirports && this.inputAirports.length) {
                            const airport1 = this.inputAirports.find(value1 => value1.id === value);
                            if (this.selects.find(value_f => value_f.id === value) == null) {
                                this.selects.push(airport1);
                                this.onChange(this.value);
                                this.onTouched();
                            }
                        }
                    }
                );
            } else if (!this.multiSelect && typeof val === 'number' && this.inputAirports && this.inputAirports.length) {
                this.selects = this.inputAirports.find(value1 => value1.id === val);
                this.onChange(this.value);
                this.onTouched();
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
        setTimeout(() => {
            this.globalCode.nativeElement.focus();
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
        this.airports = data;
        console.log(this.airports[0]);
        if (this.value == null) {
            this.value = this.airports[0];
        }

    }

    private onError(error) {
        console.log(error);
    }

    filter(key, field) {
        if (this.airportsFinal.length === 0) {
            this.airportsFinal = this.airports.map(x => Object.assign({}, x));
        }
        this.airports = this.airportsFinal.filter(value1 => {
                if (value1[field]) {
                    return value1[field].toUpperCase().indexOf((key.toUpperCase())) >= 0;
                }
            }
        );
        if (this.airports.length === 1) {
            this.selects = this.airports[0];
            this.selectedItem.emit(this.selects);
            this.overlayVisible = false;
        }
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
