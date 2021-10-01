import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { url } from "../../globals";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Client } from "../shared/models";

@Injectable({providedIn:'root'})
export class ClientsService{
    clients: Client[] = [];
    notUniqueId: Subject<boolean> = new Subject();
    clientsChanged: Subject<boolean> = new Subject();

    constructor(private http: HttpClient,
        private router: Router) {}

    getClients() {
        return this.http.get<Client[]>(url + "clients").pipe(
            map(clients => {
                console.log(this.clients)
                return clients;
            })
        )
    }

    deleteClient(id: number) {
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


    sortClients(currentSort, clients) {
        return clients.sort((a, b) => {
            if (a[currentSort] < b[currentSort]) {
                return -1;
            }
            if (a[currentSort] > b[currentSort]) {
                return 1;
            }
            return 0;
        })
    }

    paging(elements: any[]) {
        let pages = [];
        let elPerPAge = 10;
        let pagesNumber = elements.length % elPerPAge === 0 ? elements.length / elPerPAge : Math.floor(elements.length / elPerPAge) + 1;
        for (let i = 1; i <= pagesNumber; i++) {
            pages.push(i);
        }
        return pages;
    }

    getPagedArray(array,perPage):Client[][] {
        var results:Client[][] = [];
        while (array.length) {
            results.push(array.splice(0, perPage));
        }
        return results;
    }
}