import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "src/globals";
import { Account } from "../shared/models";

@Injectable({providedIn:'root'})
export class AccountsService {
    constructor(private http:HttpClient){}

    getClientAccounts(id: number) {
        return this.http.get<Account[]>(url + "accounts/" + id);
    }

    postAccounts(id: number, accounts:Account[]){
       return  this.http.post<Account[]>(url + "accounts/" + id,accounts);
    }

}
