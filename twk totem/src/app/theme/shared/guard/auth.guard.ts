import { inject, Inject, Injectable, Type } from "@angular/core";
import { CanActivateFn, Router, UrlTree, CanActivateChild } from "@angular/router";
import { AppService } from "src/app/app.service";
import { AuthService } from "../service/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authservice = inject(AuthService);
    const router = inject(Router);
    return true;
    // return authservice.isauthenticated()? true : router.parseUrl('guest/login')
}


@Injectable()
export class Authguard  {
    constructor(private router: Router, private appservice: AppService) {

    }

    public MapToActivate(providers: Array<Type<{ canActivate: CanActivateFn }>>): CanActivateFn[] {
        return providers.map(provider => (...params) => inject(provider).canActivate(...params));

    }

    canActivate(): boolean | UrlTree {
        if (!this.isLogged()) {
            return this.router.parseUrl('/guest/login');
        }
        return true;
    }

    isLogged(): boolean {
        if (this.appservice.ResourceNo != null && this.appservice.ResourceNo != undefined && this.appservice.ResourceNo != "") {
            return true;
        }
        else return false;
    }

}