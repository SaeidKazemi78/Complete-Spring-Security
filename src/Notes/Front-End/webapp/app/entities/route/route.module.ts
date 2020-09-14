import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    RouteService,
    RoutePopupService,
    RouteComponent,
    RouteDialogComponent,
    RoutePopupComponent,
    RouteDeletePopupComponent,
    RouteDeleteDialogComponent,
    routeRoute,
    routePopupRoute,
    RouteResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...routeRoute,
    ...routePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RouteComponent,
        RouteDialogComponent,
        RouteDeleteDialogComponent,
        RoutePopupComponent,
        RouteDeletePopupComponent,
    ],
    entryComponents: [
        RouteComponent,
        RouteDialogComponent,
        RoutePopupComponent,
        RouteDeleteDialogComponent,
        RouteDeletePopupComponent,
    ],
    providers: [
        RouteService,
        RoutePopupService,
        RouteResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayRouteModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
