import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { url } from "../../globals";
import { Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Client } from "../shared/models";
import { AppService } from "../app.service";
import { AccountsService } from "../accounts/accounts.service";


@Injectable({ providedIn: 'root' })
export class ClientsService {
    clients: Client[] = [];
    notUniqueId: Subject<boolean> = new Subject();

    constructor(private http: HttpClient,
        private router: Router,
        private appService: AppService,
        private accountsService:AccountsService) { }

    getClients() {
        return this.http.get<Client[]>(url + "clients").pipe(
            map(clients => {
                console.log(this.clients)
                this.clients = clients;
                return clients;
            },
                catchError(error => {
                    if (error.status === 401) {
                        this.router.navigate(['/auth']);
                        this.appService.loggedIn.next(false);
                    }
                    return error;
                }))
        )
    }

    deleteClient(id: number) {
        this.accountsService.postAccounts(id,[]).subscribe(res=>{
            console.log(res);
        });

        this.http.delete(url + "clients/" + id).subscribe(response => {
            console.log(response);
            this.router.navigate(["/clients"]);
        })
    }

    editClient(id: number, client: Client) {
        this.http.put(url + "clients/" + id, client).subscribe(response => {
            console.log(response);
            this.router.navigate(["/clients"]);
        },
            error => {
                if (error.status === 409) {
                    this.notUniqueId.next(true);
                }
            });

    }

    addClient(id: number, client: Client) {
        this.http.post(url + "clients", client).subscribe(
            response => {
                console.log(response);
                this.router.navigate(['/clients']);
            },
            error => {
                if (error.status === 409) {
                    this.notUniqueId.next(true);
                }
            }
        )
    }


}