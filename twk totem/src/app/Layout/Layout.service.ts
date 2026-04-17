import { AppService } from "../app.service";
import { Injectable, resource } from '@angular/core';
import { environment } from "src/environments/environment.prod";

@Injectable()


export class LayoutService {
    constructor(private appService: AppService) { }

    GetList() {
        return this.appService.httpGet('nav/totemjobs/' + environment.key + "/" + environment.company);
    }

    Auth(WebService: string, id: string, result: number, resultTxt: string, hourWorked: number, resourceName: string): any {
        let parameter: ParameterAuthResource = new ParameterAuthResource(
            id,
            result,
            resultTxt,
            hourWorked,
            resourceName
        );
        return this.appService.httpPost(WebService + "/" + environment.key + "/" + environment.company, parameter);
    }

    Update(WebService: string, jobNo: string, ResourceNo: string, oreLavorate: number, date: any, result: number, resultTxt: string) {
        let parameter: ParameterUpdate = new ParameterUpdate(
            ResourceNo,
            jobNo,
            oreLavorate,
            date,
            result,
            resultTxt
        );
        return this.appService.httpPost(WebService + "/" + environment.key + "/" + environment.company, parameter);
    }


    Init(element: string, pagetype: number): ElementPage {
        let elementPage: ElementPage = new ElementPage();
        switch (element.toLowerCase()) {
            case "commesse":
                elementPage = this.elementpage_commesse(pagetype)
                break;
            default:
                break;

        }
        return elementPage
    }

    elementpage_commesse(pagetype: number): ElementPage {
        let column: List[] = [];
        let field: Card[] = [];
        let elementpage: ElementPage = null;

        column.push(new List(10, "No", "Nr."));
        column.push(new List(20, "Description", "Descrizione"));

        field.push(new Card(0, "No", "Nr."));
        field.push(new Card(0, "Description", "Descrizione"));
        return elementpage = new ElementPage(pagetype, "commesse", "Commessa", "TotemJobs", column, field)

    }

}






export class List {
    Order: number;
    Fieldname: string;
    Caption: string;
    fieldtype: number;
    list: string;
    fieldtosearch: string;
    fieldtoprint: string;
    constructor(order: number, fieldname: string, caption: string, fieldtype: number = 0, list: string = "", fieldtosearch: string = "", fieldtoprint: string = "") {
        this.Order = order;
        this.Fieldname = fieldname;
        this.Caption = caption;
        this.fieldtype = fieldtype;
        this.list = list;
        this.fieldtosearch = fieldtosearch;
        this.fieldtoprint = fieldtoprint;


    }
}

export class Card {
    Order: number;
    Fieldname: string;
    Caption: string;
    constructor(order: number, fieldname: string, caption: string) {
        this.Order = order;
        this.Fieldname = fieldname;
        this.Caption = caption;

    }
}

export class ElementPage {
    PageType: number;
    Element: string;
    Title: string;
    WebService: string
    List: List[]
    Card: Card[]

    constructor(pagetype: number = 0, element: string = "", title: string = "", webService: string = "", elementtable: List[] = [], elementcard: Card[] = []) {
        this.PageType = pagetype;
        this.Element = element;
        this.Title = title;
        this.WebService = webService;
        this.List = elementtable;
        this.Card = elementcard;
    }

}

export let fieldtype = {
    text: 0,
    number: 1,
    Date: 2,
    datetime: 3,
    time: 4,
    list: 5,
    other: 6,
    checkbox: 7

}


export class ParameterAuthResource {
    _ResourceNo: string;
    _Result: number;
    _ResultTxt: string;
    _HourWorked: number;
    _ResourceName: string;

    constructor(ResourceNo: string, Result: number, ResultTxt: string, HourWorked: number, ResourceName: string) {
        this._ResourceNo = ResourceNo;
        this._Result = Result;
        this._ResultTxt = ResultTxt;
        this._HourWorked = HourWorked;
        this._ResourceName = ResourceName
    }
}

export class ParameterUpdate {
    _ResourceNo: string;
    _JobNo: string;
    _HourWorked: number;
    _Date: Date;
    _Result: number;
    _ResultTxt: string;

    constructor(ResourceNo: string, JobNo: string, HourWorked: number, Date: Date, Result: number, ResultTxt: string) {
        this._ResourceNo = ResourceNo;
        this._JobNo = JobNo;
        this._HourWorked = HourWorked;
        this._Date = Date;
        this._Result = Result;
        this._ResultTxt = ResultTxt;
    }
}