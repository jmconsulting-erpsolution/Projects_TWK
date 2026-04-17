// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppService, AppServiceList } from '../../../../app.service';
import { MsalModule } from '@azure/msal-angular';
import { AuthService } from 'src/app/theme/shared/service/auth.service';
import { LayoutService } from 'src/app/Layout/Layout.service';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, MsalModule, FormsModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private layoutService: LayoutService,
    public appService: AppService
  ) { }

  badge: string = "";
  result: number = 0;
  resultTxt: string = "";



  @HostListener('document:keydown.enter')
  onEnter() {
    this.scanBadge();

    // this.callWS();
  }

  //   callWS() {
  //     const soapXml = `
  // <?xml version="1.0" encoding="utf-8"?>
  // <soap:Envelope
  //   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  //   xmlns="urn:microsoft-dynamics-schemas/codeunit/JM_Utility">
  //   <soap:Body>
  //     <CheckTotemResource>
  //       <_ResourceNo>R0070</_ResourceNo>
  //       <_Result>0</_Result>
  //       <_ResultTxt></_ResultTxt>
  //     </CheckTotemResource>
  //   </soap:Body>
  // </soap:Envelope>`;

  //     this.callNavSoap('CheckTotemResource', soapXml)
  //       .then(responseXml => {
  //         console.log(responseXml);
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   }


  scanBadge() {
    // this.badge = 'R0070';
    // this.appService.ResourceNo = this.badge;
    // this.appService.navigate('list/commesse')
    this.appService.isSoapWS = true;
    this.appService.soapCodeunit = "JM_Utility";
    this.appService.soapFunction = "CheckTotemResource";
    this.layoutService.Auth('nav/checktotemresource', this.badge, this.result, this.resultTxt, 0, "").subscribe({
      next: (response: any) => {
        this.appService.setLoading(false);

        const parser = new DOMParser();
        const xml = parser.parseFromString(response, 'text/xml');

        const resultNode = xml.getElementsByTagName('_Result')[0];
        const resultTxtNode = xml.getElementsByTagName('_ResultTxt')[0];
        const hourWorkedNode = xml.getElementsByTagName('_HourWorked')[0];
        const resourceNameNode = xml.getElementsByTagName('_ResourceName')[0];

        const result = Number(resultNode?.textContent);
        const resultTxt = resultTxtNode?.textContent;
        const hourWorked = Number(hourWorkedNode?.textContent);
        const resourceName = resourceNameNode?.textContent;

        if (result === 0) {
          this.appService.HourWorked = hourWorked;
          this.appService.resourceName = resourceName;
          this.appService.ResourceNo = this.badge;
          this.appService.navigate('list/commesse');
        } else {
          alert(resultTxt);
        }
      },
      error: (err: any) => {
        this.appService.setLoading(false);
        let message = this.appService.getErrorMessage(err)
      }
    })
  }
  // async callNavSoap(methodName: any, xmlBody: any) {
  //   const url = "http://tpnav18app.twinpack.local:7067/TWK_PRINT_DEV/WS/TWINPACK/Codeunit/JM_Utility";
  //   const basicAuth = 'Basic ' + 'VE9URU06T3NpcmlkZTIwMjYh';

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Authorization": basicAuth,
  //       "Content-Type": "text/xml; charset=utf-8",
  //       "SOAPAction": `urn:microsoft-dynamics-schemas/codeunit/JM_Utility:${methodName}`
  //     },
  //     body: xmlBody
  //   });

  //   if (!response.ok) {
  //     const text = await response.text();
  //     throw new Error(`HTTP ${response.status}\n${text}`);
  //   }

  //   return response.text();
  // }
}

