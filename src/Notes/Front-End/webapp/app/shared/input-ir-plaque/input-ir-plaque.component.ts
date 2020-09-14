import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {Plaque, PlaqueService} from '../../entities/plaque';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputIrPlaqueComponent),
    multi: true
};

const CUSTOM_INPUT_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputIrPlaqueComponent),
    multi: true
};

@Component({
    selector: 'jhi-ir-plaque',
    templateUrl: './input-ir-plaque.component.html',
    styleUrls: ['./input-ir-plaque.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_VALIDATOR],
    encapsulation: ViewEncapsulation.None
})

export class InputIrPlaqueComponent implements OnInit, ControlValueAccessor, Validator, OnChanges {
    @Input() disabled = false;
    @Input() required = false;
    @Input() plaqueCode: any = null;
    @Input() plaque: any = null;
    @Input() name: string;
    @Input() searchMode = false;
    @Input() defaultTemplateCode;
    @Input() validValue = false;
    @Input() plaqueCodeFilter: string = null;
    @Output() selectedPlaqueCode = new EventEmitter<any>();

    @ViewChild('part1') part1: ElementRef;
    @ViewChild('part2') part2: ElementRef;
    @ViewChild('part3') part3: ElementRef;
    @ViewChild('part4') part4: ElementRef;
    @ViewChild('part5') part5: ElementRef;
    @ViewChild('part6') part6: ElementRef;
    @ViewChild('part7') part7: ElementRef;
    @ViewChild('part8') part8: ElementRef;
    @ViewChild('part9') part9: ElementRef;

    _plaque: any = {
        part1: null,
        part2: null,
        part3: null,
        part4: null,
        part5: null,
        part6: null,
        part7: null,
        part8: null,
        part9:null
    };
    plaques: Plaque[];
    customPlaques: any[];
    alphabetOptions = [];
    enAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    alphabet = ['الف', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی'];
    _afghCities = ['AFG', 'KBL'];
    pattern: any;

    constructor(
        private plaqueService: PlaqueService
    ) {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.plaqueCodeFilter && !changes.plaqueCodeFilter.isFirstChange()) {
            this.plaqueCodeFilter = changes.plaqueCodeFilter.currentValue;
            this.loadPlaques();
        }
    }

    get value() {
        return this.plaque ?
            {
                plaque: this.plaque,
                plaqueCode: this.plaqueCode,
                search: (this.searchMode && (this.plaqueCode === 'IR' || this.plaqueCode === 'TR' || this.plaqueCode === 'AFGH')) ?
                    this.pad(this._plaque.part1, 2) + this.pad(this._plaque.part2, 1) + this.pad(this._plaque.part5, 1)
                    + this.pad(this._plaque.part3, 3) + this.pad(this._plaque.part4, 2) + this.pad(this._plaque.part6, 1)
                    + this.pad(this._plaque.part7, 8) + this.pad(this._plaque.part8, 3) :
                    this.plaque
            } :
            null;

    }

    set value(plaque: any) {
        if (plaque) {
            this.plaque = plaque.plaque;
            this.plaqueCode = plaque.plaqueCode;
            this.selectedPlaqueCode.emit(this.plaqueCode);
        }
    }

    pad(str, max) {
        str = str ? str : '';
        let i: number;
        let strR = '';
        for (i = 0; i < max - str.length; i++) {
            strR += '_';
        }

        return str + strR;
    }

    onChanged(value) {
        this.onChange(value);
        this.onTouched();
        this._onValidatorChange();
    }

    ngOnInit(): void {
        this.loadPlaques();
    }

    loadPlaques() {
        this.plaqueService.findAll()
            .subscribe(res => {
                this.plaques = res.body;
                if (!this.plaqueCode) {
                    this.onChangePlaqueSelect(this.defaultTemplateCode);
                }
                this.customPlaques = [];

                this.customPlaques.push({
                    value: 'IR',
                    label: 'انتظامی'
                });

                this.customPlaques.push({
                    value: 'TR',
                    label: 'ترانزیت'
                });

                this.customPlaques.push({
                    value: 'AFGH',
                    label: 'افغانستان'
                });

                this.customPlaques.push({
                    value: 'TURK',
                    label: 'ترکمنستان'
                });

                for (let i = 0; i < this.plaques.length; i++) {
                    this.customPlaques.push({
                        value: this.plaques[i].code,
                        label: this.plaques[i].title
                    });
                }
                if (this.plaqueCode && this.plaqueCode !== 'IR' && this.plaqueCode !== 'TR' && this.plaqueCode !== 'AFGH' && this.plaqueCode !== 'TURK') {
                    this.loadPlaqueRules(this.plaqueCode);
                }

                if (this.plaqueCodeFilter && (this.plaqueCodeFilter == 'IR' || this.plaqueCodeFilter == 'TR' || this.plaqueCodeFilter == 'AFGH' || this.plaqueCode === 'TURK')) {
                    this.customPlaques = this.customPlaques.filter((value1, index) => {
                        return !(value1.value == this.plaqueCodeFilter);
                    });
                }

            });
    }

    loadPlaqueRules(plaqueCode: any) {
        this.plaques.forEach(p => {
            if (p.code === plaqueCode) {
                if (!this.searchMode && p.pattern) {
                    this.pattern = new RegExp(p.pattern);
                } else {
                    this.pattern = /.*/;
                    this.plaqueCode = plaqueCode;
                }
            }
            this.onChanged(this.value);
        });

    }

    loadAlphabet(type: string) {
        this.alphabetOptions = [];

        switch (type) {
            case 'IR':
                this.alphabetOptions = this.alphabet;
                this.pattern = new RegExp('^\\d{2}(الف|[ا-ی])\\d{5}$');
                break;
            case 'TR':
                this.alphabetOptions = this.enAlphabet;
                this.pattern = new RegExp('^\\d{2}[A-W]{1,2}\\d{5}$');
                break;
            case 'AFGH':
                this.alphabetOptions = this.alphabet;
                this.pattern = new RegExp('^(الف|[ا-ی])\\d{5,8}[A-Z]{3}$');
                break;
            case 'TURK':
                this.alphabetOptions = this.alphabet;
                this.pattern = new RegExp('^(([A-Za-z]{2}\\d{4}[A-Za-z]{2})|(\\d{4}[A-Za-z]{3}))$');
                break;
        }

    }

    onChangeMainInput(plaque) {

        if (new RegExp('^\\d{2}(الف|[ا-ی])\\d{5}$').test(plaque)) {
            this.plaqueCode = 'IR';
            this.loadAlphabet('IR');
            this.extendPlaque(plaque);

        }

        if (new RegExp('^\\d{2}[A-W]{1,2}\\d{5}$').test(plaque)) {
            this.plaqueCode = 'TR';
            this.loadAlphabet('TR');
            this.extendPlaque(plaque);

        }

        if (new RegExp('^(الف|[ا-ی])\\d{5,8}[A-Z]{3}$').test(plaque)) {
            this.plaqueCode = 'AFGH';
            this.loadAlphabet('AFGH');
            this.extendPlaque(plaque);

        }

        if (new RegExp('^(([A-Za-z]{2}\\d{4}[A-Za-z]{2})|(\\d{4}[A-Za-z]{3}))$').test(plaque)) {
            this.plaqueCode = 'TURK';
            this.loadAlphabet('TURK');
            this.extendPlaque(plaque);

        }
        this.onChange(this.value)
    }

    onBlur(element: string) {
        switch (element) {
            case 'part1':
            case 'part2':
            case 'part5':
            case 'part3':
            case 'part4':
            case 'part6':
            case 'part7':
            case 'part8':
                this.plaque =
                    (this._plaque.part1 ? this._plaque.part1 : '') +
                    (this._plaque.part2 ? this._plaque.part2 : '') +
                    (this._plaque.part5 ? this._plaque.part5 : '') +
                    (this._plaque.part3 ? this._plaque.part3 : '') +
                    (this._plaque.part4 ? this._plaque.part4 : '') +
                    (this._plaque.part6 ? this._plaque.part6 : '') +
                    (this._plaque.part7 ? this._plaque.part7 : '') +
                    (this._plaque.part8 ? this._plaque.part8 : '') +
                    (this._plaque.part9 ? this._plaque.part9 : '');

                if (this._plaque.part5 && (this.plaqueCode === 'IR' || this.plaqueCode === 'AFGH' ||  this.plaqueCode === 'TURK')) {
                    this._plaque.part5 = '';
                }

                /*if (this.searchMode) {
                    const val = {
                        plaque: this.plaque, plaqueCode: this.plaqueCode,
                        part1: this._plaque.part1, part2: this._plaque.part2, part3: this._plaque.part3 + this._plaque.part4
                    };
                    this.onChanged(val);
                } else if (this.validValue) {
                    if (this.pattern && this.pattern.test(this.plaque)) {
                        this.onChanged({plaque: this.plaque, plaqueCode: this.plaqueCode});
                    } else {
                        this.onChanged(null);
                    }

                } else {
                    this.onChanged({plaque: this.plaque, plaqueCode: this.plaqueCode});
                }*/
                this.onChanged(this.value);
                break;
            case 'plaque':
                this.onChanged(this.value);
                break;
            default :
                return;
        }

    }

    onselectAlphabet() {
        this.part3.nativeElement.focus();
    }

    onselectAfghAlphabet() {
        this.part7.nativeElement.focus();
    }

    onChangeText(value, key) {
        this.onBlur(key);
        if (key === 'part1' && value.length >= 2) {
            this.part2.nativeElement.focus();
        }
        if (key === 'part2') {
            if (this.plaqueCode && this.plaqueCode == "TR")
                this.part3.nativeElement.focus();
        }
        if (key === 'part3' && value.length >= 3) {
            this.part4.nativeElement.focus();
        }
        if (key === 'part4' && value.length >= 2) {
            this.onBlur('plaque');
        }
        if (key === 'part5') {
            this.part3.nativeElement.focus();
        }

        if (key === 'part7' && value.length >= 8) {
            this.part8.nativeElement.focus();
        }
    }

    extendPlaque(plaque) {
        if (this.plaqueCode !== 'AFGH' && this.plaqueCode !== 'TURK') {

            this._plaque.part6 = null;
            this._plaque.part7 = null;
            this._plaque.part8 = null;
            this._plaque.part9 = null;

            let index = 0;
            this._plaque.part1 = plaque.substring(index, index + 2);
            index += 2;
            if (plaque.substring(index, index + 3) === 'الف') {
                this.onFindPlaqueType(plaque);
            } else {
                if (new RegExp('^[a-z]$').test(plaque.substring(index, index + 1))) {
                    this._plaque.part2 = plaque.substring(index, index + 1).toUpperCase();
                    this._plaque.part5 = plaque.substring(index + 1, index + 2).toUpperCase();
                    this._plaque.part3 = plaque.substring(index + 2, index + 5).toUpperCase();
                    // this._plaque.part4 = plaque.substring(index + 4, index + 5).toUpperCase();
                } else {
                    if (plaque.length === 9) {
                        this._plaque.part2 = plaque.substring(index, index + 1);
                        this._plaque.part5 = plaque.substring(index + 1, index + 2);
                        this._plaque.part3 = plaque.substring(index + 2, index + 5);
                        this._plaque.part4 = plaque.substring(index + 5, index + 7);
                    } else {
                        this.onFindPlaqueType(plaque);
                    }
                }
            }
        } else if(this.plaqueCode !== 'AFGH') {

            this._plaque.part1 = null;
            this._plaque.part2 = null;
            this._plaque.part5 = null;
            this._plaque.part3 = null;
            this._plaque.part4 = null;
            this._plaque.part9 = null;

            this._plaque.part6 = plaque.substring(0, 1);
            this._plaque.part7 = plaque.substring(1, plaque.length - 3);
            this._plaque.part8 = plaque.substring(plaque.length - 3, plaque.length);
        }else{
            this._plaque.part1 = null;
            this._plaque.part2 = null;
            this._plaque.part5 = null;
            this._plaque.part3 = null;
            this._plaque.part4 = null;

            this._plaque.part6 = null;
            this._plaque.part7 = null;
            this._plaque.part8 = null;

            this._plaque.part9 = plaque;
        }
    }

    onFindPlaqueType(plaque) {
        let index = 2;
        this._plaque.part2 = plaque.substring(index, index + 1);
        if (plaque.substring(index, index + 3) === 'الف') {
            this._plaque.part2 = plaque.substring(index, index + 3);
            index += 2;
        }
        this._plaque.part3 = plaque.substring(index + 1, index + 4);
        this._plaque.part4 = plaque.substring(index + 4, index + 6);
        return this._plaque;
    }

    onChangePlaqueSelect(value) {
        this.selectedPlaqueCode.emit(value);
        switch (value) {
            case 'IR':
                this.loadAlphabet(value);
                this.plaqueCode = value;
                this._plaque.part6 = '';
                this._plaque.part7 = '';
                this._plaque.part8 = '';
                this._plaque.part9 = '';
                break;
            case 'TR':
                this.loadAlphabet(value);
                this.plaqueCode = value;
                this._plaque.part6 = '';
                this._plaque.part7 = '';
                this._plaque.part8 = '';
                this._plaque.part9 = '';
                break;
            case 'AFGH':
                this.loadAlphabet(value);
                this.plaqueCode = value;
                this._plaque.part1 = '';
                this._plaque.part2 = '';
                this._plaque.part3 = '';
                this._plaque.part4 = '';
                this._plaque.part5 = '';
                this._plaque.part9 = '';
                break;
            case 'TURK':
                this.loadAlphabet(value);
                this.plaqueCode = value;
                this._plaque.part1 = '';
                this._plaque.part2 = '';
                this._plaque.part3 = '';
                this._plaque.part4 = '';
                this._plaque.part5 = '';
                this._plaque.part6 = '';
                this._plaque.part7 = '';
                this._plaque.part8 = '';
                break;
            case '':
                this.plaqueCode = null;
                this.pattern = new RegExp('^.*$');
                break;

            default:
                if (value) {
                    this.plaqueCode = value;
                    this.loadPlaqueRules(value);
                }
        }

        this.onChanged(this.value);

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

    writeValue(plaque: any): void {
        if (plaque && (plaque.plaque || plaque.plaqueCode)) {
            this.plaqueCode = plaque.plaqueCode;
            this.plaque = plaque.plaque;

            if (this.plaqueCode === 'IR' || this.plaqueCode === 'TR' || this.plaqueCode === 'AFGH'|| this.plaqueCode === 'TURK') {
                this.loadAlphabet(this.plaqueCode);
                this.extendPlaque(this.plaque);
            } else {
                this.loadPlaqueRules(this.plaqueCode);
            }

        } else {
            this._plaque = {};
            this.plaque = null;
        }

        this.onChanged(this.value);
    }

    validatePlaque() {
        if (this.plaque && this.pattern) {
            return this.pattern.test(this.plaque);
        } else {
            return true;
        }
    }

    _onValidatorChange: any = () => {
    };

    registerOnValidatorChange(fn: () => void): void {
        this._onValidatorChange = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    validate(control: AbstractControl): { [key: string]: any } | null | null {
        return this.searchMode || this.validatePlaque() ? null : {'wrong': {value: control.value}};
    }

}
