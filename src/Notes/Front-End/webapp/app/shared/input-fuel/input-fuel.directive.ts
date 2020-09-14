import {Directive, HostListener, Input, ElementRef, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';
import {log} from 'util';

@Directive({
    selector: '[fuel]'
})
export class InputFuelDirective implements OnInit {
    @Input() fuel: any;
    lastValue = '';

    constructor(private element: ElementRef, private model: NgModel) {
    }

    @HostListener('input')
    public onChange(): void {
        const value = this.getValue();
        if (this.fuel) {
            let max = this.fuel.max;
            if (this.fuel.max != null && isNaN(this.fuel.max)) {
                max = 0;
            }
            let min = this.fuel.min;
            if (this.fuel.min != null && isNaN(this.fuel.min)) {
                min = 0;
            }

            if (min != null && min < 0 && +value < min) {
                this.setValue(min);
            }

            if (max != null && max > 0 && +value > max) {
                this.setValue(max);
            }
        }
    }

    @HostListener('keypress', ['$event'])
    public onKeyPress(event): void {
        // todo
        if (!this.getKeyRegex().test(event.key)) {
            event.preventDefault();
        }
    }

    @HostListener('blur', ['$event'])
    public onBlur(event): void {
        const value = this.getValue();
        this.applyNumeric(value);
    }

    public ngOnInit(): void {
        const value = this.getValue();
        this.applyNumeric(value);
    }

    private getValue(): string {
        return this.element.nativeElement.value;
    }

    private setValue(value: string): void {
        this.element.nativeElement.value = value;
        if (this.model) {
            this.model.update.emit(value);
        }
        this.lastValue = value;
    }

    private getKeyRegex() {
        if (!this.fuel || !this.fuel.keyRegex) {
            return new RegExp(/^\d*(\.)?$/, 'gi');
        } else {
            return new RegExp(this.fuel.keyRegex, 'gi');
        }
    }

    private getRegex() {
        if (this.fuel && this.fuel.regex) {
            return new RegExp(this.fuel.regex, 'gi');
        } else {
            return new RegExp(/^[0-9]+(\.[0-9])?$/, 'gi');
        }
    }

    private applyNumeric(value: string) {
        if (!value) {
            return;
        }

        if (this.fuel) {
            let max = this.fuel.max;
            if (this.fuel.max != null && isNaN(this.fuel.max)) {
                max = 0;
            }
            let min = this.fuel.min;
            if (this.fuel.min != null && isNaN(this.fuel.min)) {
                min = 0;
            }

            if (min != null && +value < min) {
                this.setValue(min);
                return;
            }

            if (max != null && +value > max) {
                this.setValue(max);
                return;
            }
        }

        if (!this.getRegex().test(value)) {
            const parts = value.split('.');
             if (parts && parts.length === 2 && parts[0].length > 0 && parts[1].length > 0) {
                 this.setValue(parts[0] + '.' + parts[1].substr(0, 1));
             } else {
                 this.setValue('0');
             }

        } else {
            this.setValue(value);
        }
    }
}
