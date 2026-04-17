// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService, Card, ElementPage, fieldtype, List } from 'src/app/Layout/Layout.service';
import { ActivatedRoute } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BajajChartComponent } from 'src/app/theme/shared/components/apexchart/bajaj-chart/bajaj-chart.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { ROUTING_ELEMENT } from 'src/app/app-config';
import { AppService } from 'src/app/app.service';
import { auto } from '@popperjs/core';

@Component({
    selector: 'app-default',
    imports: [CommonModule, SharedModule],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']

})
export class ListComponent {
    routeparams: any;
    routingElement: any;
    elementpage: ElementPage;
    items: any;
    fieldtype = fieldtype

    constructor(public layoutservice: LayoutService, public route: ActivatedRoute, public appservice: AppService,
    ) {
        this.items = [];
        // this.items = [
        //     {
        //         No: "C001",
        //         Description: "Installazione impianto elettrico"
        //     },
        //     {
        //         No: "C002",
        //         Description: "Manutenzione linea di produzione"
        //     },
        //     {
        //         No: "C003",
        //         Description: "Supervisione lavori sala server"
        //     },
        //     {
        //         No: "C004",
        //         Description: "Installazione impianto elettrico"
        //     },
        //     {
        //         No: "C005",
        //         Description: "Manutenzione linea di produzione"
        //     },
        //     {
        //         No: "C006",
        //         Description: "Supervisione lavori sala server"
        //     },
        //     {
        //         No: "C007",
        //         Description: "Installazione impianto elettrico"
        //     },
        //     {
        //         No: "C008",
        //         Description: "Manutenzione linea di produzione"
        //     },
        //     {
        //         No: "C009",
        //         Description: "Supervisione lavori sala server"
        //     }
        // ];
    }

    ngOnInit() {
        if(this.appservice.ResourceNo == ""){
            this.appservice.navigate("guest/login");
        }
        this.routeparams = this.route.params.subscribe(parametro => {
            this.routingElement = parametro[ROUTING_ELEMENT]
            this.elementpage = this.layoutservice.Init(this.routingElement, 0);
            this.GetTable(this.elementpage);
        });
    }

    GetTable(elementpage: ElementPage) {
        this.appservice.isSoapWS = false;
        this.layoutservice.GetList().subscribe({
            next: (Response: any) => {
                this.items = Response.value;
            },
            error: (error: any) => { let errore = error }
        })
    }


    // async getTotemJobs() {
    //     const url = "http://tpnav18app.twinpack.local:7068/TWK_PRINT_DEV/OData/Company('TWINPACK')/TotemJobs";

    //     const basicAuth = 'Basic ' + 'VE9URU06T3NpcmlkZTIwMjYh';

    //     const response = await fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": basicAuth,
    //             "Accept": "application/json"
    //         }
    //     });

    //     if (!response.ok) {
    //         throw new Error(`HTTP ${response.status}`);
    //     }

    //     const data = await response.json();
    //     this.items = data.value; // OData restituisce sempre .value
    // }

    // getTotemJobs()
    //     .then(console.log)
    //     .catch(console.error);

    navigate(item: any) {
        this.appservice.JobNo = item.No;
        this.appservice.JobDescription = item.Description;
        this.appservice.navigate("card/" + this.elementpage.Element + "/" + item.No);
    }

    goBack() {
        this.appservice.ResourceNo = "";
        this.appservice.navigate("guest/login");
    }
}

