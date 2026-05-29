import { Inject, Injectable } from '@angular/core';
//UPGRADEANGULAR15: import { Headers, Http } from '@angular/http';
import { Router, UrlTree } from '@angular/router';
import { Title } from "@angular/platform-browser";

// import {
//     DEBUG, APP_NAME, APP_VERSION, APP_TABLE_PREFIX, APP_ICON, APP_ICONMIN,
//     BASE_APP_URL, ROUTING_NULL,
//     HIDE_COLUMN, DATA_TYPE, FIELD_TYPE, FIELD_REPORT_TYPE, PRODUCTION_STATUS, STABILIMENTI_ERP,
//     DOC_STATO, PORTCALL_STATUS,
//     FOLDER_URL,
//     SERVER_URL_API,
//     CLIENT_PORT,
//     SERVER_PORT
// } from "./config";

//UPGRADEANGULAR15: import 'rxjs/add/operator/toPromise';
//UPGRADEANGULAR15: import 'rxjs/add/operator/catch';
//UPGRADEANGULAR15: import { saveAs } from 'file-saver';

// import { Agency } from "./classes/agency";
// import { Agent } from './classes/agent';
// import { AdiutoSetup } from "./classes/adiuto-setup";
// import { AdiutoSetupDetail } from "./classes/adiuto-setup-detail";
// import { AdiutoSetupDetailLine } from "./classes/adiuto-setup-detail-line";
// import { AttachmentType } from "./classes/attachment-type";
// import { BankAccount } from "./classes/bank-account";
// import { Contact } from "./classes/contact";
// import { Country } from "./classes/country";
// import { Customer } from "./classes/customer";
// import { CustomerDepartment } from "./classes/customer-department";
// import { CustomerGroup } from "./classes/customer-group";
// import { CustomerRole } from "./classes/customer-role";
// import { User } from "./classes/user";
// import { User_Company } from "./classes/user-company";
// import { User_Company_Filter } from "./classes/user-company-filter";
// import { View } from "./classes/view";
// import { Company } from "./classes/company";
// import { Log } from "./classes/log";
// import { Permission } from "./classes/permission";
// import { Permission_TableData } from "./classes/permission-tabledata";
// import { Pier } from "./classes/pier";
// import { Port } from "./classes/port";
// import { PortAgency } from "./classes/port-agency";
// import { Role } from "./classes/role";
// import { Ship } from "./classes/ship";
// import { Vendor } from "./classes/vendor"
// import { Currency } from "./classes/currency";
// import { Item } from "./classes/item";
// import { Favorite } from "./classes/favorite";
// import { ItemCategory } from "./classes/item-category";
// import { Item_Port_Vendor } from "./classes/item-port-vendor";
// import { PortCallCargo } from './classes/port-call-cargo';
// import { PortCallHeader } from "./classes/port-call-header";
// import { PortCallType } from "./classes/port-call-type";
// import { PortGroup } from "./classes/port-group";
// import { PostCode } from "./classes/post-code";
// import { RemarkType } from "./classes/remark-type";
// import { DelayType } from "./classes/delay-type";
// import { ShipType } from "./classes/ship-type";
// import { ShipTypology } from "./classes/shiptypology";
// import { Template } from "./classes/template";
// import { TemplateLog } from "./classes/template-log";
// import { TemplatePanel } from "./classes/template-panel";
// import { TemplateRemark } from "./classes/template-remark";
// import { TemplateTab } from "./classes/template-tab";
// import { UnitOfMeasure } from "./classes/unit-of-measure";
// import { VendorGroup } from "./classes/vendor-group";
// import { VendorRole } from "./classes/vendor-role";
// import { PortCallSearch } from './classes/port-call-header';

// import { PERMESSO } from './shared/classes/permesso';
// import { AUTOSAT } from './shared/classes/autosat';
// import { User_LAYOUT } from './shared/classes/user_layout';
// import { User_CONFIGURAZIONE } from './shared/classes/user_configurazione';
//UPGRADEANGULAR15: import { filterQueryId } from '@angular/core/src/view/util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
// import { INavData, ToasterComponent, ToasterPlacement } from '@coreui/angular';
// import { ToastersService } from '../components/toasters/toasters.service';
// import { forEach, mapValues } from 'lodash-es';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Job } from './demo/Class/Commesse';
import { environment } from 'src/environments/environment';
// import { AppToastComponent } from './views/notifications/toasters/toast-simple/toast.component';
// import { ElementCardField, DataType, Colors } from './layout/layout.service';
// import { Item_ShipTypology } from './classes/item-shiptypology';
// import { Ship_ShipTypology } from './classes/ship-shiptypology';



declare let $: any;

@Injectable()
export class AppService {
    private headers: HttpHeaders;
    private currentOpeartore: string = '';
    public EditRoute: string;

    public ResourceNo = "";
    public resourceName="";
    public JobNo: string = "";
    public JobDescription: string = "";
    public HourWorked: number = 0;
    public isSoapWS: boolean = false;
    public soapFunction: string = "";
    public soapCodeunit: string = "";

    // portCallList: PortCallHeader[];

    public loginDone: boolean = false;
    public app: App;
    public appParameters: AppParameters;
    public icons: any;
    public loading: boolean;
    public months: string[];
    public minDate: Date;
    public username: string;
    public password: string;
    // public favouriteList: Favorite[];
    public reloadList: boolean;
    public themeDark: boolean;

    public linkAnalisi: string = '';
    public countAvvisiNonGestiti: number = 0;
    public showDelete: Boolean = false;
    public fromDashboard: Boolean = false;
    public isClearOrFirstAccess = true;

    public showSidebar: boolean = true;

    public initSearch: boolean = false;
    public commesse: Job = new Job;
    // public company: Company = new Company;
    // public userCompany: User_Company = new User_Company();
    // public contact: Contact = new Contact;
    // public customergroup: CustomerGroup = new CustomerGroup;
    // public country: Country = new Country;
    public listLoaded: boolean;
    public list: AppServiceList = new AppServiceList();
    // public view: View = new View;
    // public views: View[] = [];
    // public portCallSearch: PortCallSearch = new PortCallSearch();
    // public portCallSearch_Dashboard: PortCallSearch = new PortCallSearch();
    public searchDataLoaded: boolean = false;

    // public permessi: PERMESSO[] = [];
    // public layout: User_LAYOUT[] = [];

    // public user_configurazioni: User_CONFIGURAZIONE[] = [];

    // public autosats: AUTOSAT[] = [];

    public reload: boolean;
    // public portCallStatus: any = PORTCALL_STATUS;


    public documentoStato: any[] = [];

