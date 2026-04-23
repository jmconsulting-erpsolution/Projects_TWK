// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService, Card, ElementPage, List } from 'src/app/Layout/Layout.service';
import { ActivatedRoute } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ROUTING_ELEMENT, ROUTING_ID } from 'src/app/app-config';
import { AppService } from 'src/app/app.service';


@Component({
    selector: 'app-default',
    imports: [CommonModule, SharedModule],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']

})
export class CardComponent {
    routeparams: any;
    routingElement: any;
    elementpage: ElementPage;
    items: any;
    id: any;
    oreLavorate: string = "";
    result: number = 0;
    resultTxt: string = "";
    messageTxt: string = "";
    BlnMessage: boolean = false;


    constructor(public layoutservice: LayoutService, public route: ActivatedRoute, public appservice: AppService) {
        this.id = this.route.snapshot.paramMap.get(ROUTING_ID);

    }


    ngOnInit() {
        if (this.appservice.ResourceNo == "") {
            this.appservice.navigate("guest/login");
        }
        this.routeparams = this.route.params.subscribe(parametro => {
            this.routingElement = parametro[ROUTING_ELEMENT]
            this.elementpage = this.layoutservice.Init(this.routingElement, 1);
            // this.GetTable(this.elementpage);
        });

    }

    // GetTable(elementpage: ElementPage) {
    //     this.layoutservice.Get(elementpage.WebService, this.id).subscribe({
    //         next: (Response: any) => { this.items = Response },
    //         error: (error: any) => { let errore = error }
    //     })
    // }


    addValue(val: string) {
        this.BlnMessage = false;
        this.messageTxt = "";
        if (val === ',' && this.oreLavorate.includes(',')) return;

        this.oreLavorate += val;
    }

    delete() {
        this.BlnMessage = false;
        this.messageTxt = "";
        this.oreLavorate = this.oreLavorate.slice(0, -1);
    }


    confermaOre() {

        const valore = this.oreLavorate.toString().replace(',', '.');
        this.oreLavorate = "";
        let num = Number(valore);
        if (this.appservice.HourWorked + num > 8) {
            alert("Non si possono inserire più di 8 ore lavorative giornaliere.");
            return;
        }

        if (isNaN(num)) {
            alert("Inserisci un numero valido.");
            return;
        }

        if (num < 0.5 || num > 8) {
            alert("Valore consentito solo da 0.5 a 8 ore.");
            return;
        }

        if ((num * 10) % 5 !== 0) {
            alert("Puoi inserire solo multipli di 0.5 (es: 0.5, 1, 1.5, 2...).");
            return;
        }
        let date = new Date();

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // mesi da 0 a 11
        const dd = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${yyyy}-${mm}-${dd}`;

        this.appservice.isSoapWS = true;
        this.appservice.soapCodeunit = "JM_Utility";
        this.appservice.soapFunction = "InsertTotemActivity";
        this.layoutservice.Update('nav/inserttotemactivity', this.appservice.JobNo, this.appservice.ResourceNo, num, formattedDate, this.result, this.resultTxt).subscribe({
            next: (response: any) => {
                this.items = response;

                const parser = new DOMParser();
                const xml = parser.parseFromString(response, 'text/xml');

                const resultNode = xml.getElementsByTagName('_Result')[0];
                const resultTxtNode = xml.getElementsByTagName('_ResultTxt')[0];

                const result = Number(resultNode?.textContent);
                const resultTxt = resultTxtNode?.textContent;

                if (result === 0) {
                    this.appservice.HourWorked += num;
                    if (this.appservice.HourWorked == 8) {
                        this.appservice.navigate("guest/login");
                    } else {
                        this.appservice.navigate("list/" + this.elementpage.Element);
                    }
                } else {
                    this.BlnMessage = true;
                    this.messageTxt = resultTxt;
                }
            },
            error: (error: any) => {
                let errore = error;
                console.error(errore);
            }
        });

    }

    goBack() {
        this.appservice.JobNo = "";
        this.appservice.JobDescription = "";
        this.appservice.navigate("list/" + this.elementpage.Element);
    }


}

