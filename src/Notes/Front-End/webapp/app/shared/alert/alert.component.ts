import {Component, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Message, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-alert',
    template: `
        <p-toast alert-converter alerts="{{alerts | json}}" (onConvert)="showMessage($event)" position="top-center">
            <ng-template let-message pTemplate="message">
                <div style="margin-left: 10px">
                    <div [innerHTML]="message.detail"></div>
                </div>
            </ng-template>
        </p-toast>
    `,
    providers: [MessageService]
})
export class JhiAlertComponent implements OnInit, OnDestroy {
    alerts: any[];

    constructor(private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.alerts = this.alertService.get();

    }

    ngOnDestroy() {
        this.alerts = [];
    }

    showMessage(event: Message[]) {
        this.messageService.addAll(event);
    }

}
