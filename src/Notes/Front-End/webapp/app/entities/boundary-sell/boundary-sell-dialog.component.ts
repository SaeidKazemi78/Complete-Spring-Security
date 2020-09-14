import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Country, CountryService} from '../country';
import {Customer, CustomerService} from '../customer';
import {MenuItem} from 'primeng/primeng';
import {Product, ProductService} from '../product';
import {TranslateService} from '@ngx-translate/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {CustomerGroup, CustomerType, CustomerTypeService} from '../customer-type';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CarTank, TankType} from '../car-tank';
import {AmountType, BoundarySell, BoundarySellItem, OrderCreationMethod, OrderDiscountDTO, OrderPrePay, OrderStatus, OrderType} from '../order/order.model';
import {ProductRateService} from '../product-rate';
import {Currency, CurrencyService} from '../currency';
import {Location, LocationService, TranshipType} from '../location';
import {OrderService} from '../order/order.service';
import {EPaymentComponent} from '../../shared/e-payment/e-payment.component';
import {VehicleModel, VehicleModelService, VehicleModelType} from '../vehicle-model';
import {VehicleCapacityService} from '../vehicle-capacity';
import {ConfigType} from '../niopdc-config';
import {BoundaryDiscount, BoundaryDiscountService, InquiryCmr} from '../boundary-discount';
import {Principal} from '../../shared';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {CustomPlaque} from '../plaque';
import {Subscription} from 'rxjs';
import {ShiftWork, ShiftWorkService} from '../shift-work';
import {NiopdcBankAccountTypeService} from '../niopdc-bank-account-type';
import {BankTransactionService} from '../bank-transaction';
import {CarRfIdService} from 'app/entities/car-rf-id';

