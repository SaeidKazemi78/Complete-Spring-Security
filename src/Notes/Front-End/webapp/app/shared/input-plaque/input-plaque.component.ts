import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from '@angular/forms';
import {Plaque, PlaqueService} from '../../entities/plaque';
import {DigitType, PlaqueRule, PlaqueRuleService} from '../../entities/plaque-rule';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPlaqueComponent),
    multi: true
};

const CUSTOM_INPUT_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputPlaqueComponent),
    multi: true
};

@Component({
    selector: 'jhi-plaque',
    templateUrl: './input-plaque.component.html',
    styleUrls: ['./input-plaque.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_VALIDATOR],
    encapsulation: ViewEncapsulation.None
})

export class InputPlaqueComponent implements OnInit, ControlValueAccessor, Validator {
    @Input() disabled = false;
    @Input() required = false;
    @Input() plaqueId: number;
    @Input() name: string;
    plaque: any;
    customPlaques: any[];
    plaques: Plaque[];
    selectedPlaque: any;
    plaqueRules: PlaqueRule[];
    pattern: any;
    DigitType = DigitType;
    plaqueTitle: string;
    @Output() selectedItem = new EventEmitter();

    constructor(
        private plaqueService: PlaqueService,
        private plaqueRuleService: PlaqueRuleService
    ) {
    }

    ngOnInit(): void {
        this.loadPlaques();
    }

    loadPlaques() {
        this.plaqueService.query()
            .subscribe(res => {
                this.plaques = res.body;
                const plaque = {
                    value: null,
                    label: ''
                };
                this.customPlaques = [];
                this.customPlaques.push(plaque);
                for (let i = 0; i < this.plaques.length; i++) {
                    this.customPlaques.push({
                        value: this.plaques[i].id,
                        label: this.plaques[i].title
                    });
                }
                if (this.plaqueId) {
                    this.selectedPlaque = this.plaqueId;
                    this.loadPlaqueRules(this.plaqueId);
                }
            });
    }

    loadPlaqueRules(plaqueId: number) {
        this.plaqueRuleService.query(plaqueId)
            .subscribe(plaqueRules => {
                this.plaqueRules = plaqueRules.body;
                this.generatePattern(this.plaqueRules);
            });
    }

    onChangePlaque(plaqueId) {
        if (plaqueId) {
            this.selectedItem.emit(this.plaques.find(value1 => value1.id === plaqueId));
            this.loadPlaqueRules(plaqueId);
        }
    }

    generatePattern(pr: PlaqueRule[]) {
        let pat = '^';
        pr.sort((a, b) => {
            return a.priority - b.priority;
        });
        pr.forEach(p => {
            if (p.digitType === this.DigitType[this.DigitType.PERSIAN_WORD]) {
                pat += '[آ-ی]{' + p.digit + '}';
            } else if (p.digitType === this.DigitType[this.DigitType.ENGLISH_WORD]) {
                pat += '[a-zA-z]{' + p.digit + '}';
            } else if (p.digitType === this.DigitType[this.DigitType.NUMBER]) {
                pat += '[۰-۹0-9]{' + p.digit + '}';
            }
        });
        pat += '$';
        this.pattern = new RegExp(pat);
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
        if (this.plaque) {
            return this.plaque;
        } else {
            return null;
        }
    }

    set value(val: any) {
        this.plaque = val;
        this.onChange(val);
        this.onTouched();
    }

    onChangeText(value) {
        this.plaque = value;
        this.onChange(value);
        this.onTouched();
    }

    selectPlaque(plaque) {
        this.plaqueTitle = plaque.title;
        this.loadPlaqueRules(plaque.id);
    }

    validatePlaque() {
        if (this.pattern) {
            return this.pattern.test(this.plaque);
        } else {
            return true;
        }
    }

    registerOnValidatorChange(fn: () => void): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.validatePlaque() ? null : {'wrong': {value: c.value}};
    }
}
