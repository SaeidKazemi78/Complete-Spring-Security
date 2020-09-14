import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Region, RegionService} from '../region';
import {RemoteService} from '../../shared/remoteService';
import {CustomerService} from '../customer';
import {BankAccount} from '../bank-account';
import {Bank, BankService} from '../bank';
import {UserManagementService} from 'app/entities/user-management';
import {STRONG_PASSWORD} from 'app/shared/constants/regex.constants';
import {UserRequest} from 'app/entities/user-request/user-request.model';
import {UserRequestService} from 'app/entities/user-request';
import {Role, RoleService} from 'app/entities/role';
import {DateJalaliPipe} from 'app/shared/ng2-datetimepicker-jalali/date-jalali.pipe';
import {ScriptService} from 'app/shared/script/script.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PersonService} from 'app/entities/person';
import {Account, AccountService, Principal} from 'app/shared';
import {log} from 'util';
import {Subject} from 'rxjs';

@Component({
    selector: 'jhi-person-register-dialog',
    templateUrl: './user-register-dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UserRegisterDialogComponent implements OnInit {


    patternPassword = STRONG_PASSWORD;
    regexCode = /^[\d]{10}$/;
    isSaving: boolean;
    isView: boolean;
    canInput = false;
    blocked = false;
    regions: Region[];
    mapSiteItems: any;
    locationIdd;
    old;

    lastCode: String;
    defaultVal:string;
    username: '';
    password: '';
    confirmPassword: '';
    selectedSellCode = [];
    shabaNumberPattern = /^[Ii][Rr][0-9]{23}$/;
    salesCode: any;
    counter: 0;
    existUser: boolean;
    existEmail: boolean;
    existPerson: boolean;
    customers = [];
    created: boolean;
    notFind = false;
    companyName;
    contractNo;
    locationName;
    boundary;
    minDateTime = new Date();
    maxDateTime = new Date()
    personFind: boolean;
    notHaveIdCode: boolean;


    editable = false;
    bankAccount: BankAccount = new BankAccount();
    bankAccounts: BankAccount[] = [];
    banks: Bank[] = [];
    userRequest: UserRequest = new UserRequest();
    confirmPass = null;
    canEditFatherName: boolean;
    defaultBoundary:string;
    canEditFirstName: boolean;
    isPrivate:boolean=false;
    isDisabled:boolean=false;
    canEditIdCode: boolean;
    canEditLastName: boolean;
    canEditCellPhone: boolean;
    locationVal:string;
    tempRole: Role[] = [];
    trackingCode?: string = null;
    boundaries?:any=this.userRequestService.boundaries;
    json = {
        info: {},
    };


    constructor(

        private customerService: CustomerService,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private script: ScriptService,
        private bankService: BankService,
        private personService: PersonService,
        private principal: Principal,
        private translateService: TranslateService,
        private regionService: RegionService,
        private userService: UserManagementService,
        private remoteService: RemoteService,
        private userRequestService: UserRequestService,
        private roleService: RoleService) {


    }

    edit() {
        this.customers = [];
        this.old = false;
        this.userRequest = new UserRequest();
        this.ngOnInit();
        this.router.navigate(['/user', this.trackingCode, 'edit-register']);
    }

    ngOnInit() {
        this.userRequestService.boundaries.subscribe(res=>{
            this.boundaries=res;
        },
                error => {
                console.log(" Error by boundaries subscribe : ");
            });

        this.activatedRoute.params.subscribe(value => {
            if (value['code']) {
                this.userRequestService.findByTrackingCode(value['code']).subscribe(value1 => {
                    this.userRequest = value1.body;
                    console.log(" Updating .... : ");
                    console.log(value1.body)
                    if(value1.body.organization=='PERSONAL'){
                        this.isDisabled=true;
                    }
                    this.changeUserType();
                });
            } else if (value['login']) {
                this.principal.identity().then((account: any) => {
                    if (account) {
                        this.userRequest.createAfterLogin = true;
                        this.userRequest.login = account.login;
                        this.userRequest.birthday = account.birthday;
                        this.userRequest.email = account.email;
                        this.userRequest.firstName = account.firstName;
                        this.userRequest.lastName = account.lastName;
                        this.userRequest.fatherName = account.fatherName;
                        this.userRequest.nationalCode = account.nationalCode;
                        this.userRequest.personnelCode = account.personnelCode;
                        this.userRequest.userType = account.userType;
                        this.userRequest.cellPhone = account.cellPhone;
                        this.canEditFatherName = !this.userRequest.fatherName;
                        this.canEditFirstName = !this.userRequest.firstName;
                        this.canEditIdCode = !this.userRequest.idCode;
                        this.canEditLastName = !this.userRequest.lastName;
                        this.canEditCellPhone = !this.userRequest.cellPhone;

                        this.changeUserType();
                    } else {
                        // this.userRequest = new UserRequest();
                    }
                });
            }
        });

        this.minDateTime.setFullYear(this.minDateTime.getFullYear() - 120, 2, 22);
        this.maxDateTime.setFullYear(this.maxDateTime.getFullYear());

        this.activatedRoute.data.subscribe(value => {
            this.created = value.created;
        });
        this.isView = View.isView;
        this.isSaving = false;

        this.setBreadCrumb();

        // this.onChangeNationalCode(!this.person.id);
    }

    clearFields(){
        this.userRequest.serviceKind=null;
        this.userRequest.serviceLocation=null;
        this.userRequest.boundaryId=null;
        this.userRequest.locationId=null;
        this.userRequest.contractNo=null;
        this.locationVal="";
        this.defaultBoundary="";
    }

    onChange(event){
        this.tempRole.splice(0,this.tempRole.length);
        this.regionService.regionText.next("");
        if(event=='PERSONAL_CORPORATIONS' ){
            this.isPrivate=true;
            this.isDisabled=false;
        }else if(event=='PERSONAL'){
            this.defaultVal='';
            this.isPrivate=true;
            this.isDisabled=true;
            this.clearFields();

        }else {
            this.isPrivate=false;
            this.isDisabled=false;

        }

    }



    inquiry() {
        if (this.userRequest.nationalCode && this.userRequest.birthday) {
            this.personService.findByBaseInfo({
                code: this.userRequest.nationalCode,
                idCode: this.userRequest.idCode,
                birthday: this.userRequest.birthday,
                personality: 'NATURAL'
            }).subscribe(value => {
                this.userRequest.firstName = value.body.firstName;
                this.userRequest.lastName = value.body.lastName;
                this.userRequest.fatherName = value.body.fatherName;
                this.userRequest.nationalCode = value.body.code;
                this.userRequest.idCode = value.body.idCode;
                this.userRequest.valid = true;
                this.canEditFatherName = !value.body.fatherName;
                this.canEditFirstName = !value.body.firstName;
                this.canEditIdCode = !value.body.idCode;
                this.canEditLastName = !value.body.lastName;
            }, error => {
                this.canEditFatherName = true;
                this.canEditFirstName = true;
                this.canEditIdCode = true;
                this.canEditLastName = true;
            });
        }
    }

    setBreadCrumb() {
        this.mapSiteItems = [];
        this.translateService.get('global.menu.home').subscribe(title => {
            this.mapSiteItems.push({label: title, routerLink: ['/']});
        });
        this.translateService.get('niopdcgatewayApp.person.home.title').subscribe(title => {
            this.mapSiteItems.push({
                    label: title
                    , routerLink: ['/person']
                }
            );
        });

        this.translateService.get('niopdcgatewayApp.person.home.createLabel').subscribe(title => {
            this.mapSiteItems.push({label: title});
        });
    }

    selectBoundary(id){
        console.log(" Boundary Id selected  : " +id);
    }

    save() {
        this.isSaving = true;

        console.log(this.userRequest);
        if (!this.userRequest.createAfterLogin) {
            this.userRequestService.createNew(this.userRequest).subscribe(value =>
                this.onSaveSuccess(value), error => {
                console.log( "Error : ");
                console.log(error);
                this.onError(error.error);
                this.onSaveError();
            });
        } else {
            this.userRequestService.create(this.userRequest).subscribe(value =>
                this.onSaveSuccess(value),
                    error => {
                        console.log( "Error : ");
                        console.log(error);
                this.onError(error.error);
                this.onSaveError();
            });
        }
    }

    clickCombo(){

        if(this.boundaries.length==undefined){
            this.jhiAlertService.error('لطفا ابتدا منطقه را انتخاب کنید', null, null);
        }else if(this.boundaries.length==0){
            this.jhiAlertService.error('برای این منطقه مرزی وجود ندارد', null, null);
        }
    }
    clear() {
        this.router.navigate(['/']);
    }

    //************************
    changeUserType() {

        this.roleService.getAllRole(this.userRequest.userType).subscribe(req => {
            let NEZARATI_ROLE_ID=21067;
            if(this.isDisabled){
                this.tempRole = req.body.filter(val=>{
                    return val.id==NEZARATI_ROLE_ID;
                });
            }else {
                this.tempRole = req.body;
            }
        });
    }

    async print() {
        const data = await this.script.load('stimulsoft.reports');
        const data2 = await this.script.load('stimulsoft.viewer');
        console.log('script loaded ', data);
        console.log('script loaded ', data2);
        const options = new Stimulsoft.Viewer.StiViewerOptions();
        options.exports.showExportToPdf = false;
        options.exports.showExportToExcel = false;
        options.exports.showExportToExcel2007 = false;
        options.exports.showExportToExcelXml = false;
        options.exports.showExportToWord2007 = false;
        options.toolbar.showPrintButton = true;
        options.toolbar.showAboutButton = false;
        options.exports.showExportToDocument = false;
        options.exports.showExportToImageJpeg = true;
        options.appearance.scrollbarsMode = true;
        const viewer: any = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile('/content/mrt/BMitra1.ttf', 'B Mitra');
        this.userRequestService.findByTrackingCode(this.trackingCode)
            .subscribe(res => {

                    this.json.info = res.body;
                    const date = new Date(this.json.info['date']);
                    this.json.info['birthday'] = new DateJalaliPipe().transform(this.json.info['birthday']);
                    this.json.info['role'] = res.body.role.name;
                    this.json.info['degreeOfEducation'] = this.translateService.instant('niopdcgatewayApp.degreeOfEducation.' + res.body.degreeOfEducation);
                    this.json.info['employmentStatus'] = this.translateService.instant('niopdcgatewayApp.employmentStatus.' + res.body.employmentStatus);
                    this.json.info['userType'] = this.translateService.instant('niopdcgatewayApp.userType.' + res.body.userType);
                    this.json.info['organization'] = this.translateService.instant('niopdcgatewayApp.organization.' + res.body.organization);

                    const report = new Stimulsoft.Report.StiReport();
                    report.loadFile('/content/mrt/userRequest.mrt');

                    const dataSet = new Stimulsoft.System.Data.DataSet('Demo');

                    const strJson = JSON.stringify(this.json);
                    console.log(strJson);
                    dataSet.readJson(strJson);
                    report.dictionary.databases.clear();
                    report.regData('Demo', 'Demo', dataSet);
                    viewer.report = report;

                    console.log('Rendering the viewer to selected element');
                    viewer.renderHtml('viewer');
                    this.setBreadCrumb();
                },
                (res: HttpErrorResponse) => this.onError(res.error));

    }

    private onSaveSuccess(result: any) {
        this.isSaving = true;
        this.created = true;
        this.trackingCode = result.body.trackingCode;
        // setTimeout(() => {
        // this.router.navigate(['/person/register/created']);
        // }, 3000);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        console.log('error', error);
        if (error && error.message) {
            this.jhiAlertService.error(error.message, null, null);
        }
    }
}

class View {
    static isView: boolean;
}
