import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SalesCode } from './sales-code.model';
import { SalesCodeService } from './sales-code.service';

@Component({
    selector: 'jhi-sales-code-detail',
    templateUrl: './sales-code-detail.component.html'
})
export class SalesCodeDetailComponent implements OnInit, OnDestroy {

    salesCode: SalesCode;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private salesCodeService: SalesCodeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInSalesCodes();
    }

    load(id) {
        this.salesCodeService.find(id)
            .subscribe((salesCodeResponse: HttpResponse<SalesCode>) => {
                this.salesCode = salesCodeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSalesCodes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'salesCodeListModification',response => this.load(this.salesCode.id)
        );
    }
}
