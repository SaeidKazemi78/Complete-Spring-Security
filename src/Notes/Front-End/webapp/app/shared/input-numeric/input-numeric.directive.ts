import {Directive, HostListener, Input, ElementRef, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';
import {log} from 'util';

@Directive({
    selector: '[numeric]'
})
export class InputNumericDirective implements OnInit {
    @Input() numeric: any;
    lastValue = '';

    constructor(private element: ElementRef, private model: NgModel) {
    }

    @HostListener('input')
    public onChange(): void {
        const value = this.getValue();
        if (this.numeric) {
            let max = this.numeric.max;
            if (this.numeric.max != null && isNaN(this.numeric.max)) {
                max = 0;
            }
            let min = this.numeric.min;
            if (this.numeric.min != null && isNaN(this.numeric.min)) {
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
    @HostListener('keyup', ['$event'])
    public onKeyUp(event): void {
        console.log(event);
        /*if (!this.getKeyRegex().test(event.key)) {
            event.preventDefault();
        }*/
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
        if (!this.numeric || !this.numeric.keyRegex) {
            return new RegExp(/\d/, 'gi');
        } else {
            return new RegExp(this.numeric.keyRegex, 'gi');
        }
    }

    private getRegex() {
        if (this.numeric && this.numeric.regex) {
            return new RegExp(this.numeric.regex, 'gi');
        } else {
            return new RegExp(/^\d*$/, 'gi');
        }
    }

    private applyNumeric(value: string) {
        if (!value) {
            return;
        }

        if (this.numeric) {
            let max = this.numeric.max;
            if (this.numeric.max != null && isNaN(this.numeric.max)) {
                max = 0;
            }
            let min = this.numeric.min;
            if (this.numeric.min != null && isNaN(this.numeric.min)) {
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
            if (this.numeric && this.numeric.use != null) {
                this.setValue(this.numeric.use);
            } else if (this.numeric && this.numeric.last != null && this.numeric.last) {
                this.setValue(this.lastValue);
            }
        } else {
            this.setValue(value);
        }
    }
}
