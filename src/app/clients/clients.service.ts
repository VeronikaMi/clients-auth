import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { url } from "../../globals";
import { Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Client } from "../shared/models";
import { AppService } from "../app.service";

@Injectable({ providedIn: 'root' })
export class ClientsService {
    clients: Client[] = [];
    notUniqueId: Subject<boolean> = new Subject();

    constructor(private http: HttpClient,
        private router: Router,
        private appService: AppService) { }

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


    private sortClients(currentSort, clients, asc:boolean = true) {
        return clients.sort((a, b) => {
            if (a[currentSort] < b[currentSort]) {
                return asc? -1 : 1;
            }
            if (a[currentSort] > b[currentSort]) {
                return asc? 1 : -1;
            }
            return 0;
        })
    }


    onSort(string: string, clients: Client[], isInit:boolean = false) {
        let visibleClients: Client[] = [];
        let currentSort = string[0].toLowerCase() + string.substr(1).replace(" ", "");
        let sorted = {
            currentSort: currentSort,
            reversed: false
        }

        let previousSort = localStorage.getItem("sort")? JSON.parse(localStorage.getItem("sort")).currentSort : "";

        if(isInit){
            visibleClients = JSON.parse(localStorage.getItem("sort")).reversed? this.sortClients(previousSort, clients,false):this.sortClients(previousSort, clients);
            sorted.reversed = JSON.parse(localStorage.getItem("sort")).reversed? true:false;
        }
        else if (previousSort !== currentSort) {
            visibleClients = this.sortClients(currentSort, clients);
            sorted.reversed = false;
        }
        else {
            visibleClients = clients.reverse();
            sorted.reversed = localStorage.getItem("sort")? !JSON.parse(localStorage.getItem("sort")).reversed: true;
        }

        previousSort = currentSort;
        localStorage.setItem("sort", JSON.stringify(sorted));

        return visibleClients;
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

    getPagedArray(array, perPage): Client[][] {
        var results: Client[][] = [];
        while (array.length) {
            results.push(array.splice(0, perPage));
        }
        return results;
    }
}