@Component({
    selector: 'jhi-boundary-sell',
    templateUrl: './boundary-sell-dialog.component.html',
    styleUrls: ['../order/order-dialog.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BoundarySellDialogComponent implements OnInit {

    // enum
    OrderType = OrderType;
    OrderStatus = OrderStatus;
    VehicleModelType = VehicleModelType;
    CustomerGroup = CustomerGroup;
    AmountType = AmountType;
    TranshipType = TranshipType;
    OrderCreationMethod = OrderCreationMethod;
    TankType = TankType;
    ConfigType = ConfigType;
    carRfIdOptions:any[];
    // params
    activeIndex = 0;
    orderId: number;
    customerId: number;
    mode: string;
    isView = false;
    isUserPaid = false;

    isLoading: boolean;
    errorLoad: boolean;

    currentAccount;
    eventSubscriber: Subscription;
    breadCrumbs: any;
    items: MenuItem[] = [];

    // region files search customer and create customer
    searchRfId: string;
    searchPlaque: CustomPlaque = new CustomPlaque();
    expand = true;
    offender = false;
    attention = false;

    existCustomer: boolean;
    customerCreate: boolean;
    customers: Customer[] = [];
    customer: Customer = new Customer();

    vehicleModels: VehicleModel[] = [];
    customVehicleModels: any[];
    customerTypes: CustomerType[] = [];
    products: Product[];
    ordersHistory: any[];
    customProducts: any[];
    countries: Country[];
    customCountries: any[];

    carTankCreate: boolean;
    carTankEdit: boolean;
    carTank: CarTank = new CarTank();
    tempEditCarTank: string;
    disabledCountry: boolean;
    // endregion

    // region boundarySellItems
    boundarySell: BoundarySell;

    locations: any[];
    customLocation: any[];
    selectedLocation: Location;
    shiftWork: ShiftWork;

    currencies: Currency[] = [];

    amountSetter: Boolean;

    boundaryDiscount: BoundaryDiscount = new BoundaryDiscount();
    boundaryDiscountId: number;
    country: any = new Country();

    showPriceTable = false;
    boundarySellPrice: BoundarySell = new BoundarySell();

    totalAmount: number;

    // endregion

    identifier: string;
    payStatus: string;
    payEnable = false;
    inquiringCmr = false;

    @ViewChild('ePayment') ePaymentComponent: EPaymentComponent;

    ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL;
    PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL;
    ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL;
    PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL;
    paymentAccess: boolean = false;

    transitAlongFuelAmountSetter: Boolean;
    transitPumpNozzleAmountSetter: Boolean;

    transhipAlongFuelAmountSetter: Boolean;
    transhipPumpNozzleAmountSetter: Boolean;

    inquiry: InquiryCmr = new InquiryCmr();

    isSaving: boolean;


    constructor(private router: Router,
                public route: ActivatedRoute,
                private locationService: LocationService,
                // private carRfIdService:
                private shiftWorkService: ShiftWorkService,
                private carRfIdService :CarRfIdService ,
                private orderService: OrderService,
                private productService: ProductService,
                private productRateService: ProductRateService,
                private alertService: JhiAlertService,
                private countryService: CountryService,
                private eventManager: JhiEventManager,
                private translateService: TranslateService,
                private customerTypeService: CustomerTypeService,
                private customerService: CustomerService,
                private currencyService: CurrencyService,
                private niopdcBankAccountTypeService: NiopdcBankAccountTypeService,
                private bankTransactionService: BankTransactionService,
                private principal: Principal,
                private vehicleModelService: VehicleModelService,
                private vehicleCapacityService: VehicleCapacityService,
                private boundaryDiscountService: BoundaryDiscountService,
                private hotkeysService: HotkeysService
    ) {
    }

    ngOnInit(): void {
        this.principal.identity().then(account => {
            this.currentAccount = account;

            this.ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN', 'ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL']);
            this.PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN', 'PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL']);
            this.ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN', 'ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL']);
            this.PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN', 'PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL']);

            console.log('this.ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL  =>' + this.ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL);
            console.log('this.PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL =>' + this.PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL);
            console.log(' this.ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL =>' + this.ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL);
            console.log('this.PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL =>' + this.PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL);

            this.transhipAlongFuelAmountSetter = this.amountSetter && this.ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL;
            this.transhipPumpNozzleAmountSetter = this.amountSetter && this.PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL;

            this.transitAlongFuelAmountSetter = this.amountSetter && this.ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL;
            this.transitPumpNozzleAmountSetter = this.amountSetter && this.PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL;
            this.mode = this.route.snapshot.queryParams['mode'];
            this.paymentAccess = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN', 'CREATE_PAYMENT']);
        });

        this.route.params.subscribe(params => {
            this.mode = this.route.snapshot.queryParams['mode'];
            if (!this.mode || !['transit', 'tranship'].includes(this.mode)) {
                this.router.navigate(['/boundary-sell']);
                return;
            }

            if (!params['activeIndex']) {
                this.activeIndex = 0;
            } else if (!['product', 'payment-list', 'payment'].includes(params['activeIndex'])) {
                this.router.navigate(['boundary-sell', this.mode, params['id'], 'edit']);
            } else if (params['activeIndex'] === 'product') {
                this.activeIndex = 1;
            } else if (params['activeIndex'] === 'payment-list') {
                this.activeIndex = 2;
            } else if (params['activeIndex'] === 'payment') {
                this.activeIndex = 3;
            }

            this.orderId = params['orderId'];
            this.customerId = this.route.snapshot.queryParams['customer'];
            this.identifier = this.route.snapshot.queryParams['payId'];

            this.eventSubscribers();

            this.loadActiveIndex();
        });

        this.hotkeysService.add(new Hotkey(['ins', 'enter'], (event: KeyboardEvent, k: string): boolean => {
            if (k === 'enter') {
                if (this.searchRfId || this.searchPlaque && this.searchPlaque.plaque) {
                    this.search();
                }
                return false;
            }
        }, ['TEXTAREA', 'SELECT', 'INPUT']));

        this.loadCountries();
        this.loadCaRfIds();
    }

    loadActiveIndex() {
        this.transitAlongFuelAmountSetter = false;
        this.transitPumpNozzleAmountSetter = false;

        this.transhipAlongFuelAmountSetter = false;
        this.transhipPumpNozzleAmountSetter = false;

        this.amountSetter = true;

        if (this.activeIndex === 3) {
            if (!this.identifier) {
                this.router.navigate(['/boundary-sell/' + this.orderId + '/edit/product'], {queryParams: {mode: this.mode}});
            }
        }

        if (this.orderId) {
            if (this.activeIndex === 0 || this.activeIndex === 1 || this.activeIndex === 2 || this.activeIndex === 3) {
                this.loadBoundarySell();
            }
            this.setBreadCrumb();
        } else {
            this.newBoundary();
            this.setBreadCrumb();
        }
    }

    setBreadCrumb() {
        this.translateService.get([
            'global.menu.home',
            'global.menu.sell.order' + (this.mode === 'order' ? '' : '_' + this.mode),
            'niopdcgatewayApp.boundarySell.home.loading',
            'niopdcgatewayApp.boundarySell.home.view',
            'niopdcgatewayApp.boundarySell.home.edit',
            'niopdcgatewayApp.boundarySell.home.create'
        ]).subscribe(result => {
            this.breadCrumbs = [];

            this.breadCrumbs.push({
                label: result['global.menu.home'], routerLink: ['/']
            });
            this.breadCrumbs.push({
                label: result['global.menu.sell.order' + (this.mode === 'order' ? '' : '_' + this.mode)],
                routerLink: ['/boundary-sell/']
            });

            if (this.boundarySell && this.boundarySell.id) {
                if (this.boundarySell.status === this.OrderStatus[OrderStatus.PAID] || this.boundarySell.status === this.OrderStatus[OrderStatus.DE_ACTIVE]) {
                    this.breadCrumbs.push({label: result['niopdcgatewayApp.boundarySell.home.view'] + ' (' + this.boundarySell.orderNo + ')'});
                    const country = this.countries.find(c => c.rmtoCode == this.boundarySell.orderDiscount.destinationCountryCode);
                    this.boundaryDiscount.title = this.boundarySell.orderDiscount.maxAmount + ' لیتر ' + '(' + country.name + ')';
                } else {
                    this.breadCrumbs.push({label: result['niopdcgatewayApp.boundarySell.home.edit'] + ' (' + this.boundarySell.orderNo + ')'});
                }
            } else {
                if (this.orderId) {
                    this.breadCrumbs.push({label: result['niopdcgatewayApp.boundarySell.home.loading']});
                } else {
                    this.breadCrumbs.push({label: result['niopdcgatewayApp.boundarySell.home.create']});
                }
            }
        });
        this.translateService.get([
            'niopdcgatewayApp.boundarySell.home.carInfo',
            'niopdcgatewayApp.boundarySell.home.orderInfo',
            'niopdcgatewayApp.boundarySell.home.prePayInfo',
            'niopdcgatewayApp.boundarySell.home.titlePay'
        ]).subscribe(result => {
            this.items = [
                {
                    label: result['niopdcgatewayApp.boundarySell.home.carInfo'],
                    command: (event: any) => {
                        this.activeIndex = 0;
                    }
                },
                {
                    label: result['niopdcgatewayApp.boundarySell.home.orderInfo'],
                    command: (event: any) => {
                        this.activeIndex = 1;
                    }
                },
                {
                    label: result['niopdcgatewayApp.boundarySell.home.prePayInfo'],
                    command: (event: any) => {
                        this.activeIndex = 2;
                    }
                }
            ];

            if (!this.isUserPaid) {
                this.items.push(
                    {
                        label: result['niopdcgatewayApp.boundarySell.home.titlePay'],
                        command: (event: any) => {
                            this.activeIndex = 3;
                        }
                    });
            }

        });
    }

    eventSubscribers() {
        this.eventSubscriber = this.eventManager.subscribe('shiftWorkListModification', response => {
            this.findOpenShiftWork();
        });
        this.eventSubscriber = this.eventManager.subscribe('orderDeleted' + this.orderId, response => {
            setTimeout(() => {
                this.router.navigate(['/boundary-sell/']);
            }, 500);
        });
        this.eventManager.subscribe('customerListModification', value => {
            this.customerService.find(this.customer.id).subscribe(customerResponse => {
                this.customer = customerResponse.body;
            });

        });
    }

    newBoundary() {
        this.boundarySell = new BoundarySell();
        this.boundarySell.boundarySellItems = [];

        if (this.mode === 'transit') {
            this.boundarySell.orderType = this.OrderType[this.OrderType.BOUNDARY_TRANSIT];
        } else {
            this.boundarySell.orderType = this.OrderType[this.OrderType.BOUNDARY_TRANSHIP];
        }
        this.transhipAlongFuelAmountSetter = this.amountSetter && this.ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL;
        this.transhipPumpNozzleAmountSetter = this.amountSetter && this.PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL;

        this.transitAlongFuelAmountSetter = this.amountSetter && this.ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL;
        this.transitPumpNozzleAmountSetter = this.amountSetter && this.PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL;

        if (this.customerId) {
            this.loadCustomer(this.customerId);
        }
    }

    //New Edited by saeid kazemi
    loadCaRfIds() {
        this.carRfIdService.getAllNoneActive().subscribe(res => {
            const carRfIdOption = {
                value: '',
                label: ''
            };
            this.carRfIdOptions = [];
            this.carRfIdOptions.push(carRfIdOption);
            console.log( " ****b  Here is Newest change of saeed kazemi");
            res.body.forEach((carRfId => {
                this.carRfIdOptions.push({
                    value: carRfId.code,
                    label: carRfId.code
                });
            }));
        });
    }

    loadBoundarySell() {
        this.isLoading = true;
        this.errorLoad = false;

        (this.activeIndex === 0 || this.activeIndex === 2 || this.activeIndex === 3 ?
            this.orderService.findBoundarySell(this.orderId) :
            this.orderService.findBoundarySellForEdit(this.orderId)).subscribe(boundaryResponse => {
            this.isLoading = false;
            this.boundarySell = boundaryResponse.body;

            this.isUserPaid = (this.boundarySell.status === this.OrderStatus[OrderStatus.PAID] ||
                (this.boundarySell.status === this.OrderStatus[OrderStatus.PAID_PUMP] && !this.transhipAlongFuelAmountSetter && !this.transitAlongFuelAmountSetter));

            this.isView = (this.isUserPaid || this.boundarySell.status === this.OrderStatus[OrderStatus.PENDING]
                || this.boundarySell.status === this.OrderStatus[OrderStatus.DE_ACTIVE]
                || this.boundarySell.status === this.OrderStatus[OrderStatus.CUSTOMS_CONFIRM]
                || this.boundarySell.status === this.OrderStatus[OrderStatus.BORDER_CONFIRM]);

            this.setBreadCrumb();

            if (this.activeIndex === 3) {
                return;
            }

            this.loadCustomer(this.boundarySell.customerId);
            if (this.activeIndex === 1) {
                if (this.boundarySell.orderCreationMethod === this.OrderCreationMethod[OrderCreationMethod.MEASURING_DEVICE]) {
                    this.amountSetter = this.principal.hasAnyAuthorityDirect(['ROLE_ADMIN', 'MEASURING_DEVICE_EDIT_ORDER']);
                } else {
                    this.amountSetter = true;
                }

                this.transhipAlongFuelAmountSetter = this.amountSetter && this.ALONG_FUEL_BOUNDARY_TRANSHIP_WEB_SELL;
                this.transhipPumpNozzleAmountSetter = this.amountSetter && this.PUMP_NOZZLE_BOUNDARY_TRANSHIP_WEB_SELL;

                this.transitAlongFuelAmountSetter = this.amountSetter && this.ALONG_FUEL_BOUNDARY_TRANSIT_WEB_SELL;
                this.transitPumpNozzleAmountSetter = this.amountSetter && this.PUMP_NOZZLE_BOUNDARY_TRANSIT_WEB_SELL;

                if (this.boundarySell.orderDiscount && this.boundarySell.orderDiscount.boundaryDiscountId) {
                    this.boundaryDiscountId = this.boundarySell.orderDiscount.boundaryDiscountId;
                }
                if (this.boundarySell.status === this.OrderStatus[this.OrderStatus.PAID] && this.boundarySell.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSHIP]) {
                    this.locationService.find(this.boundarySell.locationId)
                        .subscribe(value => {
                            const location: Location = value.body;
                            if (location.transhipType !== this.TranshipType[this.TranshipType.OUT_TO_INSIDE_WHIT_OUT_PRIMITIVE]) {
                                const pumpAmount = this.boundarySell.boundarySellItems.filter(value1 => value1.amountType === this.AmountType[this.AmountType.PUMP_NOZZLE_AMOUNT])[0].amount;
                                if (this.boundarySell.alongFuelAmount <= location.tolerance) {
                                    this.boundarySellPrice = JSON.parse(JSON.stringify(this.boundarySell));
                                    this.boundarySellPrice.tolerance = location.tolerance;
                                }
                            }
                        });
                }
            } else if (this.activeIndex === 2) {
                if (this.boundarySell.status === this.OrderStatus[OrderStatus.DRAFT] &&
                    this.boundarySell.orderPrePays && this.boundarySell.orderPrePays.length === 1 && this.boundarySell.payId) {
                    this.router.navigate(['/boundary-sell/' + this.boundarySell.id + '/edit/payment'], {
                        queryParams: {
                            mode: this.mode,
                            payId: this.boundarySell.payId
                        }
                    });
                    return;
                }
                this.boundarySell.orderPrePays.forEach(orderPrePay => {
                    this.niopdcBankAccountTypeService.findOrCache(orderPrePay.niopdcBankAccountTypeId).subscribe(niopdcBankAccountType => {
                        orderPrePay.niopdcBankAccountTypeTitle = niopdcBankAccountType.body.title;
                    });
                });
                this.totalAmount = this.boundarySell.alongFuelAmount;
            }

        }, error1 => {
            this.isLoading = false;
            this.errorLoad = true;
        });
    }

    loadCustomer(customerId) {
        if (customerId !== this.customer.id) {
            this.customerService.find(customerId)
                .subscribe(customerResponse => {
                    this.customer = customerResponse.body;
                    this.applyCustomer();
                });
        } else {
            this.applyCustomer();
        }
        this.loadOrderHistory(customerId);
    }

    loadOrderHistory(customerId) {
        if (customerId) {
            this.ordersHistory = [];
            this.orderService.queryByCustomer(customerId).subscribe(value => {
                this.ordersHistory = value.body;
            });
        }
    }

    applyCustomer() {
        this.existCustomer = true;

        if (this.activeIndex === 1) {
            if (!this.boundarySell.id) {
                this.boundarySell.customerId = this.customer.id;
                this.boundarySell.vehicleModelId = this.customer.vehicleModelId;
                if (this.customer.vehicleModelType !== this.VehicleModelType[this.VehicleModelType.CAR]) {
                    this.customer.carTanks.forEach(value => {
                        const boundaryItem = new BoundarySellItem();
                        boundaryItem.carTankId = value.id;
                        boundaryItem.carTank = value;
                        boundaryItem.tankNo = Number(value.tankNo);
                        boundaryItem.carTank.maxHeight = boundaryItem.carTank.height * 10;
                        boundaryItem.amountType = this.AmountType[this.AmountType.NORMAL];
                        boundaryItem.productId = this.customer.productId;
                        this.boundarySell.boundarySellItems.push(boundaryItem);
                    });
                    this.boundarySell.boundarySellItems.push({ // create init boundary item for car tank 4.
                        productId: this.customer.productId,
                        amountType: this.AmountType[this.AmountType.CAR_TANK_4_AMOUNT]
                    });
                    this.boundarySell.boundarySellItems.push({ // create init boundary item for pump.
                        productId: this.customer.productId,
                        amountType: this.AmountType[this.AmountType.PUMP_NOZZLE_AMOUNT]
                    });
                    this.findLastDriverName();

                } else {

                    this.boundarySell.boundarySellItems.forEach(value => value.amountType = this.AmountType[this.AmountType.NORMAL]);
                    this.vehicleCapacityService.queryBoundary(this.customer.vehicleModelId)
                        .subscribe(value => {
                            const vehicleCapacity = value.body;
                            this.boundarySell.boundarySellItems.push({
                                amountType: this.AmountType[this.AmountType.NORMAL],
                                realAmount: vehicleCapacity.capacity,
                                maxAmount: vehicleCapacity.capacity,
                                productId: vehicleCapacity.productId,
                                productTitle: vehicleCapacity.productTitle
                            });
                        });
                }
            } else {
                this.boundarySell.boundarySellItems.forEach((boundaryItem, index) => {
                    if (boundaryItem.amountType === AmountType[AmountType.PUMP_NOZZLE_AMOUNT]) {
                        boundaryItem.tankNo = 100;
                    } else if (boundaryItem.amountType === AmountType[AmountType.CAR_TANK_4_AMOUNT]) {
                        boundaryItem.tankNo = 99;
                    } else if (boundaryItem.amountType === AmountType[AmountType.NORMAL]) {
                        if (boundaryItem.carTankId) {
                            boundaryItem.carTank = this.customer.carTanks.find(value1 => value1.id === boundaryItem.carTankId);
                        }
                        if (boundaryItem.carTank && boundaryItem.carTank.tankNo) {
                            boundaryItem.tankNo = Number(boundaryItem.carTank.tankNo);
                        } else {
                            boundaryItem.tankNo = index;
                        }
                    }

                });
                this.applyBoundarySellPrice(JSON.parse(JSON.stringify(this.boundarySell)));
            }

            this.loadCurrencies();
            this.loadLocation();
        }

        if (this.customer.vehicleModelType !== this.VehicleModelType[this.VehicleModelType.CAR]) {
            const normalBoundaryItems = this.boundarySell.boundarySellItems.filter(value => value.amountType === this.AmountType[this.AmountType.NORMAL]);
            for (let i = 0; i < normalBoundaryItems.length; i++) {
                normalBoundaryItems[i].carTank = this.customer.carTanks.find(value => value.id === normalBoundaryItems[i].carTankId);
                normalBoundaryItems[i].carTank.maxHeight = normalBoundaryItems[i].carTank.height * 10;
            }
        }

        this.customer.carTanks.forEach(carTank => {
            this.getCarTankTitle(carTank);
        });
        if (this.customer.offender != null && this.customer.offender === true) {
            const error = {message: 'error.customer.is.offender'};
            this.onError(error);
            this.offender = true;
            return;
        }
        if (this.customer.attention != null && this.customer.attention === true) {
            const error = {message: 'error.customer.is.attention'};
            this.onError(error);
            this.attention = true;
        }
    }

    // region Select or Create Customer

    search() {
        if (this.searchPlaque && this.searchPlaque.plaque) {
            this.onChangePlaque();
        } else if (this.searchRfId) {
            this.onChangeRfId();
        }
    }

    onChangeRfId() {
        if (this.searchRfId) {
            this.searchPlaque = null;
            this.subscribeToLoadCustomer(this.customerService.findByRfId(this.searchRfId));
        }
    }

    onChangePlaque() {
        if (this.searchPlaque && this.searchPlaque.plaque) {
            this.searchRfId = '';
            this.subscribeToLoadCustomer(this.customerService.findByPlaque(this.searchPlaque.plaque));
        }
    }

    selectCustomer(value) {
        this.expand = false;
        this.customer = value;
        this.customer.carTanks.forEach(carTank => {
            this.getCarTankTitle(carTank);
        });

        this.loadOrderHistory(this.customer.id);

        this.existCustomer = true;
        this.customerCreate = false;
        this.router.navigate(['/boundary-sell/' + '/new'], this.orderId ? {queryParams: {mode: this.mode}} : {
            queryParams: {
                mode: this.mode,
                customer: this.customer.id
            }
        });
        if (value.offender != null && value.offender === true) {
            const error = {message: 'error.customer.is.offender'};
            this.onError(error);
            this.offender = true;
            return;
        }
        if (value.attention != null && value.attention === true) {
            const error = {message: 'error.customer.is.attention'};
            this.onError(error);
            this.attention = true;
        }
    }

    create() {
        this.expand = false;
        this.existCustomer = false;
        this.customer = new Customer();
        this.customer.carTanks = [];
        this.customerCreate = true;
        this.loadCountries();
        this.loadProducts();
        this.loadCustomerTypes();
        this.loadVehicleModels();
    }

    loadCustomerTypes() {
        this.customerTypeService.queryByCustomerGroup(this.CustomerGroup[this.CustomerGroup.BOUNDARY])
            .subscribe(value => {
                this.customerTypes = value.body;
            });
    }

    loadVehicleModels() {
        if (!this.vehicleModels || !this.vehicleModels.length) {
            if (this.boundarySell.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSHIP]) { // this query for load vehicle models that's have tank.
                this.vehicleModelService.query({
                    query: 'vehicleModelType#VehicleModelType.TRUCK&customerGroup#CustomerGroup.BOUNDARY'
                })
                    .subscribe(res => {
                        this.vehicleModels = res.body;

                    }, res => this.onError(res.message));

            } else if (this.boundarySell.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSIT]) {
                this.vehicleModelService.query({query: 'customerGroup#CustomerGroup.BOUNDARY'})
                    .subscribe(res => {
                        this.vehicleModels = res.body;

                    }, res => this.onError(res.message));
            }
        }
    }

    onChangeVehicleModel(vehicleModelId) {
        this.customer.productId = null;
        this.customer.transitPlaque = '';
        const vehicleModel = this.vehicleModels.find(value => value.id === vehicleModelId);
        this.customer.vehicleModelTitle = vehicleModel.title;
        this.boundarySell.vehicleModelId = vehicleModelId;

    }

    onChangeCustomerType(customerTypeId) {
        const customerType = this.customerTypes.find(value => value.id === customerTypeId);
        this.customer.vehicleModelType = customerType.vehicleModelType;
        this.customer.iranian = customerType.iranian;
        if (customerType.iranian) {
            const country = this.countries.find(value => value.checkNationalCode);
            if (country) {
                this.customer.countryId = country.id;
            }
        }
        const vehicleModels = this.vehicleModels.filter(value => value.vehicleModelType === customerType.vehicleModelType);

        const vehicleModel = {
            value: '',
            label: ''
        };
        this.customVehicleModels = [];
        this.customVehicleModels.push(vehicleModel);
        for (let i = 0; i < vehicleModels.length; i++) {
            this.customVehicleModels.push({
                value: vehicleModels[i].id,
                label: vehicleModels[i].title + (vehicleModels[i].capacityInfo ? (' - ' + vehicleModels[i].capacityInfo) : '')
            });
        }

        this.boundarySell.customerTypeId = customerTypeId;
    }

    loadCountries() {
        if (!this.countries || !this.countries.length) {
            this.countryService.findAll().subscribe(res => {
                this.countries = res.body;
                const country = {
                    value: '',
                    label: ''
                };
                this.customCountries = [];
                this.customCountries.push(country);
                for (let i = 0; i < this.countries.length; i++) {
                    this.customCountries.push({
                        value: this.countries[i].id,
                        label: this.countries[i].name
                    });
                }
            });
        }
    }

    loadProducts() {
        if (!this.products || !this.products.length) {
            this.productService.queryByCustomerGroup(CustomerGroup[CustomerGroup.BOUNDARY])
                .subscribe(res => {
                    this.products = res.body;
                    const product = {
                        value: '',
                        label: ''
                    };
                    this.customProducts = [];
                    this.customProducts.push(product);
                    for (let i = 0; i < this.products.length; i++) {
                        this.customProducts.push({
                            value: this.products[i].id,
                            label: this.products[i].title
                        });
                    }
                }, res => this.onError(res.message));
        }
    }

    saveCustomer() {
        if (this.customer.id) {
            this.nextStep();
        } else {
            this.subscribeToSaveResponseCustomer(this.customerService.createCar(this.customer));
        }
    }

    trackCustomerTypeById(index: number, item: CustomerType) {
        return item.id;
    }

    newCarTank() {
        this.cancelCarTank();
        this.carTankCreate = true;
    }

    editCarTank(item) {
        this.carTankEdit = true;
        this.carTank = this.customer.carTanks[this.customer.carTanks.indexOf(item)];
        this.tempEditCarTank = JSON.stringify(this.carTank);
    }

    // region CarTank

    deleteCarTank(item: CarTank) {
        this.customer.carTanks = this.customer.carTanks.filter(value => value !== item);
    }

    cancelCarTank() {
        this.carTankCreate = false;
        this.carTankEdit = false;
        if (this.tempEditCarTank) {
            const tempEditCarTank = JSON.parse(this.tempEditCarTank);
            this.carTank.height = tempEditCarTank.height;
            this.carTank.latitude = tempEditCarTank.latitude;
            this.carTank.longitude = tempEditCarTank.longitude;
            this.carTank.title = tempEditCarTank.title;
            this.carTank.radius = tempEditCarTank.radius;
            this.carTank.tankNo = tempEditCarTank.tankNo;
            this.carTank.tankType = tempEditCarTank.tankType;
        }
        this.carTank = new CarTank();
        this.tempEditCarTank = null;
    }

    saveCarTank() {
        if (this.carTankCreate) {
            this.customer.carTanks.push(this.carTank);
            this.getCarTankTitle(this.carTank);
            this.carTankCreate = false;
        } else {
            this.getCarTankTitle(this.carTank);
            this.carTankEdit = false;
        }
        this.carTank = new CarTank();
        this.tempEditCarTank = null;

    }

    changeTankType() {
        this.carTank.radius = null;
        this.carTank.longitude = null;
        this.carTank.latitude = null;
    }

    // region BoundaryItems
    loadLocation() {
        this.locationService.queryByLevel(3)
            .subscribe(value => {
                this.locations = value.body;
                if (this.boundarySell.orderType === this.OrderType[this.OrderType.BOUNDARY_TRANSHIP]) {
                    this.locations = this.locations.filter(value1 => value1.transhipType);
                }

                const location = {
                    value: '',
                    label: ''
                };
                this.customLocation = [];
                this.customLocation.push(location);
                for (let i = 0; i < this.locations.length; i++) {
                    this.customLocation.push({
                        value: this.locations[i].id,
                        label: this.locations[i].name
                    });
                }

                if (!this.boundarySell.locationId) {
                    this.boundarySell.locationId = this.locations[0].id;
                }
                this.onChangeLocation(this.boundarySell.locationId);

            });
    }

    loadCurrencies() {
        this.currencyService.queryByConfig(this.ConfigType[this.ConfigType.BOUNDARY_SELL])
            .subscribe(value => {
                this.currencies = value.body;
                if (!this.orderId || (this.orderId && !this.boundarySell.currencyId)) {
                    this.currencies.forEach(currency => {
                        if (currency.nationalCurrency) {
                            this.boundarySell.currencyId = currency.id;
                        }
                    });
                }
            });
    }

    findLastDriverName() {
        this.orderService.findBoundarySellDriver(this.customer.id).subscribe(driver => {
            this.boundarySell.personFirstName = driver.body.personFirstName;
            this.boundarySell.personLastName = driver.body.personLastName;
        });
    }

    // endregion CarTank

    // endregion Select or Create Customer

    onChangeLocation(locationId) {
        this.selectedLocation = this.locations.find(l => l.id === locationId);
        this.disabledCountry = false;
        if (this.selectedLocation.country) {
            this.boundarySell.targetCountryId = this.selectedLocation.country.id;
            this.country = this.selectedLocation.country;
        } else {
            this.country = new Country();
            this.boundarySell.targetCountryId = null;
            this.alertService.error('error.boundary.country.not.found');
        }
        if (this.boundarySell.locationId !== locationId) {
            this.boundaryDiscountId = null;
        }
        this.boundarySell.orderDiscount = new OrderDiscountDTO();

        this.findOpenShiftWork();

    }

    findOpenShiftWork() {
        if (this.boundarySell.locationId) {
            this.shiftWorkService.findOpenShiftWork(this.boundarySell.locationId).subscribe(shiftWork => {
                this.shiftWork = shiftWork.body;

                if (!this.boundarySell.id) {
                    this.boundarySell.orderNo = '';
                }

                if (this.shiftWork.type === 'OPEN_TOMORROW') {
                    this.boundarySell.registerDate = this.shiftWork.fromDate;
                } else if (this.shiftWork.type === 'CLOSE') {
                    this.boundarySell.registerDate = null;
                } else if (this.shiftWork.type === 'OPEN') {
                    this.boundarySell.registerDate = new Date();
                }
            });
        }
    }

    validateAmounts() {
    }

    calculatePrice() {
        this.boundarySell.customerTypeId = this.customer.typeId;
        this.boundarySell.vehicleModelType = this.customer.vehicleModelType;
        this.productRateService.getPriceForBoundarySell(this.boundarySell)
            .subscribe(value => {
                this.applyBoundarySellPrice(value.body);
            });
    }

    applyBoundarySellPrice(boundarySell) {
        this.showPriceTable = true;
        if (!this.boundarySellPrice.tolerance) {
            this.boundarySellPrice = boundarySell;
        }
        this.totalAmount = 0;

        this.boundarySellPrice.boundarySellItems.forEach((boundaryItem, index) => {
            if (boundaryItem.amountType !== this.AmountType[this.AmountType.PUMP_NOZZLE_AMOUNT]) {
                this.totalAmount += boundaryItem.realAmount;
            }

            if (boundaryItem.amountType === AmountType[AmountType.PUMP_NOZZLE_AMOUNT]) {
                boundaryItem.tankNo = 100;
            } else if (boundaryItem.amountType === AmountType[AmountType.CAR_TANK_4_AMOUNT]) {
                boundaryItem.tankNo = 99;
            } else if (boundaryItem.amountType === AmountType[AmountType.NORMAL]) {
                if (boundaryItem.carTank && boundaryItem.carTank.tankNo) {
                    boundaryItem.tankNo = Number(boundaryItem.carTank.tankNo);
                } else {
                    boundaryItem.tankNo = index;
                }
            }

        });
        this.totalAmount = +this.totalAmount.toFixed(1);
    }

    getCarTankTitle(carTank: CarTank) {
        if (carTank) {
            this.translateService.get('niopdcgatewayApp.TankType.' + carTank.tankType).subscribe(value =>
                carTank.title = `${value} (${carTank.longitude} × ${carTank.latitude} × ${carTank.height})`);
        }
    }

    trackCurrencyById(index: number, item: Currency) {
        return item.id;
    }

    // region payment
    startBankTransactionByPrePay(prePay: OrderPrePay) {
        this.orderService.startBankTransactionByOrderPrePay(prePay.id).subscribe(res => {
            this.router.navigate(['/boundary-sell/' + this.boundarySell.id + '/edit/payment'], {
                queryParams: {
                    mode: this.mode,
                    payId: res.body
                }
            });
        });
    }

    startBankTransaction() {
        this.orderService.startBankTransactionByOrder(this.boundarySell.id).subscribe(res => {
            this.router.navigate(['/boundary-sell/' + this.boundarySell.id + '/edit/payment'], {
                queryParams: {
                    mode: this.mode,
                    payId: res.body
                }
            });
        });
    }

    restartBankTransaction() {
        this.bankTransactionService.restartBankTransaction(this.identifier).subscribe(res => {
            this.identifier = res.body;
            this.router.navigate(['/boundary-sell/' + this.boundarySell.id + '/edit/payment'], {
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
                this.orderService.findBoundarySell(this.orderId).subscribe(value => {
                    this.boundarySell.status = value.body.status;
                    this.boundarySell.multiPrePay = value.body.multiPrePay;

                    this.isUserPaid = (this.boundarySell.status === this.OrderStatus[OrderStatus.PAID] ||
                        (this.boundarySell.status === this.OrderStatus[OrderStatus.PAID_PUMP] && !this.transitAlongFuelAmountSetter && !this.transhipAlongFuelAmountSetter));

                    this.isView = (this.isUserPaid || this.boundarySell.status === this.OrderStatus[OrderStatus.PENDING] || this.boundarySell.status === this.OrderStatus[OrderStatus.DE_ACTIVE]);

                    this.previousStep();
                });
            }, 3000);
        }
    }

    // endregion

    clear() {
        this.router.navigate(['boundary-sell']);
    }

    previousStep() {
        if (this.activeIndex === 1) {
            this.router.navigate(['boundary-sell/' + (this.orderId ? (this.orderId + '/edit') : 'new')], this.orderId ? {queryParams: {mode: this.mode}} : {
                queryParams: {
                    mode: this.mode,
                    customer: this.customer.id
                }
            });
        } else if (this.activeIndex === 2) {
            this.router.navigate(['boundary-sell/' + this.orderId + '/edit/product'], {queryParams: {mode: this.mode}});
        } else if (this.activeIndex === 3) {
            this.router.navigate(['boundary-sell/' + this.orderId +
            ((this.boundarySell && (this.boundarySell.multiPrePay || (this.boundarySell.orderPrePays && this.boundarySell.orderPrePays.length))) || this.isView ?
                '/edit/payment-list' :
                '/edit/product')], {queryParams: {mode: this.mode}});
        }

    }

    // endregion

    saveOrder(payment) {
        this.isSaving = true;
        if (this.activeIndex === 1) {
            this.boundarySell.createBankTransaction = payment;
            if (this.boundarySell.id && this.isView) {
                this.router.navigate(['boundary-sell/' + this.boundarySell.id + '/edit/payment-list'], {queryParams: {mode: this.mode}});
            } else {
                this.orderService.createBoundarySell(this.boundarySell)
                    .subscribe(result => {
                        this.boundarySell = result.body;
                        if (!payment) {
                            this.router.navigate(['boundary-sell']);
                        } else {
                            this.identifier = this.boundarySell.payId;
                            if (this.boundarySell.payId) {
                                this.router.navigate(['boundary-sell/' + this.boundarySell.id + '/edit/payment'], {
                                    queryParams: {
                                        mode: this.mode,
                                        payId: this.boundarySell.payId
                                    }
                                });
                            } else {
                                this.router.navigate(['boundary-sell/' + this.boundarySell.id + '/edit/payment-list'], {queryParams: {mode: this.mode}});
                            }
                        }
                    }, error => this.onError(error.error));
            }
        }
    }

    onCmrChange(load) {
        if (this.boundarySell.locationId && this.customer && this.customer.id) {

            if (!this.boundarySell.cmr) {
                this.inquiry = undefined;
                if (load) {
                    this.alertService.error('error.cmrIsEmpty');
                }
                return;
            }
            if (load) {
                this.inquiringCmr = true;
                this.boundaryDiscountService.findBoundaryDiscountByLocationAndCustomerAndCmr(this.boundarySell.locationId, this.customer.id, this.boundarySell.cmr, this.customer.vehicleModelType)
                    .subscribe(res => {
                        this.inquiry = res.body;
                        this.boundarySell.personFirstName = this.inquiry.driverFirstName;
                        this.boundarySell.personLastName = this.inquiry.driverLastName;
                        this.boundarySell.orderDiscount = new OrderDiscountDTO();
                        this.boundarySell.orderDiscount.boundaryDiscountId = this.inquiry.boundaryDiscount.id;
                        if (this.inquiry.country) {
                            this.country.id = this.inquiry.country.id;
                            this.boundarySell.targetCountryId = this.inquiry.country.id;

                        }
                        this.boundaryDiscount = this.inquiry.boundaryDiscount;
                        this.boundaryDiscount.title = this.boundaryDiscount.liter + ' لیتر ' + '(' + this.inquiry.country.name + ')';
                        this.inquiringCmr = false;
                    }, error => {
                        this.inquiringCmr = false;
                    });
            }
        }
    }

    private subscribeToLoadCustomer(result: Observable<HttpResponse<Customer[]>>) {
        result.subscribe((value: HttpResponse<Customer[]>) => {
            if (value.body) {
                this.customers = value.body;
                this.customer = new Customer();

                this.existCustomer = false;
                this.customerCreate = false;

                if (this.customers && this.customers.length && this.customers.length === 1) {
                    this.selectCustomer(this.customers[0]);
                }

            } else {
                this.alertService.error('error.customer.not.found');
            }
        });
    }

    private subscribeToSaveResponseCustomer(result: Observable<HttpResponse<Customer>>) {
        result.subscribe((res: HttpResponse<Customer>) => {
            this.customer = res.body;
            this.nextStep();
        });
    }

    private onError(error: any) {
        this.isSaving = false;
        this.alertService.error(error.message, null, null);
    }

    private nextStep() {
        if (this.activeIndex === 0) {
            this.router.navigate(['/boundary-sell/' + (this.orderId ? (this.orderId + '/edit/product') : 'new/product')], this.orderId ? {queryParams: {mode: this.mode}} : {
                queryParams: {
                    mode: this.mode,
                    customer: this.customer.id
                }
            });
        }
    }
}
