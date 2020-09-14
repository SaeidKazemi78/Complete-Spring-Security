import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

import {JhiAlertService, JhiLanguageService, JhiParseLinks} from 'ng-jhipster';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Location, LocationService} from '../../../entities/location';
import {ITEMS_PER_PAGE} from '../../';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

export const CUSTOM_LOCATION_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LocationLevelSelectorComponent),
    multi: true
};

@Component({
    selector: 'app-location-level-selector',
    templateUrl: 'location-level-selector.component.html',
    styleUrls: ['location-level-selector.component.css'],
    providers: [CUSTOM_LOCATION_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None

})
export class LocationLevelSelectorComponent implements OnInit {
    val: any;

    @Input() companyId;

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() selectObject = false;
    @Output() selectedItem = new EventEmitter();

    locations: Location[];
    location: Location = new Location();
    selects: any;
    oldSelects: any;

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
                private locationService: LocationService,
                private elementRef: ElementRef) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    ngOnInit() {
        this.onChange(this.value);
        this.loadAll();
    }

    loadAll() {
        this.locationService.queryByOrder().subscribe(
            (res: HttpResponse<Location[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    empty() {
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
            if (!this.locations) {
                this.val = val;
            } else {
                if (this.multiSelect && val instanceof Array) {
                    this.selects = [];
                    val.forEach(value => {
                            if (typeof value === 'number' && this.selects.find(value_f => value_f.id === value) == null) {
                                const value_f = this.locations.find(value1 => value1.id === value);
                                if (this.selects.find(value_f => value_f.id === value) == null) {
                                    this.selects.push(value_f);
                                    this.onChange(this.value);
                                    this.onTouched();
                                }
                            }
                        }
                    );
                } else if (!this.multiSelect && typeof val === 'number') {
                    this.selects = this.locations.find(value1 => value1.id === val);
                    this.onChange(this.value);
                    this.onTouched();
                } else {
                    this.selects = undefined;
                }
            }
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
    }

    close() {
        this.overlayVisible = false;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }

    private onSuccess(data, headers) {
        this.locations = data;
        if (this.val) {
            this.value = this.val;
        }
        if (this.locations && this.locations.length && this.locations.length === 1) {
            this.onSelect(this.locations[0], true);
        }
        /*console.log(this.locations[0]);
        if(this.value==null){
            this.value=this.locations[0];
        }*/

    }

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
