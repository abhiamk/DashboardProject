import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CommonService } from '../shared/CommonService/common.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard {
    // jwtHelper: JwtHelper = new JwtHelper();
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        var usertoken = this.commonService.getCurrentUserToken();
        let url: string = state.url;
        this.commonService.redirectUrl = '';

        if (usertoken == null) {
            console.log("Not Authenticated!");
            this.router.navigateByUrl('/login');
            return false;
        }
        else {
            console.log("Authenticated!");
            const helper = new JwtHelperService();
            console.log("Expire at-" + helper.getTokenExpirationDate(usertoken.data));
            // var tokenStatus = this.jwtHelper.isTokenExpired(usertoken.data);
            // var tokenStatus = helper.isTokenExpired(usertoken.data);
            // if (tokenStatus) {
            //     localStorage.removeItem("currentUser");
            //     this.router.navigateByUrl('/login');
            //     return false;
            // }
            // else {
            return true;

            // }
        }
    }
    Userdetails: any;
    isValidToken: boolean = false;
    constructor(private router: Router, private commonService: CommonService) {

    }
}