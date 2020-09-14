import {Component, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-alert-success',
    template: `<jhi-alert></jhi-alert>`
})
export class JhiAlertSuccessComponent implements OnInit, OnDestroy {
    alerts: any[] = [];
    cleanHttpSuccessListener: Subscription;

    constructor(private alertService: JhiAlertService,
                private eventManager: JhiEventManager) {

        this.cleanHttpSuccessListener = eventManager.subscribe('niopdcgatewayApp.httpSuccess', response => {
            if (!this.alertService.get().find(value => value.msg === response.content.alert)) {
                this.alertService.success(response.content.alert, {param: response.content.alertParam}, null);
            }
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.alerts = [];
        if (this.cleanHttpSuccessListener !== undefined && this.cleanHttpSuccessListener !== null) {
            this.eventManager.destroy(this.cleanHttpSuccessListener);
            // this.alerts = [];
        }
    }

}
