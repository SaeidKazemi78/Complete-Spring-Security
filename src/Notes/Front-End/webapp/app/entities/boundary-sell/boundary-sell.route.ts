import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {BoundarySellDialogComponent} from '../boundary-sell/boundary-sell-dialog.component';
import {BoundarySellComponent} from '../boundary-sell/boundary-sell.component';
import {BoundarySellReportComponent} from '../boundary-sell/boundary-sell-report.component';
import {shiftWorkOpenClosePopupRoute} from 'app/entities/shift-work';
import {boundaryCustomerPopupRouteEdit} from 'app/entities/customer/boundary-customer.route';
import {BoundarySellConfirmPopupComponent} from 'app/entities/boundary-sell/boundary-sell-confirm-dialog.component';
import {BoundarySellDeletePopupComponent} from 'app/entities/boundary-sell/boundary-sell-delete-dialog.component';
import {BoundarySellDeActivePopupComponent} from 'app/entities/boundary-sell/boundary-sell-de-active-dialog.component';
import {BoundarySellActivePopupComponent} from 'app/entities/boundary-sell/boundary-sell-active-dialog.component';
@Injectable({providedIn: 'root'})
export class BoundarySellResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'registerDate,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const boundarySellRoute: Routes = [
    {
        path: ':orderId/print',
        component: BoundarySellReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PRINT_BOUNDARY_CUSTOMER_REPORT'],
            pageTitle: 'niopdcgatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: '',
        component: BoundarySellComponent,
        resolve: {
            'pagingParams': BoundarySellResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_TRANSIT_LIST','ROLE_BOUNDARY_TRANSHIP_LIST'],
            pageTitle: 'niopdcgatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BoundarySellDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL',
                'PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL',
                'ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL',
                'PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL'],
            pageTitle: 'niopdcgatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService],
        children: [...boundaryCustomerPopupRouteEdit]
    },
    {
        path: 'new/:activeIndex',
        component: BoundarySellDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL',
                'PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL',
                'ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL',
                'PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL'],
            pageTitle: 'niopdcgatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService],
        children: [...boundaryCustomerPopupRouteEdit, ...shiftWorkOpenClosePopupRoute]
    },
    {
        path: ':orderId/edit',
        component: BoundarySellDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BOUNDARY_SELL'],
            pageTitle: 'niopdcgatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService],
        children: [...boundaryCustomerPopupRouteEdit, ...shiftWorkOpenClosePopupRoute]
    },
    {
        path: ':orderId/edit/:activeIndex',
        component: BoundarySellDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BOUNDARY_SELL'],
            pageTitle: 'niopdcgatewayApp.order.home.boundarySell'
        },
        canActivate: [UserRouteAccessService],
        children: [...boundaryCustomerPopupRouteEdit, ...shiftWorkOpenClosePopupRoute]
    },
    {
        path: ':id/print',
        component: BoundarySellReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PRINT_BOUNDARY_CUSTOMHOUSE_REPORT',
                'PRINT_BOUNDARY_CUSTOMER_REPORT',
                'PRINT_BOUNDARY_ARCHIVES_REPORT',
                 'PRINT_DRAFT_BOUNDARY_REPORT'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':customerId/car-tank',
        loadChildren: '../car-tank/car-tank.module#NiopdcgatewayCarTankModule'
    }
];

export const boundarySellPopupRoute: Routes = [

    {
        path: 'confirm/:id',
        component: BoundarySellConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CUSTOMS_CONFIRM_BOUNDARY','BORDER_CONFIRM_BOUNDARY'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path:':id/active',
        component:BoundarySellActivePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DE_ACTIVE_BOUNDARY_SELL'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/de-active',
        component: BoundarySellDeActivePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DE_ACTIVE_BOUNDARY_SELL'],
            pageTitle: 'niopdcgatewayApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: ':id/delete',
        component: BoundarySellDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_BOUNDARY_SELL'],
            pageTitle: 'niopdcgatewayApp.order.home.title',
            mode: 'boundary-sell'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