    constructor(
        // private toastersService: ToastersService,
        private http: HttpClient,
        private router: Router,
        private titleService: Title) {
        // this.app = new App(APP_NAME, APP_VERSION, APP_TABLE_PREFIX, APP_ICON, APP_ICONMIN, DEBUG);
        // this.setTitle(APP_NAME);
        this.appParameters = new AppParameters(true, false, "");
        this.reload = false;
        this.minDate = new Date(1950, 0, 1);
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.loading = false;
        this.months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        this.currentOpeartore = "";
        // this.user = new User();
        // this.contact = new Contact();
        // this.customergroup = new CustomerGroup();
        // this.country = new Country();
        this.initSearch = true;
        this.countAvvisiNonGestiti = 0;
        this.linkAnalisi = "PRODUZIONE";
        this.showSidebar = true;
        this.username = '';
        this.password = '';
        this.EditRoute = "";
        // this.portCallList = [];
        this.documentoStato = [];
        // this.favouriteList = [];
        this.reloadList = false;
        this.listLoaded = false;
        this.themeDark = false;
        let statoVuoto = { Stato: "" };
        this.documentoStato.push(statoVuoto);
        // // let statoNuovo = { Stato: DOC_STATO.Nuovo };
        // this.documentoStato.push(statoNuovo);
        // // let statoAperto = { Stato: DOC_STATO.Aperto };
        // this.documentoStato.push(statoAperto);
        // let statoChiuso = { Stato: DOC_STATO.Chiuso };
        // this.documentoStato.push(statoChiuso);
        //  this.init();



    }

    // init() {
    //     this.msalService.initialize();
    //     // if (this.loginDone) {
    //     //     const account = this.msalService.instance.getActiveAccount();
    //     //     if (account) {
    //     //         this.loadUserProfile(account);
    //     //     }
    //     // }
    // }




    // async getUsername(): Promise<string | null> {
    //     if (this.loginDone) {
    //         await this.msalService.instance.initialize(); // Add this line
    //         const account = this.msalService.instance.getActiveAccount();
    //         return account ? account.username : null;
    //     }
    //     return "";
    // }

    // async getUserProfile(): Promise<Observable<any>> {

    //         await this.msalService.instance.initialize(); // Add this line
    //         return this.http.get('https://graph.microsoft.com/v1.0/me');
    // }



    // get isLoggedIn(): boolean {
    //     if (this.loginDone)
    //         return this.msalService.instance.getActiveAccount() != null;
    //     return false;
    // }


    setPageHeader(pageElement: string = "", pageTitle: string = "", showSearch: boolean = false, searchText: string = "", showAdvancedFilter: boolean = false) {
        if (this.appParameters) {
            this.appParameters.PageElement = pageElement;
            this.appParameters.PageTitle = pageTitle;
            this.appParameters.SearchText = searchText;
            this.appParameters.ShowSearch = showSearch;
            this.appParameters.ShowAdvancedFilter = showAdvancedFilter;
        }
    }


    toggleSidebar() {
        this.showSidebar = !this.showSidebar;
    }

