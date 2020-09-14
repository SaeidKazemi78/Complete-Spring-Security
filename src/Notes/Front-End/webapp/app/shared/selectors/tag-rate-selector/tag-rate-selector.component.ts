import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {JhiParseLinks} from 'ng-jhipster';

import {TagRate, TagRateService} from '../../../entities/tag-rate/.';
import {ITEMS_PER_PAGE} from '../../.';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {Location, LocationService} from '../../../entities/location/.';
import {LazyLoadEvent} from 'primeng/primeng';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagRateSelectorComponent),
    multi: true
};

@Component({
    selector: 'jhi-tag-rate-selector',
    templateUrl: './tag-rate-selector.component.html',
    styleUrls: ['./tag-rate-selector.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR/*,
     CUSTOM_INPUT_CONTROL_VALIDATOR*/],
    encapsulation: ViewEncapsulation.None
})
export class TagRateSelectorComponent implements OnInit {

    @Input() multiSelect = false;
    @Input() disabled = false;
    @Input() widthGrid = '100%';
    @Input() selectObject = false;
    @Output() selectedItem = new EventEmitter();

    @Input() tagRates: TagRate[];
    tagRate: TagRate = new TagRate();
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

    @Input() locationId: number;
    location: Location;

    locations: Location[];

    constructor(
        private tagRateService: TagRateService,
        private locationService: LocationService,
        private parseLinks: JhiParseLinks,
        private elementRef: ElementRef
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    loadAll() {
       /* this.tagRateService.queryByLocationAccess({
            query: this.currentSearch.length > 0 ? this.currentSearch : null,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res) => this.onSuccess(res.body, res.headers),
            (res) => this.onError(res.message)
        );*/
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.currentSearch = '';
        if (this.tagRate.sellPrice) {
            this.currentSearch += 'sellPrice☼' + this.tagRate.sellPrice + '&';
        }
        if (this.tagRate.startDate) {
            this.currentSearch += 'startDate→' + this.tagRate.startDate.toISOString() + '&';
        }
        if (this.tagRate.finishDate) {
            this.currentSearch += 'finishDate→' + this.tagRate.finishDate.toISOString() + '&';
        }
        if (this.tagRate.locationId) {
            this.currentSearch += 'location.id☼' + this.tagRate.locationId + '&';
        }
        if (this.currentSearch.length > 0) {
            this.currentSearch = this.currentSearch.substring(0, this.currentSearch.length - 1);
        }

        this.loadAll();
    }

    ngOnInit() {
        this.locationService.query().subscribe(res => {
                this.locations = res.body;
            }
        );
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
        } else {
            return null;
        }
    }

    set value(val: any) {
        if (this.selectObject) {
            if (!this.multiSelect && val instanceof Array) {
                this.selects = val.filter(value => value instanceof TagRate);
            } else if (!this.multiSelect && val instanceof TagRate) {
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
                            this.tagRateService.find(value).subscribe(res => {
                                    if (this.selects.find(value_f => value_f.id === value) == null) {
                                        this.selects.push(res.body);
                                        this.onChange(this.value);
                                        this.onTouched();
                                    }

                                },res => this.onError(res.body));
                        }
                    }
                );
            } else if (!this.multiSelect && typeof val === 'number') {
                this.tagRateService.find(val).subscribe(res => {
                        this.selects = res.body;
                        this.onChange(this.value);
                        this.onTouched();
                    },res => this.onError(res.body));
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
                this.selects = this.selects.filter(value2 => value2.id !== event.data.id);
            }
            this.selectedItem.emit(this.selects);
        } else {
            this.overlayVisible = false;
        }
    }

    showTable() {
        if (this.disabled === true) {
            return;
        }
        this.overlayVisible = !this.overlayVisible;
    }

    close() {
        this.overlayVisible = false;
    }

    trackId(index: number, item: TagRate) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    /*private onSuccess(data, headers) {
        // this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.tagRates = data;
    }
*/
    private onError(error) {
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

}
