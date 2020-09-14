import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {JhiParseLinks} from 'ng-jhipster';

import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Plaque, PlaqueService} from '../../entities/plaque';
import {DigitType, PlaqueRule, PlaqueRuleService} from '../../entities/plaque-rule';
import {Observable} from 'rxjs';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTransitPlaqueComponent),
    multi: true
};

@Component({
    selector: 'jhi-transit-plaque',
    templateUrl: './input-transit-plaque.component.html',
    styleUrls: ['./input-transit-plaque.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR/*,
     CUSTOM_INPUT_CONTROL_VALIDATOR*/],
    encapsulation: ViewEncapsulation.None
})
export class InputTransitPlaqueComponent implements OnInit {
    @Input() required = false;
    plaque: any;
    plaque1: any;
    plaque2: any;

    alphabet = ['A', 'B', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    customPlaques: any[];
    plaques: Plaque[];
    selectedPlaque: any;
    plaqueRules: PlaqueRule[];
    pattern: any;
    DigitType = DigitType;
    plaqueTitle: string;
    isCommon = false;
    isTransit = false;

    constructor(
        private plaqueService: PlaqueService,
        private plaqueRuleService: PlaqueRuleService
    ) {
    }

    ngOnInit(): void {
        this.loadAlphabet();
    }

    clear() {

    }

    loadAlphabet() {
        this.customPlaques = [];

                this.alphabet.forEach(alpha => {
                    this.customPlaques.push({label: alpha, value: alpha});
                });
    }

    onChangePlaque(plaqueId) {

    }

    /*
        @Input() disabled = false;
        @Input() required = false;
        @Input() transit = false;

        transitPlaque: any;
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
            private parseLinks: JhiParseLinks,
            private elementRef: ElementRef
        ) {
        }

        ngOnInit() {

        }*/

   /* writeValue(val: any) {
        console.log(val + ' ------------');
        if (val !== this.value) {
            this.value = val;
        }
    }

    onChangeTransit(event) {
        const value = event.target.value.replace(/ /g, '');
        this.transitPlaque = this.handleTransitPlaque(value);
        this.onChange(value);
        this.onTouched();
    }

    onChange: any = () => {
    }
    onTouched: any = () => {
    }

    private handleTransitPlaque(value) {
        if (value !== null && value !== undefined) {
            if (value.length <= 2 && value.length > 0) {
                return '     ' + value;
            } else if (value.length === 3) {
                return '     ' + value.substr(0, 2) + '    ' + value.charAt(2).toUpperCase();
            } else if (value.length > 3 && value.length <= 6) {
                return '     ' + value.substr(0, 2) + '    ' + value.charAt(2).toUpperCase() +
                    '     ' + value.substr(3, 3);
            } else if (value.length > 6 && value.length <= 8) {
                return '     ' + value.substr(0, 2) + '    ' + value.charAt(2).toUpperCase() +
                    '     ' + value.substr(3, 3) + '      ' + value.substr(6, 2);
            } else {
                return '';
            }
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    get value() {
        if (this.transitPlaque) {
            return this.transitPlaque.replace(/ /g, '');
        } else {
            return null;
        }
    }

    set value(val: any) {
        this.transitPlaque = this.handleTransitPlaque(val);
        this.onChange(val);
        this.onTouched();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];

        return result;
    }*/

}