    setUsernamePassword(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    setLogo(path: string): string {
        let logo = "";
        switch (environment.company) {
            case "TWINPACK SPA":
                logo = path;
                logo += "twinpack.png";
                break;
            case "TWINOVA":
                logo = path;
                logo += "twinova.png";
                break;
            default:
                break;
        }
        return logo;
    }


    getCompanyColor(): string {
        switch (environment.company) {
            case 'TWINPACK SPA': return '#0d6efd'; // blu
            case 'TWINOVA': return '#dc3545'; // rosso
            default: return '#0d6efd';
        }
    }

    getCompanyFilter(): string {
        switch (environment.company) {
            case 'TWINPACK SPA': return 'invert(32%) sepia(85%) saturate(2300%) hue-rotate(210deg) brightness(95%) contrast(100%)';
            case 'TWINOVA': return 'invert(29%) sepia(89%) saturate(630%) hue-rotate(340deg) brightness(90%) contrast(95%)'; // rosso
            default: return 'invert(32%) sepia(85%) saturate(2300%) hue-rotate(210deg) brightness(95%) contrast(100%)';
        }
    }


    // getDataList(responseData: any) {
    //     this.list.Agency = responseData.ListAgency;
    //     this.list.Agent = responseData.ListAgent;
    //     this.list.AdiutoSetup = responseData.ListAdiutoSetup;
    //     this.list.AdiutoSetupDetail = responseData.ListAdiutoSetupDetail;
    //     this.list.AdiutoSetupDetailLine = responseData.ListAdiutoSetupDetailLine;
    //     this.list.AttachmentType = responseData.ListAttachmentType || []
    //     this.list.User = responseData.ListUser || []
    //     this.list.UserCompany = responseData.ListUserCompany || []
    //     this.list.UserCompanyFilter = responseData.ListUserCompanyFilter || []
    //     this.list.BankAccount = responseData.ListBankAccount || []
    //     this.list.Contact = responseData.ListContact || []
    //     this.list.Country = responseData.ListCountry || []
    //     this.list.Customer = responseData.ListCustomer || []
    //     this.list.CustomerDepartment = responseData.ListCustomerDepartment || [];
    //     this.list.CustomerGroup = responseData.ListCustomerGroup;
    //     this.list.View = responseData.ListView;
    //     this.list.Company = responseData.ListCompany;
    //     this.list.Log = responseData.ListLog;
    //     this.list.Permission = responseData.ListPermission;
    //     this.list.PermissionTableData = responseData.ListPermissionTableData;
    //     this.list.Pier = responseData.ListPier;
    //     this.list.Port = responseData.ListPort;
    //     this.list.PortAgency = responseData.ListPortAgency;
    //     this.list.Role = responseData.ListRole;
    //     this.list.Ship = responseData.ListShip;
    //     this.list.Vendor = responseData.ListVendor;
    //     this.list.Currency = responseData.ListCurrency;
    //     this.list.Item = responseData.ListItem;
    //     this.list.ItemCategory = responseData.ListItemCategory;
    //     this.list.ItemPortVendor = responseData.ListItemPortVendor;
    //     this.list.ItemShipTypology = responseData.ListItemShipTypology;
    //     this.list.PortCallCargo = responseData.ListPortCallCargo;
    //     this.list.PortCallHeader = responseData.ListPortCallHeader;
    //     this.list.PortCallType = responseData.ListPortCallType;
    //     this.list.PortGroup = responseData.ListPortGroup;
    //     this.list.PostCode = responseData.ListPostCode;
    //     this.list.RemarkType = responseData.ListRemarkType;
    //     this.list.DelayType = responseData.ListDelayType;
    //     this.list.ShipType = responseData.ListShipType;
    //     this.list.ShipTypology = responseData.ListShipTypology;
    //     this.list.ShipShipTypology = responseData.ListShipShipTypology;
    //     this.list.Template = responseData.ListTemplate || [];
    //     this.list.TemplateLog = responseData.ListTemplateLog || [];
    //     this.list.TemplatePanel = responseData.ListTemplatePanel || [];
    //     this.list.TemplateRemark = responseData.ListTemplateRemark || [];
    //     this.list.TemplateTab = responseData.ListTemplateTab || [];
    //     this.list.UnitOfMeasure = responseData.ListUnitOfMeasure || [];
    //     this.list.VendorGroup = responseData.ListVendorGroup || [];

    //     this.list.CustomerRole = responseData.ListCustomerRole || [];
    //     this.list.VendorRole = responseData.ListVendorRole || [];

    //     // this.list.ENUM_PortCallStatus = this.ENUM_PortCallStatus();
    // }

    getList(list: AppServiceList, listName: string): any[] {
        let listData: any[] = [];
        try {
            if (listName) {
                let lists: any = list;
                listData = lists[listName] || [];
            }
        } catch (ex) {
            console.log(ex)
        }
        return listData;
    }

    clearLocal(key: string) {
        if (localStorage) {
            localStorage.removeItem(key);
        }
    }

    clearLocals() {
        if (localStorage) {
            localStorage.clear();
        }
    }

    logout() {
        // this.init();
        // this.clearLocal(this.localStorage.Token);
        // this.clearLocal(this.localStorage.ChangePassword);
        this.navigate("login");
    }

    /************************** Common Functions ****************************/
    public setLoading(value: boolean) {
        this.loading = value;
    }

    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    public log(title: string, details: any) {
        // if (this.app.Debug) {
        //     console.log(title, details);
        // }
    }

    public error(title: string, details: any) {
        // if (this.app.Debug) {
        //     console.error(title, details);
        // }
    }

    public right(str: string, char: number) {
        return str.substr(str.length - char, str.length);
    }

    public left(str: string, char: number) {
        return str.substr(0, char);
    }

    public splice(array: any[], value: any) {
        for (var i = array.length; i--;) {
            if (array[i] === value) {
                array.splice(i, 1);
            }
        }
    }

    public removeSubstringFromArray(array: any[], value: string) {
        for (var i = array.length; i--;) {
            if (array[i].search(new RegExp(value, 'g'))) {
                array[i] = array[i].replace(new RegExp(value, 'g'), "");
            }
        }
    }

    public clone(data: any) {
        return JSON.parse(JSON.stringify(data))
    }

    public toString(data: any) {
        return JSON.stringify(data);
    }

    public addDays(date: Date, days: number) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public StringToDate(strDate: any, time: boolean = false, italian: boolean = false): Date {
        let date: any = null;
        try {
            let year = 1900;
            let month = 0;
            let day = 1;

            let hour = 0;
            let min = 0;
            let sec = 0;

            let copy = strDate;
            if (typeof strDate == 'string') {
                copy = copy.replace(new RegExp("T", 'g'), "-");
                copy = copy.replace(new RegExp("/", 'g'), "-");
                copy = copy.replace(new RegExp(" ", 'g'), "-");
                copy = copy.replace(new RegExp(":", 'g'), "-");
                let dt: string[] = copy.split("-");
                if (!italian) {
                    year = parseInt(dt[0]);
                    month = parseInt(dt[1]) - 1;
                    day = parseInt(dt[2]);
                }
                else {
                    year = parseInt(dt[2]);
                    month = parseInt(dt[1]) - 1;
                    day = parseInt(dt[0]);
                }

                if (time) {
                    hour = parseInt(dt[3]) || 0;
                    min = parseInt(dt[4]) || 0;
                    sec = parseInt(dt[5]) || 0;
                }
            }

            date = new Date(year, month, day, hour, min, sec);
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("StringToDate", ex);
        }
        return date;
    }

    public StringToDateObj(strDate: any): any {
        let date: any = {};
        try {
            let y = 1900;
            let m = 1;
            let d = 1;

            if (typeof strDate == 'string') {
                strDate = strDate.replace("T", "-");
                strDate = strDate.replace("/", "-");
                strDate = strDate.replace(" ", "-");
                strDate = strDate.replace(":", "-");
                let dt: string[] = strDate.split("-");
                y = parseInt(dt[0]);
                m = parseInt(dt[1]);
                d = parseInt(dt[2]);
            }

            date = {
                year: y,
                month: m,
                day: d
            };
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("StringToDate", ex);
        }
        return date;
    }

    public StringToTime(strTime: any): Date {
        let date: any = null;
        try {
            let year = 1900;
            let month = 0;
            let day = 1;

            let hour = 0;
            let min = 0;
            let sec = 0;

            let copy = strTime;
            if (typeof strTime == 'string') {
                strTime = strTime.replace(".", ":");
                let dt: string[] = strTime.split(":");
                hour = parseInt(dt[0]);
                min = parseInt(dt[1]);
                if (dt.length == 3)
                    sec = parseInt(dt[2]);
            }

            date = new Date(year, month, day, hour, min, sec);
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("StringToTime", ex);
        }
        return date;
    }

    public TimeStringToDateTimeString(strTime: any, showSeconds: boolean = false): any {
        let str: string = "";
        try {
            let yy = 1900;
            let M = 1;
            let dd = 1;
            let hh = 0;
            let mm = 0;
            let ss = 0;

            if (typeof strTime == 'string') {
                strTime = strTime.replace("T", "-");
                strTime = strTime.replace("/", "-");
                strTime = strTime.replace(" ", "-");
                strTime = strTime.replace(":", "-");
                strTime = strTime.replace(".", "-");
                let dt: string[] = strTime.split("-");
                if (dt[0] != null)
                    hh = parseInt(dt[0]);
                if (dt[1] != null)
                    mm = parseInt(dt[1]);
                if (dt[2] != null)
                    ss = parseInt(dt[2]);
            }

            let date = new Date(yy, M, dd, hh, mm, ss, 0);
            str = this.right("0000" + date.getFullYear(), 4) + '-' + this.right("00" + (date.getMonth() + 1), 2) + '-' + this.right("00" + date.getDate(), 2);
            str += "T";
            if (!showSeconds)
                str += this.right("00" + hh, 2) + ':' + this.right("00" + mm, 2) + ':00';
            else
                str += this.right("00" + hh, 2) + ':' + this.right("00" + mm, 2) + ':' + this.right("00" + ss, 2);
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("StringToDate", ex);
        }
        return str;
    }

    public DateObjToString(date: any): any {
        try {
            let y = this.right("0000" + date.year, 4);
            let m = this.right("00" + date.month, 2);
            let d = this.right("00" + date.day, 2);

            return y + "-" + m + "-" + d;
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("DateObjToString", ex);
        }
        return "";
    }

    public DateTimeStringToHttpGet(date: string): string {
        //return date.replace(":", ".");
        return date.replace(new RegExp(":", 'g'), ".");
    }

    public DateToString(date: Date, italian: boolean = false): string {
        if (date == null)
            return "";

        let str = "";
        try {
            if (date) {
                if (typeof date == 'string') {
                    let d: any = date;
                    let dd = d.split(" ");
                    if (dd.length > 1) {
                        return dd[0];
                    }
                    date = this.StringToDate(date, false, false);
                }
                str = this.right("0000" + date.getFullYear(), 4) + '-' + this.right("00" + (date.getMonth() + 1), 2) + '-' + this.right("00" + date.getDate(), 2);
                if (italian)
                    str = this.right("00" + date.getDate(), 2) + '/' + this.right("00" + (date.getMonth() + 1), 2) + '/' + this.right("0000" + date.getFullYear(), 4);
            }
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("DateToString", ex);
        }
        return str;
    }

    public DateToStringParsing(dateParam: Date, italian: boolean = false): string {
        if (dateParam == null)
            return "";
        let str = "";
        if (dateParam) {
            try {
                let date = dateParam;
                if (typeof date == 'string') {
                    date = this.StringToDate(date, true);
                }
                str = this.right("0000" + date.getFullYear(), 4) + '-' + this.right("00" + (date.getMonth() + 1), 2) + '-' + this.right("00" + date.getDate(), 2);
                if (italian)
                    str = this.right("00" + date.getDate(), 2) + '/' + this.right("00" + (date.getMonth() + 1), 2) + '/' + this.right("0000" + date.getFullYear(), 4);
            }
            catch (ex) {
                // if (this.app.Debug)
                //     console.log("DateToStringParsing", ex);
            }
        }
        return str;
    }

    public DateTimeToString(date: Date, italian: boolean = false, useT: boolean = false, showSeconds: boolean = false, ShowThousandths: boolean = false): string {
        try {

            if (date == null)
                return "";
            let str: string = this.DateToString(date, italian);
            if (useT)
                str += 'T';
            else
                str += ' ';

            if (!showSeconds)
                str += this.right("00" + date.getHours(), 2) + ':' + this.right("00" + date.getMinutes(), 2) + ':00';
            else
                str += this.right("00" + date.getHours(), 2) + ':' + this.right("00" + date.getMinutes(), 2) + ':' + this.right("00" + date.getSeconds(), 2);

            if (ShowThousandths)
                str += '.000';

            return str;
        } catch (ex) {
            // if (this.app.Debug)
            //     console.log("DateTimeToString", ex);
        }

        return date + "";
    }

    public SetEndDate(date: any): Date {
        let dateEnd = new Date(date);
        dateEnd.setHours(23);
        dateEnd.setMinutes(59);
        dateEnd.setSeconds(59);
        dateEnd.setMilliseconds(999);
        return dateEnd
    }

    public SetStartDate(date: any): Date {
        let dateStart = new Date(date);
        dateStart.setHours(0);
        dateStart.setMinutes(0);
        dateStart.setSeconds(0);
        dateStart.setMilliseconds(0);
        return dateStart;
    }

    public TimeToString(date: Date): string {
        if (date == null)
            return "";
        let str: string = "";
        try {
            str = this.right("00" + date.getHours(), 2) + ':' + this.right("00" + date.getMinutes(), 2) + ':00';
        } catch (ex) {
            // if (this.app.Debug)
            //     console.log("DateTimeToString", ex);
        }
        return str;
    }

    public TimeToString_HHmmss(date: Date): string {
        if (date == null)
            return "";

        let str: string = "";
        try {
            if (typeof date == 'string') {
                date = this.StringToDate(date, true);
            }
            str = this.right("00" + date.getHours(), 2) + ':' + this.right("00" + date.getMinutes(), 2) + ':' + this.right("00" + date.getSeconds(), 2);
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("TimeToString_HHmmss", ex);
        }
        return str;
    }

    public StringToNumber(value: string): number {
        let num: number = 0;
        try {
            num = Number.parseFloat(value);
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("StringToNumber", ex);
        }
        return num;
    }


    public GetLocaleNumber(value: number) {
        let ret = 0;
        try {
            if (value)
                ret = value;
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("DateObjToString", ex);
        }
        return ret.toLocaleString();
    }

    public BooleanToInt(value: boolean) {
        if (value)
            return 1;
        return 0;
    }

    public truncateText(testo: string, lunghezza: number): string {
        if (testo) {
            testo = testo.replace(/[\n;]/g, ' ');

            if (testo.length > lunghezza) {
                let temp = testo.substring(0, lunghezza);
                let ultimoSpazio = temp.lastIndexOf(' ');

                if (ultimoSpazio == -1) {
                    ultimoSpazio = lunghezza;
                }

                return temp.substring(0, ultimoSpazio) + ' ...';
            }
        }
        return testo;
    }

    public combineTableValue(codice100: string, description500: string): any {
        let combinedValue: string = "";
        try {
            if ((codice100) && (codice100.toUpperCase() != "NULL")) {
                if (combinedValue != "")
                    combinedValue += " - ";
                combinedValue += codice100;
            }
            if ((description500) && (description500.toUpperCase() != "NULL")) {
                if (combinedValue != "")
                    combinedValue += " - ";
                combinedValue += description500;
            }
            /*                
            if ((id.toUpperCase() == "NULL") && (description.toUpperCase() == "NULL"))
                return "";
            if ((!codice) || (codice == null) || (codice == "") || (codice.toUpperCase() == "NULL")){
                combinedValue = id + "  -  " + description;
                return combinedValue;
            }
            combinedValue = codice + "  -  " + id + "  -  " + description;

            */
        }
        catch {

        }
        return combinedValue;
    }

    public checkRecord(objectClass: any) {
        let array = Object.getOwnPropertyNames(objectClass);
        array.forEach(element => {
            try {
                let copy = objectClass[element] + "";
                copy = copy.replace(new RegExp("T", 'g'), "-");
                copy = copy.replace(new RegExp("/", 'g'), "-");
                copy = copy.replace(new RegExp(" ", 'g'), "-");
                copy = copy.replace(new RegExp(":", 'g'), "-");
                let dt: string[] = copy.split("-");
                if ((dt.length == 3) || (dt.length == 6)) {
                    let date = this.StringToDate(objectClass[element]);
                    if (date) {
                        let value = this.DateToString(date);
                        if (value) {
                            objectClass[element] = value;
                        }
                    }

                }
            }
            catch (ex) {
                // if (this.app.Debug)
                //     console.log("checkRecord", ex);

            }
        });
    }

    public checkRecordNullNumber(objectClass: any) {
        if (objectClass) {
            let array = Object.getOwnPropertyNames(objectClass);
            array.forEach(element => {
                try {
                    let copy = objectClass[element] + "";
                    if (copy == "-1")
                        objectClass[element] = null;
                }
                catch (ex) {
                    // if (this.app.Debug)
                    //     console.log("checkRecordNullNumber", ex);
                }
            });
        }
    }

    public setRecordNullNumber(objectClass: any) {
        let array = Object.getOwnPropertyNames(objectClass);
        array.forEach(element => {
            try {
                let copy = objectClass[element];
                if (copy == null)
                    objectClass[element] = -1;
            }
            catch (ex) {
                // if (this.app.Debug)
                //     console.log("setRecordNullNumber", ex);
            }
        });
    }

    public getRecordFields(objectClass: any): string[] {
        let array: any[] = [];
        try {
            array = Object.getOwnPropertyNames(objectClass);
        }
        catch (ex) {
            // if (this.app.Debug)
            //     console.log("checkRecord", ex);

        }
        return array;
    }

    public fieldExists(objectClass: any, field: string): Boolean {
        let fields = this.getRecordFields(objectClass) || [];
        let check = fields.find(x => x == field);
        if ((check) && (check != null))
            return true;
        return false;
    }

    public sleep(milliseconds: number) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    canModify(): boolean {
        let modify: boolean = true;
        //TODO da gestire in base ai permessi dell'user
        return modify;
    }

    /************************** Descriptions ***************************************/
    //public getDescription(list: any[], code: string, fieldSearch: string, fieldPrint: string): string {  
    public getDescription(list: any[], valueToSearch: any, fieldSearch: string, fieldPrint: string): string {
        let description = "";
        if (list) {
            let item = list.find(x => x[fieldSearch] == valueToSearch);
            if (item) {
                description = item[fieldPrint];
            }
        }
        return description;
    }

    public getCustomDescription(customArea: string, list: any[], valueToSearch: string, fieldSearch: string, fieldPrint: string): string {
        let description = valueToSearch;
        try {
            if (customArea.toUpperCase() == "PRODUZIONE") {
                description = this.getDescription(list,
                    valueToSearch, fieldSearch, fieldPrint);
            }
        } catch (error) {

        }
        return description;
    }

    /************************** Local Storage Resources ****************************/

    public localStorage: any = {
        Token: "token",
        ChangePassword: "changePassword"
    }

    getLocal(key: string): any {
        let value: any = "";
        try {
            if (localStorage)
                value = localStorage.getItem(key);
        } catch {
            value = "";
        }
        return value;
    }

    getLocalJson(key: string): any {
        let value: any = null;
        let localValue = this.getLocal(key);
        if ((localValue) && (localValue != "null")) {
            value = JSON.parse(localValue);
        }
        return value;
    }

    getLocalString(key: string): any {
        let value: any = "";
        let localValue: string = this.getLocal(key);
        if ((localValue) && (localValue != "null")) {
            if (this.left(localValue, 1) == "\"")
                localValue = this.right(localValue, localValue.length - 1);
            if (this.right(localValue, 1) == "\"")
                localValue = this.left(localValue, localValue.length - 1);
            value = localValue;
        }
        return value;
    }

    setLocal(key: string, value: any) {
        if (localStorage) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }


    /************************** Http Request ****************************/
    handleError(error: any): Promise<any> {
        console.error('Error', error);
        let response: HttpResponseJM = new HttpResponseJM(error.status, error.message || error, '');
        //    return Promise.resolve(response);
        //    if (error.status==401)
        //      this.setLocal(this.localToken, "");
        return Promise.resolve(response);
    }

    // goToVesselFinder(idShip: any) {
    //     let ship = this.list.Ship.find(x => x.Id == idShip);
    //     if (ship && ship.ImoNo && ship.ImoNo !== "") {
    //         const url = `https://www.vesselfinder.com/it/vessels/details/${ship.ImoNo}`;
    //         window.open(url, '_blank');
    //     } else {
    //         // this.toastersService.addToast('Warning', 'Imo number has not been populated', Colors.warning, ToasterPlacement.TopCenter);
    //     }
    // }

    getErrorMessage(responseData: any): string {
        let message: string = "";
        if (responseData) {
            if (responseData.message) {
                message = responseData.error + ' - ' + responseData.message;
                // let message = JSON.parse(responseData.message);
                // if (body.Message) {
                //     message = body.Message;
                // }
                // else {
                //     message = responseData.message;
                // }
            }
            else {
                message = responseData;
            }
        }
        return message;
    }

    handleSuccess(data: any): Observable<any> {
        let result = ''
        try {
            result = data.json()
        }
        catch (exception) {
            try {
                result = data.text()
            }
            catch (exception) {
                result = data;
            }
        }

        let headers: string = '';
        try {
            headers = data.Headers;
        } catch (exception) {

        }

        let response: HttpResponseJM = new HttpResponseJM(200, result, headers);
        return new Observable(observable => {
            if (response) {
                if (response.Code == 200) {
                    observable.next(response.Data);
                    observable.complete();
                } else {
                    //observable.error(JSON.parse(response.Data._body) || response);
                    observable.error(response.Data || response);
                }
            } else {
                //observable.error(JSON.parse(response.Data._body) || response);
                observable.error(response);
            }
        });
        //return Promise.resolve(response);
    }

    handleUrl(controller: string, parameters: any = null): string {
        let httpUrl: string =
            //SERVER_URL
            this.getBaseUrl()
            + environment.urlFolder
            + environment.serverUrlApi
            + controller;

        //Requested Method
        if (parameters) {
            httpUrl = httpUrl + '?';
            if (typeof parameters != 'string') {
                parameters = JSON.stringify(parameters);
            }
            httpUrl = httpUrl + encodeURIComponent(parameters);
        }
        return httpUrl;

        // let httpUrl: string = "";

        // if (this.isSoapWS) {

        //     // ✅ SOAP URL – senza parametri
        //     httpUrl =
        //         this.getBaseUrl() +
        //         environment.serverPortSoap +
        //         environment.urlFolder +
        //         environment.serverUrlApiSoap +
        //         controller;

        //     return httpUrl;
        // } else {

        //     // ✅ ODATA URL
        //     httpUrl =
        //         this.getBaseUrl() +
        //         environment.serverPortOData +
        //         environment.urlFolder +
        //         environment.serverUrlApiOData +
        //         controller;

        //     // ✅ Parametri SOLO per OData
        //     if (parameters) {

        //         const queryParams = [];

        //         for (const key of Object.keys(parameters)) {
        //             queryParams.push(`${key}=${parameters[key]}`);
        //         }

        //         httpUrl += "?" + queryParams.join("&");
        //     }
        // }

        // return httpUrl;
    }

    buildSoapBody(params: any): string {
        let paramTags = '';

        for (const key of Object.keys(params)) {
            paramTags += `<${key}>${params[key]}</${key}>`;
        }

        return `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <${this.soapFunction} xmlns="urn:microsoft-dynamics-schemas/codeunit/${this.soapCodeunit}">
          ${paramTags}
        </${this.soapFunction}>
      </soap:Body>
    </soap:Envelope>
  `;
    }


    handleClientUrl(controller: string, parameters: any = null): string {
        let httpUrl: string =
            this.getBaseUrl()
        // + this.handleUrlVersion()
        // + BASE_APP_URL

        //Requested Method
        if (parameters) {
            httpUrl = httpUrl + '?';
            if (typeof parameters != 'string') {
                parameters = JSON.stringify(parameters);
            }
            httpUrl = httpUrl + encodeURIComponent(parameters);
        }
        return httpUrl;
    }

    getBaseUrl(): string {
        let baseUrl: string = window.location.origin;
        // if (CLIENT_PORT != "") {
        //     baseUrl = baseUrl.replace(CLIENT_PORT.toLowerCase(), SERVER_PORT.toLowerCase());
        // }
        // baseUrl += FOLDER_URL;
        baseUrl = environment.redirecTo;
        return baseUrl;
    }

    // handleUrlVersion(): string {
    //     let url = "";
    //     if (this.app.VersionCurrentWS) {
    //         url = this.app.VersionCurrentWS + "/"
    //     }
    //     return url;
    // }

    buildHeaders(contentType: string = ''): HttpHeaders {
        // const headers: HttpHeaders = this.headers
        // if (contentType != '') {
        //     headers.set('Content-Type', contentType);
        // }

        // let token: string = this.getLocalString(this.localToken);
        // if ((token) && (token.length > 0)) {
        //     // headers.set('token', token);
        //     headers.set('Authorization', token);
        // }

        let token: string = this.getLocalString(this.localStorage.Token);
        const headers: HttpHeaders = new HttpHeaders({ "Authorization": token, "Content-Type": contentType });
        return headers;

        // const username = environment.navUser;
        // const password = environment.navPassword;

//         const basicAuth = 'Basic ' + environment.navAutorization;

//         if (this.isSoapWS) {

//             const soapXml = `
// <?xml version="1.0" encoding="utf-8"?>
// <soap:Envelope
//   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
//   xmlns="urn:microsoft-dynamics-schemas/codeunit/JM_Utility">
//   <soap:Body>
//     <CheckTotemResource>
//       <_ResourceNo>RES001</_ResourceNo>
//       <_Result>0</_Result>
//       <_ResultTxt></_ResultTxt>
//     </CheckTotemResource>
//   </soap:Body>
// </soap:Envelope>`;

//             this.callNavSoap(this.soapFunction, soapXml)
//                 .then(responseXml => {
//                     console.log(responseXml);
//                 })
//                 .catch(err => {
//                     console.error(err);
//                 });

//             // let headers = new HttpHeaders({
//             //     "Authorization": basicAuth,
//             //     "Content-Type": 'text/xml; charset="utf-8"',
//             //     "Accept": "text/xml"
//             // });

//             // if (this.soapFunction) {
//             //     headers = headers.set(
//             //         "SOAPAction",
//             //         `"urn:microsoft-dynamics-schemas/codeunit/${this.soapCodeunit}/${this.soapFunction}"`
//             //     );
//             // }

//             return new HttpHeaders();
//         }
//         else {
//             return new HttpHeaders({
//                 "Authorization": basicAuth,
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             });
//         }
    }

    async callNavSoap(methodName: any, xmlBody:any) {
        const url = "http://tpnav18app.twinpack.local:7067/TWK_PRINT_DEV/WS/TWINPACK/Codeunit/JM_Utility";
const basicAuth = 'Basic ' + environment.navAutorization;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": basicAuth,
                "Content-Type": "text/xml; charset=utf-8",
                "SOAPAction": `urn:microsoft-dynamics-schemas/codeunit/JM_Utility:${methodName}`
            },
            body: xmlBody
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}\n${text}`);
        }

        return response.text();
    }

    public httpGet(controller: string, urlParameters: any = null): any {
        let httpUrl: string = this.handleUrl(controller, urlParameters);

        console.log("get.url", httpUrl);
        console.log("get.parameter", urlParameters);

        return this.http.get(httpUrl, { headers: this.buildHeaders('application/json') });
        //UPGRADEANGULAR15:             .subscribe();
        //UPGRADEANGULAR15:             .toPromise()
        //UPGRADEANGULAR15:             .then(this.handleSuccess)
        //UPGRADEANGULAR15:             .catch(this.handleError);
    }

    public httpPost(controller: string, postParameters: any = null, urlParameters: any = null): any {
        let httpUrl: string = this.handleUrl(controller, urlParameters);
        // if (this.app.Debug) {
        console.log("post.url", httpUrl);
        console.log("post.postParameters", postParameters);
        console.log("post.urlParameters", urlParameters);
        // }

        try {
            return this.http
                .post(httpUrl, JSON.stringify(postParameters), { headers: this.buildHeaders('application/json') });
        } catch (error) {
            return error;
        }
        //UPGRADEANGULAR15:             .toPromise()
        //UPGRADEANGULAR15:             .then(this.handleSuccess)
        //UPGRADEANGULAR15:             .catch(this.handleError);
    }

    public httpPostSoap(functionName: string, parameters: any): any {

        const url = this.handleUrl(this.soapCodeunit, null);

        const xmlBody = this.buildSoapBody(parameters);

        const headers = this.buildHeaders('application/json');

        console.log("soap.url", url);
        console.log("soap.function", functionName);
        console.log("soap.params", parameters);
        console.log("soap.body", xmlBody);

        return this.http.post(url, xmlBody, {
            headers: headers,
            responseType: 'text'
        });
    }

    public httpPostWithToken(token: any, controller: string, postParameters: any = null, urlParameters: any = null): any {
        let httpUrl: string = this.handleUrl(controller, urlParameters);
        // if (this.app.Debug) {
        console.log("post.url", httpUrl);
        console.log("post.postParameters", postParameters);
        console.log("post.urlParameters", urlParameters);
        // }
        const postHeaders: HttpHeaders = new HttpHeaders({ "Authorization": token, "Content-Type": 'application/json' });
        try {
            return this.http
                .post(httpUrl, JSON.stringify(postParameters), { headers: postHeaders });
        } catch (error) {
            return error;
        }
        //UPGRADEANGULAR15:             .toPromise()
        //UPGRADEANGULAR15:             .then(this.handleSuccess)
        //UPGRADEANGULAR15:             .catch(this.handleError);
    }


    public httpPostWithCharset(controller: string, postParameters: any = null, urlParameters: any = null, contentType: string = ''): Observable<any> {
        let httpUrl: string = this.handleUrl(controller, urlParameters);
        // if (this.app.Debug) {
        console.log("post.url", httpUrl);
        console.log("post.postParameters", postParameters);
        console.log("post.urlParameters", urlParameters);
        //}
        return this.http
            .post(httpUrl, JSON.stringify(postParameters), { headers: this.buildHeaders('application/json') });
        //UPGRADEANGULAR15:            .toPromise()
        //UPGRADEANGULAR15:            .then(this.handleSuccess)
        //UPGRADEANGULAR15:            .catch(this.handleError);
    }

    public httpDelete(controller: string, urlParameters: any = null): Observable<any> {
        let httpUrl: string = this.handleUrl(controller, urlParameters);
        // if (this.app.Debug) {
        console.log("delete.url", httpUrl);
        console.log("delete.urlParameters", urlParameters);
        // }
        return this.http
            .delete(httpUrl, { headers: this.buildHeaders('application/json') })
        //UPGRADEANGULAR15:            .toPromise()
        //UPGRADEANGULAR15:            .then(this.handleSuccess)
        //UPGRADEANGULAR15:            .catch(this.handleError);
    }

    /*** ROUTING ********************************************************************************/
    getCurrentRoute() {
        let completeUrl = window.location.href;
        let baseUrl = this.getBaseUrl();

        let currentRoute: string = "";
        try {
            let url = completeUrl.toLowerCase();
            //url = url.replace(BASE_URL.toLowerCase(), "");
            url = url.replace(baseUrl.toLowerCase(), "");
            let urlParts = url.split("/");
            let save: boolean = false;
            urlParts.forEach(element => {
                // let app = BASE_APP_URL.replace("/", "");
                let appDebug = "#";
                // if ((element == app) || (save)) {
                //     save = true;
                //     if (currentRoute != "") {
                //         currentRoute += "/";
                //     }
                //     currentRoute += element;
                // }
                // if (element == appDebug) {
                //     save = true;
                //     currentRoute = "";
                // }
            });
        }
        catch (exception) {
        }
        return currentRoute;
    }


    getCurrentVersion(completeUrl: string): string {
        let version = "";
        try {
            let url = completeUrl.toLowerCase();
            let baseUrl = this.getBaseUrl();
            url = url.replace(baseUrl.toLowerCase(), "");
            let urlParts = url.split("/");
            if (parseInt(urlParts[0]))
                version = urlParts[0];
        }
        catch (exception) {
        }
        return version;
    }

    goToLastVersion() {
        let baseUrl = this.getBaseUrl();
        //let url = BASE_URL.toLowerCase();
        let url = baseUrl.toLowerCase();
        try {
            url += this.app.VersionLastWS + "/";
            // url += BASE_APP_URL;
            window.location.href = url;
        }
        catch (exception) {

        }
    }

    // canActivate(): boolean {
    //     if (this.getLocal(this.localToken)) {
    //         if (this.user.Id <= 0) {
    //             this.setLoading(true);
    //             this.authService.getUser().subscribe({
    //                 next: (response: any) => {
    //                     this.init();
    //                     this.setLoading(false);
    //                     let data: User = response;
    //                     this.user = data;
    //                     this.authService.loadAllItems();
    //                     this.setUsernamePassword("", "");
    //                     this.router.navigate(['/dashboard']);
    //                 },
    //                 error: (err: any) => {
    //                     this.setLoading(false);
    //                     let message = this.getErrorMessage(err);
    //                     this.router.navigate(['/login']);
    //                 }
    //             })
    //         }
    //         return true;
    //     }
    //     else if (this.doLogin) {
    //         return true;
    //     }
    //     else {
    //         this.router.navigate(['/login']);
    //         return false;
    //     }
    // }

    navigateArray(link: string, params: string[] = []) {
        let navParams = [];
        navParams.push('/' + link);
        params.forEach(element => {
            navParams.push(element);
        });
        this.router.navigate(navParams);
    }

    navigate(link: string, param1: string = '', param2: string = '', param3: string = '', param4: string = '') {
        if (param4 != '')
            this.router.navigate(['/' + link, param1, param2, param3, param4]);
        else if (param3 != '')
            this.router.navigate(['/' + link, param1, param2, param3]);
        else if (param2 != '')
            this.router.navigate(['/' + link, param1, param2]);
        else if (param1 != '')
            this.router.navigate(['/' + link, param1]);
        else
            this.router.navigate(['/' + link]);
    }

    createUrlTree(base: string, link: string, param: any = null): string {
        let url: string = base + "/" + link + "/";

        if (Array.isArray(param)) {
            param.forEach((element: any) => {
                url += element + "/";
            });
        }

        return decodeURIComponent(url); // Decodifica l'URL
    }


    goBackDocEditRoute(goBackRoute: string) {
        if (goBackRoute != "")
            this.router.navigate([goBackRoute]);
        else
            this.router.navigate(['DOC_LIST_DOCUMENTO']);
    }


    openNewTabFile(data: any) {
        var binaryString = window.atob(data);
        var binaryLen = binaryString.length;
        var sampleArr = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            sampleArr[i] = ascii;
        }
        var file = new Blob([sampleArr], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        window.open(fileURL);
    }

    openNewTabUrl(url: string) {
        if (url) {
            window.open(url, '_blank');
        }
    }


    // downloadExcel(data: any, filename: string = "Data.xlsx") {

    //     var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    //     var sliceSize = 512;
    //     var byteCharacters = atob(data);
    //     var byteArrays = [];

    //     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {

    //         var slice = byteCharacters.slice(offset, offset + sliceSize);
    //         var byteNumbers = new Array(slice.length);

    //         for (let i = 0; i < slice.length; i++) {
    //             byteNumbers[i] = slice.charCodeAt(i);
    //         }

    //         var byteArray = new Uint8Array(byteNumbers);
    //         byteArrays.push(byteArray);
    //     }

    //     var blob = new Blob(byteArrays, { type: contentType });
    //     var blobUrl = URL.createObjectURL(blob);
    //     saveAs(blob, filename);
    //     //window.location.href = blobUrl;
    // }

    navigateToViaggio(id: string, date: string) {
        const paramId = id || '00000000-0000-0000-0000-000000000000';
        const paramDate = date;
        this.router.navigate(['elementcardviaggi'], { queryParams: { id: paramId, data: paramDate } });
    }

    navigateToPrenotazioni(id: string, date: string) {
        const paramId = id || '00000000-0000-0000-0000-000000000000';
        const paramDate = date;
        this.router.navigate(['elementcardprenotazioni'], { queryParams: { id: paramId, data: paramDate } });
    }

    //---------------------------------------------------------------------------
    // Columns Customization

    advancedColums(fields: any[], hideColumns: boolean) {
        if (!fields)
            fields = [];
        if (hideColumns)
            // fields = fields.filter(x => x.fieldWidth != HIDE_COLUMN) || [];
            fields.sort((a, b) => ((a != null) && (b != null)) ? b.order > a.order ? -1 : 1 : -1);
        return fields;
    }

    // public INavData: INavData[] = [];

    // getView(JObj: any) {
    //     this.INavData = [];
    //     let viewList = JObj.ViewList;

    //     // Ordina gli elementi in viewList in base al campo Order
    //     viewList.sort((a: any, b: any) => a.Order - b.Order);

    //     viewList.forEach((item: View) => {
    //         if (item.Title === true) {
    //             let id = item.Id;
    //             let newJsonObject: { [key: string]: any } = {
    //                 title: true,
    //                 name: item.Name
    //             };
    //             this.INavData.push(newJsonObject);

    //             viewList.forEach((item2: View) => {
    //                 if (item2.Id_ViewParent === id && item2.Child === false) {
    //                     let id2 = item2.Id;
    //                     let newJsonObject: { [key: string]: any } = {
    //                         name: item2.Name,
    //                         url: item2.Url,
    //                         iconComponent: { name: item2.Icon },
    //                         children: []
    //                     };

    //                     viewList.forEach((item3: any) => {
    //                         if (item3.Id_ViewParent === id2 && item3.Child === true) {
    //                             //console.log(item3);
    //                             let childObject: { [key: string]: any } = {
    //                                 name: item3.Name,
    //                                 url: item3.Url,
    //                                 icon: item3.Icon
    //                             };
    //                             newJsonObject['children'].push(childObject);
    //                         }
    //                     });
    //                     this.INavData.push(newJsonObject);
    //                 }
    //             });
    //         }
    //     });
    // }





    //---------------------------------------------------------------------------
    // Print


    //---------------------------------------------------------------------------
    // Filters

    filterList(list: any[], field: string, value: any) {
        let items: any = [];
        try {
            items = list.filter(x => x[field] == value) || [];
        }
        catch (ex) {

        }
        return items;
    }

    // filtroConfigurazionidtolist(docconfigurazionedocumenti: any[], permessi: any[]) : any[]
    // {
    //     if (!docconfigurazionedocumenti) return [];

    //     var perm:PERMESSO[] = permessi
    //         .filter(permesso => permesso.Nome_Form.toUpperCase() === "Documenti".toUpperCase());

    //     let all:boolean = false;
    //     if (perm.length > 0)
    //     {
    //         perm.forEach(element => {
    //             if (!element.Funzione)
    //                 all = true;              
    //         });
    //     }

    //     let returnArray:any[] = docconfigurazionedocumenti;
    //     if (!all)
    //         returnArray = docconfigurazionedocumenti
    //             .filter(it => perm.some(permesso => permesso.Funzione === it.Nome_Documento))
    //     return returnArray;
    // }


    // filtroConfigurazioni(docconfigurazionedocumenti: any[], pagina: string, permessi: any[]) : any[]
    // {
    //     if (!docconfigurazionedocumenti) return [];

    //     const perm:any[] = this.filtroConfigurazionidtolist(docconfigurazionedocumenti, permessi);

    //     return perm.filter(it => it.Gestione_Lancio === pagina);
    // }



    //---------------------------------------------------------------------------
    // Dropdown Button

    public dropdownFunctions: string = "none";
    setDropDownDisplay(dropdown: string) {
        this.closeDropDownDisplayAnalisys();

        if (dropdown == "none") {
            this.dropdownFunctions = "block";
        } else {
            this.dropdownFunctions = "none";
        }
    }
    closeDropDownDisplay() {
        this.dropdownFunctions = "none";
    }

    public dropdownAnalisys: string = "none";
    setDropDownDisplayAnalisys(dropdown: string) {
        this.closeDropDownDisplay();

        if (dropdown == "none") {
            this.dropdownAnalisys = "block";
        } else {
            this.dropdownAnalisys = "none";
        }
    }
    closeDropDownDisplayAnalisys() {
        this.dropdownAnalisys = "none";
    }

    public dropdownPrints: string = "none";
    setDropDownDisplayPrints(dropdown: string) {
        if (dropdown == "none") {
            this.dropdownPrints = "block";
        } else {
            this.dropdownPrints = "none";
        }
    }
    closeDropDownDisplayPrints() {
        this.dropdownPrints = "none";
    }

    // setCurrentOperatore(codOpeatore: string) {
    //     this.currentOpeartore = codOpeatore;
    // }



}

export class EnumListItem {
    Id: number;
    Description: string;

    constructor(id: number, description: string) {
        this.Id = id;
        this.Description = description;
    }
}

export class Tipo_Campi {
    Id: number;
    Description: string;

    constructor(id: number, description: string) {
        this.Id = id;
        this.Description = description;
    }
}
export class HttpResponseJM {
    Code: number;
    Data: any;
    Headers: any;

    constructor(code: number, data: any, headers: any = null) {
        this.Code = code;
        this.Data = data;
        this.Headers = headers;
    }
}

export class App {
    Name: string;
    Version: string;
    TablePrefix: string;
    Icon: string;
    IconMin: string;
    VersionLastWS: string;
    VersionCurrentWS: string;
    Production: boolean;
    Debug: boolean;

    constructor(name: string, version: string, prefix: string, icon: string, iconMin: string, debug: boolean) {
        this.Name = name;
        this.Version = version;
        this.TablePrefix = prefix;
        this.Icon = icon;
        this.IconMin = iconMin;
        this.VersionLastWS = "";
        this.VersionCurrentWS = "";
        this.Production = !debug;
        this.Debug = debug;
    }
}

export class AppParameters {
    DoLogin: boolean;
    ChangePassword: boolean;
    PageTitle: string;
    ShowSearch: boolean;
    SearchText: string;
    ShowAdvancedFilter: boolean;
    PageElement: string;

    constructor(doLogin: boolean = true, changePassword: boolean = false, pageTitle: string = "", showSearch: boolean = false, searchText: string = "", showAdvancedFilter: boolean = false, pageElement: string = "") {
        this.DoLogin = doLogin;
        this.ChangePassword = changePassword;
        this.PageTitle = pageTitle;
        this.ShowSearch = showSearch;
        this.SearchText = searchText;
        this.ShowAdvancedFilter = showAdvancedFilter;
        this.PageElement = pageElement;
    }
}


export class AppServiceList {

    public Commesse: Job[];





    public PageName: any[] = [

        { Name: "Commesse" }
    ];

    constructor() {

        this.Commesse = [];


    }
}
