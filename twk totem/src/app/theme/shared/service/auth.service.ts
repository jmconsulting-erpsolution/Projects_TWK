import { Injectable } from "@angular/core";
// import { MsalService } from "@azure/msal-angular";
import { AppService } from "src/app/app.service";
@Injectable()
export class AuthService{
    constructor(public appservice : AppService){

    }

    // loginMS() {
    // const interactionKey = 'msal.interaction.status';

    // if (sessionStorage.getItem(interactionKey)) {
    //     console.warn('Interazione MSAL bloccata. Forzo il reset.');
    //     sessionStorage.removeItem(interactionKey);
    // }

    // this.msalService.loginPopup().subscribe({
    //     next: (result) => {
    //         this.msalService.instance.setActiveAccount(result.account);
    //         this.loadUserProfile(result.account);
    //         this.appservice.loginDone = true;
    //     },
    //     error: (error) => {
    //         console.error("Errore login:", error);
    //         alert("Errore login: " + error);
    //     }
    // });
// }

    // logoutMS() {
    //     this.msalService.logoutRedirect();
    // }

    // loadUserProfile(user: any) {
    //     this.appservice.userProfile.username  = user.username;
    //     this.appservice.userProfile.user = user.name;
    //     this.appservice.userProfile.idToken = user.idToken
    //     this.Auth("Auth" , this.appservice.userProfile).subscribe({
    //         next: (Response: any) => {
    //             this.appservice.tecnico = Response;
    //             this.appservice.setLocal(this.appservice.localStorage.Token, Response.token);
    //             this.appservice.navigate("default");
    //         },
    //         error: (error: any) => { let errore = error }
    //     })
        
    //     //.subscribe(profile => {
    //     //    this.userProfile = profile;
    //     //});
    // }

    isauthenticated() : boolean {
        return !!localStorage.getItem(this.appservice.localStorage.Token)
    }

    // Auth(WebService: string, item: any) {
    //     return this.appservice.httpPost(WebService, item);
    // }
}