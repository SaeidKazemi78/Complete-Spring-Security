import { Component, OnInit } from '@angular/core';

import { GatewayRoutesService } from './gateway-routes.service';
import {GatewayRoute, Health} from './gateway-route.model';

@Component({
    selector: 'jhi-gateway',
    templateUrl: './gateway.component.html',
    providers: [ GatewayRoutesService ]
})
export class JhiGatewayComponent implements OnInit {

    gatewayRoutes: GatewayRoute[];
    baseHealths: Health[];
    updatingRoutes: Boolean;

    constructor(
        private gatewayRoutesService: GatewayRoutesService
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.updatingRoutes = true;
        this.gatewayRoutesService.findAll().subscribe(gatewayRoutes => {
            this.gatewayRoutes = gatewayRoutes;
            this.updatingRoutes = false;
        });

        this.gatewayRoutesService.findAllBaseHealth().subscribe(baseHealths=>{
            this.baseHealths = baseHealths;
        });
    }
}
