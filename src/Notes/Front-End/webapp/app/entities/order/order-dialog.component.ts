import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DepotStatus, FlightConditions, ForcibleOrder, Order, OrderCredit, OrderPrePay, OrderProduct, OrderStatus, OrderType, TypeOfFuelReceipt} from './order.model';

import {OrderService} from './order.service';
import {CustomerService} from '../customer';
import {Currency, CurrencyService} from '../currency';
import {SellContractService} from '../sell-contract';
import {SellContractProduct, SellContractProductService} from '../sell-contract-product';
import {Depot, DepotService} from '../depot';
import {TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/primeng';
import {CreditBuyTypeRemained, CustomerCreditService} from '../customer-credit';
import {CostGroupService, CostMethod} from '../cost-group';
import {BuyGroup, BuyTypeService} from '../buy-type';
import {PersonService} from '../person';
import {CostService} from '../cost';
import {RefuelCenter, RefuelCenterService} from '../ao-entities/refuel-center';
import {DayDepot, DayDepotService} from '../ao-entities/day-depot';
import {LogBook, LogBookService} from '../ao-entities/log-book';
import {OilTankType} from '../ao-entities/oil-tank';
import {Metre, MetreService} from '../ao-entities/metre';
import {FuelType} from '../ao-entities/metre-log';
import {BankTransactionService} from '../bank-transaction';
import {Airport, AirportService} from '../ao-entities/airport';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {CustomerGroup} from '../customer-type';
import {CustomerOrderCapacity} from '../customer-order-capacity';
import {CustomerPerson} from '../../shared/selectors/sell-contract-customer-person-selector/sell-contract-customer-person-selector.model';
import {ShiftWork, ShiftWorkService} from '../shift-work';
import {ProductRateService} from '../product-rate';
import {Subscription} from 'rxjs/Subscription';
import {NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';
import {Principal} from 'app/shared';
import {CustomerDeactiveRuleService} from 'app/entities/customer-deactive-rule';

@Component({
    selector: 'jhi-order-dialog',
    templateUrl: './order-dialog.component.html',
    styleUrls: ['./order-dialog.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class OrderDialogComponent implements OnInit {
    // enums
    OrderType = OrderType;
    OrderStatus = OrderStatus;
    BuyGroup = BuyGroup;
    CustomerGroup = CustomerGroup;
    FlightConditions = FlightConditions;
    TypeOfFuelReceipt = TypeOfFuelReceipt;
    OilTankType = OilTankType;
    FuelType = FuelType;
    CostMethod = CostMethod;
    isDeactiveCustomer: boolean = false;
    // params
    mode: any;
    activeIndex = 0;
    id: number;

    items: MenuItem[] = [];

    currentAccount;
    breadCrumbs: any;
    isView: boolean;
    mustPaid: boolean;
    isOrderProductEditing: boolean;
    isSaving: boolean;
    isLoading: boolean;
    errorLoad: boolean;
    hasAccessForRegisterOrder: boolean;

    order: Order = new Order();
    eventSubscriber: Subscription;
    DepotStatus = DepotStatus;
    // activeIndex = 0
    loadOrder: any = {};
    dateNow = new Date();
    customerPerson: CustomerPerson;
    shiftWork: ShiftWork;
    depots: Depot[];
    depot: Depot;
    currencies: Currency[];
    buyGroups: BuyGroup[];

    typeOfFuelReceipts: TypeOfFuelReceipt[];
    sourceAirports: Airport[];
    targetAirports: Airport[];
    creditBuyTypeRemainedList: CreditBuyTypeRemained[];

    // activeIndex = 1
    customerOrderCapacities: CustomerOrderCapacity[];

    isCustomerOrderCapacity: boolean;

    orderProduct: OrderProduct;
    metre: Metre;
    conflictMetreNumber: boolean;
    tempOrderProduct: OrderProduct[]; // for edit cancel
    sellContractProducts: SellContractProduct[];
    sellContractProduct: SellContractProduct;
    sellContractProductAlreadyAdded = false;

    metres: Metre[];

    // activeIndex = 3
    orderCredit: OrderCredit[];
    orderQuota: OrderCredit[];

    hasCreditNotDepositedInTime = false;

    summary: string;
    payId: string;
    payStatus: string;
    payEnable;
    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;
    carAmounts: number[] | null;
    maxCarAmount: number;
    logBook: LogBook;
    dayDepots: DayDepot[];
    dayDepot: DayDepot;

    isForcible: boolean = false;
    forcibleOrder: ForcibleOrder;

    constructor(private router: Router,
                public route: ActivatedRoute,
                private translateService: TranslateService,
                private jhiAlertService: JhiAlertService,
                private sellContractService: SellContractService,
                private orderService: OrderService,
                private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
                private logBookService: LogBookService,
                private metreService: MetreService,
                private currencyService: CurrencyService,
                private costGroupService: CostGroupService,
                private customerCreditService: CustomerCreditService,
                private depotService: DepotService,
                private buyTypeService: BuyTypeService,
                private dayDepotService: DayDepotService,
                private shiftWorkService: ShiftWorkService,
                private sellContractProductService: SellContractProductService,
                private customerService: CustomerService,
                private activatedRoute: ActivatedRoute,
                private costService: CostService,
                private productRateService: ProductRateService,
                private refuelCenterService: RefuelCenterService,
                private airportService: AirportService,
                private personService: PersonService,
                private _hotkeysService: HotkeysService,
                private principal: Principal,
                private bankTransactionService: BankTransactionService,
                private eventManager: JhiEventManager,
                private customerDeactiveRuleService: CustomerDeactiveRuleService) {
        this.route.queryParams.subscribe(qParams => {
            this.mode = qParams['mode'];
        });
    }

    // todo move to util or directive
    invertColor(hex) {
        if (hex == null || !hex) {
            return '#000000';
        }
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        // invert color components
        const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + this.padZero(r, 2) + this.padZero(g, 2) + this.padZero(b, 2);
    }

    padZero(str, len) {
        len = len || 2;
        const zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.hasAccessForRegisterOrder = true;
        this._hotkeysService.add(new Hotkey(['esc'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'esc') {
                this.router.navigate(['order'], {queryParams: {mode: this.mode}});
                return false;
            }
        }));

        this.isSaving = false;
        this.route.params.subscribe(params => {

            // todo dar zaman piade sazi sayer noe ha ezafe shvad

            if (!this.mode || !['airplane', 'order', 'refuel-center', 'export'].includes(this.mode)) {
                this.router.navigate(['order'], {queryParams: {mode: this.mode}});
                return;
            }

            if (!params['activeIndex']) {
                this.activeIndex = 0;
            } else if (!['product', 'payment-list', 'payment', 'ticket', 'way-bill'].includes(params['activeIndex'])) {
                this.router.navigate(['order', params['id'], 'edit'], {queryParams: {mode: this.mode}});
            } else if (params['activeIndex'] === 'product') {
                this.activeIndex = 1;
            } else if (params['activeIndex'] === 'payment-list') {
                this.activeIndex = 2;
            } else if (params['activeIndex'] === 'payment') {
                this.activeIndex = 3;
            } else if (params['activeIndex'] === 'ticket' || params['activeIndex'] === 'way-bill') {
                this.activeIndex = 4;
            }
            this.id = params['id'];

            this.eventSubscribers();
            this.loadActiveIndex();

        });

    }

    loadActiveIndex() {

        if (this.id) {
            this.isLoading = true;
            this.errorLoad = false;
            if (this.activeIndex === 0) {
                this.orderService.find(this.id).subscribe(order => {
                    this.order = order.body;
                    this.orderService.existForcibleOrder(this.order.customerId)
                        .subscribe((value) => {
                            this.forcibleOrder = value.body;
                            if (this.forcibleOrder && this.forcibleOrder.id) {
                                this.isForcible = true;
                                this.order.depotId = this.forcibleOrder.realDepotId;
                                this.order.locationId = this.forcibleOrder.locationId;
                                this.isView = true;
                                this.addForcibleOrderProduct();

                                // this.isOrderProductEditing = false;
                            } else {
                                this.isForcible = false;
                            }
                        }, (error) => {
                            this.isForcible = false;
                            this.onError(error);
                        });
                    if (this.order.orderType == 'ORDER' && (this.order.status == null || this.order.status == 'DRAFT')) {
                        this.checkCustomerDeactiveSell();
                    }

                    if (this.order.orderType == 'ORDER' && !this.creditBuyTypeRemainedList) {
                        this.getAllCreditBuyTypeRemaine(this.order.customerId);
                    }

                    this.isView = this.order.status !== OrderStatus[OrderStatus.DRAFT];
                    this.mustPaid = this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.status === OrderStatus[OrderStatus.PENDING];
                    this.order.orderProducts = this.order.orderCredits = [];
                    this.loadOrder = {
                        shiftWorkId: this.order.shiftWorkId,
                        locationId: this.order.locationId,
                        customerId: this.order.customerId,
                        personId: this.order.personId,
                        sellContractId: this.order.sellContractId,
                        depotId: this.order.depotId,
                        currencyId: this.order.currencyId,
                        buyGroup: this.order.buyGroup,
                        typeOfFuelReceipt: this.order.typeOfFuelReceipt
                    };
                    this.setCustomerPerson();
                    if (!this.isView) {
                        this.locationChanged(true);
                    }
                    this.setBreadCrumb();
                    this.isLoading = false;
                    this.errorLoad = false;

                }, error1 => {
                    this.errorLoad = true;
                    this.isLoading = false;
                });
            } else if (this.activeIndex === 1) {
                this.orderService.findForEdit(this.id).subscribe(order => {
                    this.order = order.body;
                    this.orderService.existForcibleOrder(this.order.customerId)
                        .subscribe((value) => {
                            this.forcibleOrder = value.body;
                            if (this.forcibleOrder && this.forcibleOrder.id) {
                                this.isForcible = true;
                                this.order.depotId = this.forcibleOrder.realDepotId;
                                this.order.locationId = this.forcibleOrder.locationId;
                                this.isView = true;
                                this.isOrderProductEditing = false;
                                this.addForcibleOrderProduct();
                            } else {
                                this.isForcible = false;
                            }
                        }, (error) => {
                            this.isForcible = false;
                            this.onError(error);
                        });
                    if (this.order.orderType == 'ORDER' && (this.order.status == null || this.order.status == 'DRAFT')) {
                        this.checkCustomerDeactiveSell();
                    }
                    this.isView = this.order.status !== OrderStatus[OrderStatus.DRAFT];
                    this.mustPaid = this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.status === OrderStatus[OrderStatus.PENDING];
                    this.isOrderProductEditing = (this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.depotStatus === DepotStatus[DepotStatus.BACK_FROM_DEPOT]);
                    this.order.orderCredits = [];

                    this.loadOrder = {
                        shiftWorkId: this.order.shiftWorkId,
                        locationId: this.order.locationId,
                        customerId: this.order.customerId,
                        personId: this.order.personId,
                        sellContractId: this.order.sellContractId,
                        depotId: this.order.depotId,
                        currencyId: this.order.currencyId,
                        buyGroup: this.order.buyGroup,
                        typeOfFuelReceipt: this.order.typeOfFuelReceipt
                    };

                    // todo بعدا در صورتی که ظرفیت نفتکش پیدا نشد امکان ادامه دادن وجود نداشته باشد
                    if (
                        this.isOrderProductEditing
                    ) {
                        if (this.mode === 'refuel-center' && this.order.typeOfFuelReceipt === this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]) {
                            this.customerService.queryGetListOfCarAmount(this.order.customerId)
                                .subscribe(value => {
                                    this.carAmounts = value.body;
                                    this.maxCarAmount = 0;
                                    this.carAmounts.forEach(carAmount => {
                                        if (carAmount > this.maxCarAmount) {
                                            this.maxCarAmount = carAmount;
                                        }
                                    });
                                });
                        }
                    } else {
                        this.isCustomerOrderCapacity = false;
                    }

                    this.sellContractProducts = this.order.sellContractProducts;

                    this.newOrderProduct();

                    const atkProduct: SellContractProduct = this.sellContractProducts.find(value => value.productId === 27900);
                    if (this.order.orderType === this.OrderType[this.OrderType.AIRPLANE] && atkProduct) {
                        this.orderProduct.sellContractProductId = atkProduct.id;
                        this.sellContractProduct = atkProduct;
                        this.onChangeSellContractProduct(this.sellContractProduct);
                    } else if (this.sellContractProducts.length === 1) {
                        this.orderProduct.sellContractProductId = this.sellContractProducts[0].id;
                        this.sellContractProduct = this.sellContractProducts[0];
                        this.onChangeSellContractProduct(this.sellContractProduct);
                    }
                    this.setBreadCrumb();
                    this.isLoading = false;
                    this.errorLoad = false;
                    if (this.order.status === this.OrderStatus[this.OrderStatus.PENDING]) {
                        this.sellContractProductService.find(this.order.orderProducts[0].sellContractProductId)
                            .subscribe(value => {
                                this.orderProduct = this.order.orderProducts[0];
                                this.sellContractProduct = value.body;
                                this.addOrderProduct();
                            });
                    }
                }, error1 => {
                    this.errorLoad = true;
                    this.isLoading = false;
                });

            } else if (this.activeIndex === 2) {
                this.orderService.findPaymentList(this.id).subscribe(order => {
                    this.order = order.body;
                    this.isView = !(this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.status === OrderStatus[OrderStatus.BACK_FROM_DEPOT]);
                    this.mustPaid = this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.status === OrderStatus[OrderStatus.PENDING];

                    if (this.order.status === this.OrderStatus[OrderStatus.DRAFT] &&
                        this.order.orderPrePays && this.order.orderPrePays.length === 1 && this.order.payId) {
                        this.router.navigate(['/order/' + this.order.id + '/edit/payment'], {
                            queryParams: {
                                mode: this.mode,
                                payId: this.order.payId
                            }
                        });
                        return;
                    }
                    this.order.orderPrePays.forEach(orderPrePay => {
                        this.niopdcBankAccountTypeService.findOrCache(orderPrePay.niopdcBankAccountTypeId).subscribe(niopdcBankAccountType => {
                            orderPrePay.niopdcBankAccountTypeTitle = niopdcBankAccountType.body.title;
                        });
                    });

                    this.orderQuota = this.order.orderCredits.filter(value => value.buyGroup === this.BuyGroup[BuyGroup.QUOTA]);
                    this.orderCredit = this.order.orderCredits.filter(value => value.buyGroup === this.BuyGroup[BuyGroup.CREDIT]);

                    this.setBreadCrumb();
                    this.errorLoad = false;
                    this.isLoading = false;
                }, error1 => {
                    this.errorLoad = true;
                    this.isLoading = false;
                });
            } else if (this.activeIndex === 3) {
                this.orderService.find(this.id).subscribe(order => {
                    this.order = order.body;
                    this.isView = !(this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.status === OrderStatus[OrderStatus.BACK_FROM_DEPOT]);
                    this.mustPaid = this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.status === OrderStatus[OrderStatus.PENDING];

                    this.isLoading = false;
                    this.errorLoad = false;
                }, error1 => {
                    this.errorLoad = true;
                    this.isLoading = false;
                });

                this.payId = this.activatedRoute.snapshot.queryParams['payId'] ? this.activatedRoute.snapshot.queryParams['payId'] : '';
            } else if (this.activeIndex === 4) {
                this.orderService.findForEdit(this.id).subscribe(order => {
                    this.order = order.body;
                    this.setBreadCrumb();
                });
            }

            /*
            this.order.productIds = this.order.orderProducts.map((value) => value.sellContractProductId);
            if (this.order.orderType === 'AIRPLANE') {
                if (this.activeIndex === 1) {
                    this.customerService.find(this.order.customerId)
                        .subscribe((customer) => {
                            this.capacity = customer.body.capacity;
                        });

                    this.tempCustomerCreditsNumber = '';
                    this.tempCustomerCredits = null;
                    this.customerCreditService.orderReserveFinal(
                        this.order.personId,
                        this.order.buyGroup,
                        this.order.currencyId,
                        this.order.currencyRateGroupId
                    )
                        .subscribe((data) => {
                            this.tempCustomerCredits = data.body;
                            this.tempCustomerCredits = this.tempCustomerCredits.filter(
                                (value) =>
                                    (value.minAmount != null && value.minAmount >= value.currentAmount)
                                    || (value.minCredit != null && value.minCredit >= value.currentCredit)
                            );
                            if (this.tempCustomerCredits.length > 0) {
                                this.tempCustomerCredits.forEach((value) => {
                                    this.tempCustomerCreditsNumber += value.creditNumber + ',';
                                });
                            }
                        });

                }
                this.order.orderProducts.forEach((value) => {
                        if (value.id != null) {
                            this.logBookService.findByOrderProductId(value.id).subscribe((res) => {
                                value.logBook = res.body;
                            });
                        }
                    }
                );ب

            }
            if (this.activeIndex === 2 && this.order.buyGroup !== 'CASH') {
                this.orderService.hasCreditNotDepositedInTime(this.order.personId, this.order.customerId).subscribe((value) => {
                    this.hasCreditNotDepositedInTime = value.body.toString() === CreditNotDepositedInTime[CreditNotDepositedInTime.SELL_LIMIT];

                    if (this.hasCreditNotDepositedInTime) {
                        this.jhiAlertService.error('error.credit.deprecated.inTime', null, null);
                    } else if (value.body.toString() === CreditNotDepositedInTime[CreditNotDepositedInTime.SELL_ALARM]) {
                        this.jhiAlertService.info('error.credit.deprecated.inTime', null);
                    } else {
                        this.customerCreditService.queryByFilter(
                            this.order.buyGroup,
                            this.order.customerId,
                            this.order.personId,
                            this.order.currencyRateGroupId,
                            this.order.productIds,
                            this.order.currencyId,
                            this.order.locationId
                        )
                            .subscribe((res: HttpResponse<CustomerCredit[]>) => {
                                this.customerCredits = res.body;
                                if (!this.customerCredits || this.customerCredits.length === 0) {
                                    this.jhiAlertService.error('error.credit.not.found', null, null);
                                }
                            }, (res: HttpErrorResponse) => this.jhiAlertService.error('error.credit.not.found', null, null));
                    }
                });
            } else if (this.activeIndex === 2 && this.order.buyGroup === 'CASH') {
                this.payId = this.activatedRoute.snapshot.params['payId'] ? this.activatedRoute.snapshot.params['payId'] : '';
            }
            if (this.order.orderCredits == null) {
                this.order.orderCredits = [];
            }
            if (this.activeIndex === 0) {
                this.setCustomerPerson();

            } else if (this.activeIndex === 1) {
                this.loadBuyGroup(false);
                this.calSummary();
            } else {
                this.calSummary();
            }
            this.setBreadCrumb();
            this.updateProductIds();*/

        } else {
            this.newOrder();
            this.setBreadCrumb();
        }
    }

    reloadCapacity(customerId: number, productId: number) {
        if (this.order.orderType === this.OrderType[this.OrderType.ORDER]) {
            this.customerService.queryCustomerOrderCapacity(customerId, productId)
                .subscribe(value => {
                    this.customerOrderCapacities = value.body;
                    if (!this.customerOrderCapacities || this.customerOrderCapacities.length === 0) {
                        this.isCustomerOrderCapacity = false;
                        this.jhiAlertService.error('error.customer.order.capacity.not.found');
                        this.customerOrderCapacities = null;
                    } else {
                        this.isCustomerOrderCapacity = true;
                    }
                });
        }
    }

    setBreadCrumb() {

        this.translateService.get([
            'global.menu.home',
            'global.menu.sell.order' + (this.mode === 'order' ? '' : '_' + this.mode),
            'global.menu.sell.orderRefuelCenter',
            'niopdcgatewayApp.sellContract.home.editLabel',
            'niopdcgatewayApp.sellContract.home.createLabel'
        ]).subscribe(result => {
            this.breadCrumbs = [];

            this.breadCrumbs.push({
                label: result['global.menu.home'], routerLink: ['/']
            });
            if (this.mode !== 'refuel-center') {
                this.breadCrumbs.push({
                    label: result['global.menu.sell.order' + (this.mode === 'order' ? '' : '_' + this.mode)],
                    routerLink: ['/order'],
                    queryParams: {'mode': this.mode}
                });
            } else {
                this.breadCrumbs.push({
                    label: result['global.menu.sell.orderRefuelCenter'],
                    routerLink: ['/order'],
                    queryParams: {'mode': this.mode}
                });

            }

            if (this.order && this.order.id) {
                this.breadCrumbs.push({label: result['niopdcgatewayApp.sellContract.home.editLabel']});
            } else {
                this.breadCrumbs.push({label: result['niopdcgatewayApp.sellContract.home.createLabel']});
            }
        });

        this.items = [
            {
                label: 'اطلاعات اولیه', command: (event: any) => {
                    this.activeIndex = 0;
                }
            },
            {
                label: 'اطلاعات فرآورده', command: (event: any) => {
                    this.activeIndex = 1;
                }
            },
            {
                label: 'اطلاعات پرداخت', command: (event: any) => {
                    this.activeIndex = 2;
                }
            }];

        if (this.mustPaid) {
            this.items.push({
                label: 'پرداخت', command: (event: any) => {
                    this.activeIndex = 3;
                }
            });
        }

        this.checkForTicket(this.order);

    }

    // region first state Order
    newOrder() {
        if (this.mode === 'airplane') {
            this.order.orderType = this.OrderType[OrderType.AIRPLANE];
            this.order.flightConditions = this.FlightConditions[this.FlightConditions.NORMAL];
            this.order.fuelType = this.FuelType[this.FuelType.RE_FUEL];
        } else if (this.mode === 'refuel-center') {
            this.order.orderType = this.OrderType[OrderType.REFUEL_CENTER];
        } else if (this.mode === 'order') {
            this.order.registerDate = new Date();
            this.order.orderType = this.OrderType[OrderType.ORDER];
        }
    }

    mustBeRecreate() {

        if (!this.order.id) {
            return false;
        }
        if (!this.shiftWork || !this.shiftWork.id) {
            return false;
        }

        return !(
            this.loadOrder.shiftWorkId === this.shiftWork.id &&
            this.loadOrder.locationId === this.order.locationId &&
            this.loadOrder.customerId === this.order.customerId &&
            this.loadOrder.personId === this.order.personId &&
            this.loadOrder.sellContractId === this.order.sellContractId &&
            this.loadOrder.depotId === this.order.depotId &&
            this.loadOrder.currencyId === this.order.currencyId &&
            this.loadOrder.buyGroup === this.order.buyGroup &&
            this.loadOrder.typeOfFuelReceipt === this.order.typeOfFuelReceipt
        );
    }

    eventSubscribers() {
        this.eventSubscriber = this.eventManager.subscribe('shiftWorkListModification', response => {
            this.findOpenShiftWork();
        });
        this.eventSubscriber = this.eventManager.subscribe('orderDeleted' + this.id, response => {
            setTimeout(() => {
                this.router.navigate(['order'], {queryParams: {mode: this.mode}});
            }, 500);
        });
    }

    locationChanged(selectFirst) {
        if (!selectFirst) {
            this.customerPerson = null;
        }
        if (this.order.orderType !== this.OrderType[OrderType.AIRPLANE]) {
            this.findOpenShiftWork();
        }
    }

    findOpenShiftWork() {
        if (this.order.locationId) {
            this.shiftWorkService.findOpenShiftWork(this.order.locationId).subscribe(shiftWork => {
                this.shiftWork = shiftWork.body;

                if (!this.order.id) {
                    // this.order.orderNo = '';
                }

                if (this.shiftWork.type === 'OPEN_TOMORROW') {
                    this.order.registerDate = this.shiftWork.fromDate;
                } else if (this.shiftWork.type === 'CLOSE') {
                    this.order.registerDate = null;
                } else if (this.shiftWork.type === 'OPEN') {
                    this.order.registerDate = new Date();
                }
            });
        }
    }

    changeCustomerPerson(data) {
        if (data == null) {
            this.order.sellContractProductIds = null;
            this.changeDepot(null);
        } else {
            this.order.customerId = data.customerId;
            this.order.personId = data.personId;
            this.order.sellContractId = data.sellContractId;
            if (this.order.orderType == 'ORDER') {
                this.orderService.existForcibleOrder(data.customerId)
                    .subscribe((value) => {
                        this.forcibleOrder = value.body;
                        if (this.forcibleOrder && this.forcibleOrder.id) {
                            this.isForcible = true;
                            this.order.depotId = this.forcibleOrder.realDepotId;
                            this.order.locationId = this.forcibleOrder.locationId;
                            this.isView = true;
                        } else {
                            this.isForcible = false;
                        }
                    }, (error) => {
                        this.isForcible = false;
                        this.onError(error);
                    });
                this.checkCustomerDeactiveSell();
                this.getAllCreditBuyTypeRemaine(data.customerId);
                if (data.customerId) {
                    this.hasTransportContract(data.customerId);
                }
            }
            this.loadDepot(true);
        }
    }

    hasTransportContract(customerId) {
        this.customerService.hasTransportContract(customerId).subscribe(value => {
            this.hasAccessForRegisterOrder = value.body;
        });
    }

    setCustomerPerson() {
        const customerPerson = new CustomerPerson();
        customerPerson.personId = this.order.personId;
        customerPerson.sellContractId = this.order.sellContractId;
        customerPerson.customerId = this.order.customerId;
        this.customerPerson = customerPerson;

        this.loadDepot(false);
    }

    loadDepot(selectFirst) {
        this.depotService.findBySellContractAndPersonAndCustomer(this.order.sellContractId, this.order.personId, this.order.customerId, this.order.orderType)
            .subscribe((res1: HttpResponse<Depot[]>) => {
                this.depots = res1.body;
                if (selectFirst) {
                    if (this.depots.length > 0) {
                        this.changeDepot(this.depots[0].id);
                    } else {
                        this.changeDepot(null);
                    }
                } else {
                    this.loadCurrency(false);
                    this.loadSourceAirport(false);
                }
            }, (error) => {
                console.log(error);
            });
    }

    changeDepot(depotId) {
        if (this.order.depotId !== depotId) {
            this.order.depotId = depotId;
        }

        if (this.order.depotId) {
            this.loadSourceAirport(true);
            this.loadCurrency(true);
        } else {
            this.changeSourceAirport(null);
            this.changeCurrency(null);
        }
    }

    loadCurrency(selectFirst) {
        this.currencyService.findBySellContractAndPersonAndCustomerAndDepot(this.order.sellContractId,
            this.order.personId, this.order.customerId, this.order.depotId, this.order.orderType)
            .subscribe((res: HttpResponse<Currency[]>) => {
                this.currencies = res.body;
                if (selectFirst) {
                    if (this.currencies.length > 0) {
                        this.changeCurrency(this.currencies[0].id);
                    } else {
                        this.changeCurrency(null);
                    }
                } else {
                    this.loadBuyGroup(false);
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    changeCurrency(currencyId) {
        if (this.order.currencyId !== currencyId) {
            this.order.currencyId = currencyId;
        }
        if (this.order.currencyId) {
            this.loadBuyGroup(true);
        } else {
            this.changeBuyGroup(null);
        }
    }

    loadBuyGroup(selectFirst) {
        this.buyTypeService
            .findBuyGroupBySellContractAndPersonAndCustomerAndDepotAndCurrency(
                this.order.sellContractId,
                this.order.personId,
                this.order.customerId,
                this.order.depotId,
                this.order.currencyId,
                this.order.orderType)
            .subscribe((res: HttpResponse<BuyGroup[]>) => {
                this.buyGroups = res.body;
                if (selectFirst) {
                    if (this.buyGroups.length > 0) {
                        const buyGroup = this.buyGroups.find(value => value.toString() === this.BuyGroup[this.BuyGroup.CREDIT]);
                        this.changeBuyGroup(buyGroup ? buyGroup : this.buyGroups[0]);
                    } else {
                        this.changeBuyGroup(null);
                    }
                } else {
                    this.loadTypeOfFuelReceipt(false);
                    // this.calPrice();
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    changeBuyGroup(buyGroup) {
        if (this.order.buyGroup !== buyGroup) {
            this.order.buyGroup = buyGroup;
        }

        if (this.order.buyGroup) {
            this.loadTypeOfFuelReceipt(true);
        } else {
            this.changeTypeOfFuelReceipt(null);
        }
    }

    loadTypeOfFuelReceipt(selectFirst) {
        if (this.order.orderType === this.OrderType[OrderType.AIRPLANE] || this.order.orderType === this.OrderType[OrderType.REFUEL_CENTER]) {
            this.buyTypeService
                .findTypeOfFuelReceiptBySellContractAndPersonAndCustomerAndDepotAndCurrencyAndBuyGroup(
                    this.order.sellContractId,
                    this.order.personId,
                    this.order.customerId,
                    this.order.depotId,
                    this.order.currencyId,
                    this.order.buyGroup,
                    this.order.orderType)
                .subscribe((res: HttpResponse<TypeOfFuelReceipt[]>) => {
                    this.typeOfFuelReceipts = res.body;
                    if (selectFirst) {
                        if (this.typeOfFuelReceipts.length > 0) {
                            this.changeTypeOfFuelReceipt(this.typeOfFuelReceipts[0]);
                        } else {
                            this.changeTypeOfFuelReceipt(null);
                        }
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    changeTypeOfFuelReceipt(typeOfFuelReceipt) {
        if (this.order.typeOfFuelReceipt !== typeOfFuelReceipt) {
            this.order.typeOfFuelReceipt = typeOfFuelReceipt;
        }

        if (this.order.orderType === this.OrderType[OrderType.AIRPLANE] || this.order.orderType === this.OrderType[OrderType.REFUEL_CENTER]) {
            this.refuelCenterService.getOpenDate(this.depot.refuelCenterId, this.order.typeOfFuelReceipt).subscribe(shiftWork => {
                this.shiftWork = shiftWork.body;

                // todo به صورت موقت ایجاد اتوماتیک شماره حواله برای سوختگیری غیر فعال باشد
                if (this.shiftWork.orderNumber && !['refuel-center', 'airplane'].includes(this.mode)) {
                    this.order.orderNo = (+this.shiftWork.orderNumber.currentOrderNumber + 1).toString();
                } else {
                    // this.order.orderNo = '';
                }

                if (this.shiftWork.type === 'OPEN_TIMEOUT') {
                    this.order.registerDate = null;
                } else if (this.shiftWork.type === 'CLOSE') {
                    this.order.registerDate = null;
                } else if (this.shiftWork.type === 'OPEN' || this.shiftWork.type === 'OPEN_EXTRA') {
                    this.order.registerDate = this.shiftWork.fromDate;
                }
            });
            this.changeSourceAirport(this.order.sourceAirport);

        }

        if (this.order.typeOfFuelReceipt === this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]) {
            this.order.fuelType = this.FuelType[this.FuelType.RE_FUEL];
        }

        if (this.order.typeOfFuelReceipt !== this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.UNIT_TO_AIRPLANE]) {
            this.targetAirports = null;
            this.order.targetAirport = null;
        }
    }

    loadSourceAirport(selectFirst) {
        if (this.order.orderType === this.OrderType[OrderType.AIRPLANE] || this.order.orderType === this.OrderType[OrderType.REFUEL_CENTER]) {
            this.depot = this.depots.find(value => value.id === this.order.depotId);

            if (this.depot.refuelCenter) {
                this.sourceAirports = this.depot.refuelCenter.airports;
                if (selectFirst) {
                    if (this.sourceAirports.length > 0) {
                        this.changeSourceAirport(this.sourceAirports[0].id);
                    } else {
                        this.changeSourceAirport(null);
                    }
                } else {
                    this.loadTargetAirport(false);
                }
            } else {
                // this.order.orderNo = '';
                this.sourceAirports = [];
                this.changeSourceAirport(null);
            }
        } else {
            this.order.sourceAirport = null;
            this.order.targetAirport = null;
            this.order.flightConditions = null;
            this.order.typeOfFuelReceipt = null;
            this.order.fuelType = null;
        }
    }

    changeSourceAirport(airportId) {
        if (this.order.sourceAirport !== airportId) {
            this.order.sourceAirport = airportId;
        }

        if (this.order.sourceAirport) {
            this.loadTargetAirport(true);
        } else {
            this.targetAirports = [];
            this.order.targetAirport = null;
        }
    }

    loadTargetAirport(selectFirst) {
        this.targetAirports = this.sourceAirports.find(value => value.id === this.order.sourceAirport).targetAirports;
        if (selectFirst) {
            if (this.targetAirports.length > 0) {
                this.order.targetAirport = this.targetAirports[0].id;
            } else {
                this.order.targetAirport = null;
            }
        }

    }

    // endregion

    // region orderProduct

    newOrderProduct() {
        this.tempOrderProduct = null;
        if (this.order.depotStatus && this.order.depotStatus === DepotStatus[DepotStatus.BACK_FROM_DEPOT]) {
            this.orderProduct = JSON.parse(JSON.stringify(this.order.orderProducts[0]));
            this.sellContractProduct = this.order.sellContractProducts.filter(value => value.id === this.orderProduct.sellContractProductId)[0];
            this.onChangeSellContractProduct(this.sellContractProduct);
        } else {
            this.onChangeSellContractProduct(null);
            this.orderProduct = new OrderProduct();
        }
        this.orderProduct.metreDate = this.order.registerDate;
        this.orderProduct.metreEndDate = this.order.registerDate;
    }

    onChangeSellContractProduct(sellContractProduct: SellContractProduct) {
        if (this.sellContractProduct !== sellContractProduct) {
            this.sellContractProduct = sellContractProduct;
        }
        if (sellContractProduct) {
            this.orderProduct.sellContractProductId = sellContractProduct.id;
            this.orderProduct.productColor = sellContractProduct.productColor;
            this.orderProduct.productId = sellContractProduct.productId;
            this.orderProduct.productTitle = sellContractProduct.productTitle;
            this.orderProduct.rateGroupId = sellContractProduct.rateGroupId;
            this.orderProduct.rateGroupTitle = sellContractProduct.rateGroupTitle;
            if (this.order.customerId && sellContractProduct.productId) {
                this.reloadCapacity(this.order.customerId, sellContractProduct.productId);
            }
            if (this.order.orderType === this.OrderType[OrderType.AIRPLANE]) {
                if (!this.sellContractProduct.hasContainer && this.orderProduct.amount &&
                    this.orderProduct.amount > this.sellContractProduct.capacity) {
                    this.orderProduct.amount = this.sellContractProduct.capacity;
                }

                if (this.sellContractProduct.hasContainer && this.orderProduct.containerCount &&
                    this.orderProduct.containerCount > this.sellContractProduct.capacity / this.sellContractProduct.containerCapacity) {
                    this.orderProduct.amount = this.sellContractProduct.capacity / this.sellContractProduct.containerCapacity;
                }

                this.loadDayDepots(sellContractProduct);
            }
        }
        this.sellContractProductAlreadyAdded = !!this.order.orderProducts.find(value => sellContractProduct && value.sellContractProductId === sellContractProduct.id);
    }

    onChangeBackFromDepot(sellContractProduct: SellContractProduct) {
        this.order.orderProducts.forEach(value => {
            value.sellContractProductId = sellContractProduct.id;
            value.productColor = sellContractProduct.productColor;
            value.productId = sellContractProduct.productId;
            value.productTitle = sellContractProduct.productTitle;
            value.rateGroupId = sellContractProduct.rateGroupId;
            value.rateGroupTitle = sellContractProduct.rateGroupTitle;
        });
    }

    loadDayDepots(sellContractProduct: SellContractProduct) {
        if (!sellContractProduct.dayDepots) {
            this.dayDepotService.queryByProductAndOilTankType(this.order.mainDayOperationId, sellContractProduct.productId, this.order.typeOfFuelReceipt)
                .subscribe(res => {
                    sellContractProduct.dayDepots = res.body;
                    sellContractProduct.dayDepots.sort((a: DayDepot, b: DayDepot) => {
                        if (a.oilTankTitle < b.oilTankTitle) {
                            return -1;
                        } else if (a.oilTankTitle > b.oilTankTitle) {
                            return 1;
                        }
                        return 0;
                    });
                });
        }
    }

    onChangeDayDepot(dayDepotId) {
        dayDepotId = Number(dayDepotId.split(':')[1].trim());
        if (dayDepotId) {
            this.dayDepot = this.sellContractProduct.dayDepots.find(value => value.id === dayDepotId);
            if (this.orderProduct.amount && this.orderProduct.amount > this.dayDepot.oilTankVirtualCapacity) {
                this.orderProduct.amount = this.dayDepot.oilTankVirtualCapacity;
            }
            this.orderProduct.dayDepotTitle = this.dayDepot.oilTankTitle;
            this.metres = this.dayDepot.metres.filter((metre: Metre) => metre.active === true);
            if (this.metres.length === 1) {
                this.orderProduct.metreId = this.metres[0].id;
                this.metre = this.metres[0];
                this.getStartMetre();
            }
        } else {
            this.metres = [];
        }
    }

    getStartMetre() {
        if (this.orderProduct.metreId != null && this.orderProduct.metreDate != null) {
            this.metreService.getStartMetre(this.orderProduct.id, this.orderProduct.metreId, this.orderProduct.metreDate)
                .subscribe(startMetre => {
                    this.orderProduct.startMetre = startMetre.body;
                    this.applyEndMetre();
                });
        }
    }

    applyEndMetre() {
        if (this.order.typeOfFuelReceipt !== this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]) {
            this.orderProduct.endMetre = (+this.orderProduct.startMetre) + (+this.orderProduct.amount);
        }
    }

    applyStartMetre() {
        if (this.order.typeOfFuelReceipt !== this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]) {
            this.conflictMetreNumber = (this.orderProduct.startMetre - this.metre.amount > 60000) ||
                (this.orderProduct.startMetre - this.metre.amount < -60000);
        }
    }

    trackRefuelCenterById(index: number, item: RefuelCenter) {
        return item.id;
    }

    trackMetreById(index: number, item: Metre) {
        return item.id;
    }

    trackDayDepotById(index: number, item: DayDepot) {
        return item.id;
    }

    addOrderProduct() {
        this.conflictMetreNumber = false;
        if (!this.order.orderProducts) {
            this.order.orderProducts = [];
        }

        const request = {
            customerId: this.order.customerId,
            productId: this.sellContractProduct.productId,
            hasContainer: this.sellContractProduct.hasContainer,
            calculateContainerPrice: this.sellContractProduct.calculateContainerPrice,
            containerId: this.sellContractProduct.containerId,
            capacity: this.sellContractProduct.containerCapacity,
            rateGroupId: this.sellContractProduct.rateGroupId,
            currencyId: this.order.currencyId,
            currencyRateGroupId: this.sellContractProduct.currencyRateGroupId,
            amount: this.sellContractProduct.hasContainer ? this.orderProduct.containerCount : this.orderProduct.amount,
            costMethod: this.order.fuelType === this.FuelType[this.FuelType.DE_FUEL] ? this.CostMethod[this.CostMethod.DEFUEL] : this.CostMethod[this.CostMethod.NORMAL_SALES],
            costGroupIds: this.sellContractProduct.costGroupIds,
            productRateId: this.sellContractProduct.productRateId,
            registerDate: this.order.registerDate
        };

        this.productRateService.getOneProductRateByProductAndAmount(request).subscribe(value => {

            const rateResponses = value.body;
            rateResponses.forEach(rateResponse => {
                const orderProduct = JSON.parse(JSON.stringify(this.orderProduct));

                orderProduct.amount = rateResponse.amount;
                orderProduct.containerCount = rateResponse.count;
                orderProduct.productRatePrice = rateResponse.productRatePrice;
                orderProduct.realProductRatePrice = rateResponse.realProductRatePrice;
                orderProduct.containerRatePrice = rateResponse.containerRatePrice;
                orderProduct.basePrice = rateResponse.productTotalPrice;
                orderProduct.containerBasePrice = rateResponse.containerTotalPrice;

                orderProduct.price = rateResponse.productTotalPrice +
                    (rateResponse.containerTotalPrice ? rateResponse.containerTotalPrice : 0);

                orderProduct.costResponses = rateResponse.costResponses;

                orderProduct.endMetre = (+orderProduct.amount) + (+orderProduct.startMetre);
                if (this.order.status === this.OrderStatus[this.OrderStatus.PENDING]) {
                    this.order.orderProducts = [];
                }
                if (this.order.depotStatus !== this.DepotStatus[this.DepotStatus.BACK_FROM_DEPOT]) {
                    this.order.orderProducts.push(orderProduct);
                } else {
                    if (
                        this.orderProduct.basePrice === orderProduct.basePrice
                    ) {
                        this.order.orderProducts = [];
                        this.order.orderProducts.push(orderProduct);
                    } else {
                        this.jhiAlertService.error('error.conflict.new.product.price', null, null);
                    }
                }
            });
            this.newOrderProduct();
            this.calPrice();
        });
    }

    cancelOrderProduct() {
        this.conflictMetreNumber = false;
        if (this.tempOrderProduct != null) {
            this.tempOrderProduct.forEach(value => {
                this.order.orderProducts.push(value);
            });
            this.tempOrderProduct = null;
            this.calPrice();
        }
        this.newOrderProduct();
    }

    removeProduct(sellContractProductId) {
        this.order.orderProducts = this.order.orderProducts.filter(value => value.sellContractProductId !== sellContractProductId);
        this.calPrice();
        this.onChangeSellContractProduct(this.sellContractProduct);
    }

    removeProductByDayDepotId(dayDepotId) {
        this.order.orderProducts = this.order.orderProducts.filter(value => value.dayDepotId !== dayDepotId);
        this.calPrice();
        this.onChangeSellContractProduct(this.sellContractProduct);
    }

    editProduct(item) {
        if (this.order.orderType === this.OrderType[this.OrderType.ORDER]) {
            this.cancelOrderProduct();
            this.tempOrderProduct = JSON.parse(JSON.stringify(this.order.orderProducts.filter(value => value.sellContractProductId === item.sellContractProductId)));
            item.amount = this.tempOrderProduct.map(value => value.amount).reduce((previousValue, currentValue) => previousValue + currentValue);
            item.containerCount = this.tempOrderProduct.map(value => value.containerCount).reduce((previousValue, currentValue) => previousValue + currentValue);
            this.orderProduct = Object.assign({}, item);
            this.onChangeSellContractProduct(this.sellContractProducts.find(sellContractProduct => sellContractProduct.id === this.orderProduct.sellContractProductId));
            this.removeProduct(this.orderProduct.sellContractProductId);
        } else {
            this.tempOrderProduct = this.order.orderProducts.filter(value => value.dayDepotId === item.dayDepotId);
            this.orderProduct = Object.assign({}, item);
            this.onChangeSellContractProduct(this.sellContractProducts.find(sellContractProduct => sellContractProduct.id === this.orderProduct.sellContractProductId));
            this.removeProductByDayDepotId(this.orderProduct.dayDepotId);
        }
    }

    calPrice() {
        this.order.productIds = [];
        this.order.amount = 0;
        this.order.price = 0;
        this.order.productPrice = 0;
        this.order.containerPrice = 0;
        this.order.costPrice = 0;
        this.order.orderProducts.forEach(value => {
            this.order.productPrice += value.basePrice;
            this.order.containerPrice += value.containerBasePrice;
            let costResponses = value.costResponses && value.costResponses.length ? value.costResponses
                .filter(cost => !cost.productRateEffect) : undefined;
            this.order.costPrice += costResponses && costResponses.length ?
                costResponses
                    .map(cost => cost.price)
                    .reduce((previousValue, currentValue) => previousValue + currentValue) :
                0;
            this.order.productIds.push(value.sellContractProductId);
            this.order.amount += value.amount;
        });
        this.order.price = this.order.productPrice + this.order.costPrice + this.order.containerPrice;
    }

    // endregion

    // region orderPrePay

    startBankTransactionByPrePay(prePay: OrderPrePay) {
        this.orderService.startBankTransactionByOrderPrePay(prePay.id).subscribe(res => {
            this.router.navigate(['/order/' + this.order.id + '/edit/payment'], {
                queryParams: {
                    mode: this.mode,
                    payId: res.body
                }
            });
        });
    }

    startBankTransaction() {
        this.orderService.startBankTransactionByOrder(this.order.id).subscribe(res => {
            this.router.navigate(['/order/' + this.order.id + '/edit/payment'], {
                queryParams: {
                    mode: this.mode,
                    payId: res.body
                }
            });
        });
    }

    restartBankTransaction() {
        this.bankTransactionService.restartBankTransaction(this.payId).subscribe(res => {
            this.payId = res.body;
            this.router.navigate(['/order/' + this.order.id + '/edit/payment'], {
                queryParams: {
                    mode: this.mode,
                    payId: res.body
                }
            });
        });
    }

    onPayStatus(status) {
        this.payStatus = status;
        if (this.payStatus === 'COMPLETE') {
            setTimeout(() => {
                this.orderService.find(this.order.id).subscribe(value => {
                    this.order.status = value.body.status;
                    this.order.multiPrePay = value.body.multiPrePay;

                    this.isView = !(this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.status === OrderStatus[OrderStatus.BACK_FROM_DEPOT]);
                    this.mustPaid = this.order.status === OrderStatus[OrderStatus.DRAFT] || this.order.status === OrderStatus[OrderStatus.PENDING];

                    this.previousStep();
                });
            }, 3000);
        }
    }

    // endregion

    cancel() {
        this.router.navigate(['/order'], {queryParams: {'mode': this.mode}});
    }

    previousStep() {
        if (this.activeIndex === 1) {
            this.router.navigate(['/order/' + this.id + '/edit'], {queryParams: {'mode': this.mode}});
        } else if (this.activeIndex === 2 || this.activeIndex === 4) {
            this.router.navigate(['/order/' + this.id + '/edit/product'], {queryParams: {'mode': this.mode}});
        } else if (this.activeIndex === 3) {
            this.router.navigate(['/order/' + this.id +
            ((this.order && this.order.multiPrePay && this.order.buyGroup === BuyGroup[BuyGroup.CASH]) || this.isView ?
                '/edit/payment-list' :
                '/edit/product')], {queryParams: {'mode': this.mode}});
        }
    }

    // region action modal-footer

    getAllCreditBuyTypeRemaine(customerId) {
        if (customerId) {
            this.customerCreditService.getAllCreditBuyTypeRemaine(customerId)
                .subscribe(res => {
                    this.creditBuyTypeRemainedList = res.body;
                });
        }
    }

    checkCustomerDeactiveSell() {
        if (this.order.customerId) {
            this.customerDeactiveRuleService.checkDeactive({
                'customerId': this.order.customerId
            }).subscribe((res) => {
                if (res.body && res.body.length > 0) {
                    this.isDeactiveCustomer = true;
                    this.jhiAlertService.error('error.customer.deActive');
                } else {
                    this.isDeactiveCustomer = false;
                }
            });
        }
    }

    save(next: boolean) {
        if (this.activeIndex >= 1 && (this.order.orderProducts === null || this.order.orderProducts.length < 1)) {
            this.jhiAlertService.error('error.order.orderProduct.isEmpty', null, null);
            return;
        }
        if (this.order.id &&
            (this.isView && this.order.depotStatus !== this.DepotStatus[this.DepotStatus.BACK_FROM_DEPOT] && this.order.status !== OrderStatus[OrderStatus.PENDING]) &&
            (!this.isForcible)
        ) {
            this.onSaveSuccess(this.order, true);
        } else {
            this.isSaving = true;
            if (this.order.id !== undefined) {
                this.order.createBankTransaction = next;
                this.subscribeToSaveResponse(this.orderService.update(this.order), next);
            } else {
                this.subscribeToSaveResponse(this.orderService.create(this.order), next);
            }
        }
    }

    back() {
        this.activeIndex = this.activeIndex - 1;
        this.router.navigate(['/order/' + this.order.id + '/edit/' + this.activeIndex], {queryParams: {mode: this.mode}});
    }

    exportTicket() {
        this.activeIndex = 4;
        this.router.navigateByUrl('/order/' + this.order.id + '/edit/ticket?mode=' + this.mode);
    }

    exportWayBill() {
        this.activeIndex = 4;
        this.router.navigateByUrl('/order/' + this.order.id + '/edit/way-bill?mode=' + this.mode);
    }

    checkForTicket(order: Order) {
        if (
            order
            && order.id
        ) {
            if (order.typeOfFuelReceipt === this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.PIPE_LINE_SALES]) {
                if (this.items.length < 5) {
                    this.items.push({
                        label: 'صدور تیکت', command: (event: any) => {
                            this.activeIndex = 4;
                        }
                    });
                }
            } else if (order.typeOfFuelReceipt === this.TypeOfFuelReceipt[this.TypeOfFuelReceipt.TANKER_SALES]) {
                if (this.items.length < 5) {
                    this.items.push({
                        label: 'بارگیری', command: (event: any) => {
                            this.activeIndex = 4;
                        }
                    });
                }
            }
        }
    }

    addForcibleOrderProduct() {
        const sellContractProduct: SellContractProduct = this.sellContractProducts.filter(value => value.productId === this.forcibleOrder.productId)[0];

        const request = {
            customerId: this.order.customerId,
            productId: sellContractProduct.productId,
            hasContainer: sellContractProduct.hasContainer,
            calculateContainerPrice: sellContractProduct.calculateContainerPrice,
            containerId: sellContractProduct.containerId,
            capacity: sellContractProduct.containerCapacity,
            rateGroupId: sellContractProduct.rateGroupId,
            currencyId: this.order.currencyId,
            currencyRateGroupId: sellContractProduct.currencyRateGroupId,
            amount: this.forcibleOrder.natureAmount,
            costMethod: this.order.fuelType === this.FuelType[this.FuelType.DE_FUEL] ? this.CostMethod[this.CostMethod.DEFUEL] : this.CostMethod[this.CostMethod.NORMAL_SALES],
            costGroupIds: sellContractProduct.costGroupIds,
            productRateId: sellContractProduct.productRateId,
            registerDate: this.order.registerDate
        };
        this.order.orderProducts = [];

        this.productRateService.getOneProductRateByProductAndAmount(request).subscribe(value => {

            const rateResponses = value.body;
            rateResponses.forEach(rateResponse => {
                const orderProduct = JSON.parse(JSON.stringify(this.orderProduct));

                orderProduct.amount = rateResponse.amount;
                orderProduct.containerCount = rateResponse.count;
                orderProduct.productRatePrice = rateResponse.productRatePrice;
                orderProduct.realProductRatePrice = rateResponse.realProductRatePrice;
                orderProduct.containerRatePrice = rateResponse.containerRatePrice;
                orderProduct.basePrice = rateResponse.productTotalPrice;
                orderProduct.containerBasePrice = rateResponse.containerTotalPrice;

                orderProduct.price = rateResponse.productTotalPrice +
                    (rateResponse.containerTotalPrice ? rateResponse.containerTotalPrice : 0);

                orderProduct.costResponses = rateResponse.costResponses;

                orderProduct.endMetre = (+orderProduct.amount) + (+orderProduct.startMetre);
                this.order.orderProducts.push(orderProduct);
            });
            this.newOrderProduct();
            this.calPrice();
        });
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private subscribeToSaveResponse(result: Observable<Order>, next: boolean) {
        result.subscribe((res: HttpResponse<Order>) =>
            this.onSaveSuccess(res.body, next), (error: HttpErrorResponse) => {
            this.onSaveError();
            this.onError(error.error);
        });
    }

    // endregion

    private onSaveSuccess(result: Order, next) {
        this.isSaving = false;
        if (!next) {
            this.eventManager.broadcast({name: 'orderListModification', content: 'OK'});
            this.router.navigate(['/order'], {queryParams: {mode: this.mode}});
        } else {
            if (this.activeIndex === 0) {
                this.router.navigate(['/order/' + result.id + '/edit/product'], {queryParams: {mode: this.mode}});
            } else if (this.activeIndex === 1) {
                if (result.payId && this.order.buyGroup === 'CASH') {
                    this.router.navigate(['/order/' + this.order.id + '/edit/payment'], {
                        queryParams: {
                            mode: this.mode,
                            payId: result.payId
                        }
                    });
                } else {
                    this.router.navigate(['/order/' + result.id + '/edit/payment-list'], {queryParams: {mode: this.mode}});
                }
            } else {
                this.router.navigate(['/order/' + this.order.id + '/edit/payment'], {
                    queryParams: {
                        mode: this.mode,
                        payId: result.payId
                    }
                });
            }
        }
    }
}
