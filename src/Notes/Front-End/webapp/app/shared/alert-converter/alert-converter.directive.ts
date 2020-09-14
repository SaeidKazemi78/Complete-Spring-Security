import {Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { JhiAlertType} from 'ng-jhipster';
import {Message} from 'primeng/api';

@Directive({
    selector: '[alert-converter]'
})
export class AlertConverterDirective implements OnChanges {
    @Input() alerts: string;
    @Output() onConvert: EventEmitter<any> = new EventEmitter();

    idUses = [];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.alerts && !changes.alerts.isFirstChange()) {
            let messages: Message[];
            messages = JSON.parse(this.alerts).filter(value => value.msg && this.idUses.indexOf(value.id) < 0).map(value => {
                this.idUses.push(value.id);
                return {
                    severity: this.getSeverity(value.type),
                    detail: value.msg,
                    id: value.id
                };
            });
            this.onConvert.emit(messages);
        }
    }

    private getSeverity(type: JhiAlertType) {
        if (type === 'danger') { return 'error'; }
        return type;
    }
}
