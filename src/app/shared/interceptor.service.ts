import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
 
@Injectable({providedIn:'root'})
export class InterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        let token = JSON.parse(localStorage.getItem("token"));
        req = req.clone({
            setHeaders:{
                Authorization:`Bearer ${token}`
            }
        });
        return next.handle(req);
    }
}