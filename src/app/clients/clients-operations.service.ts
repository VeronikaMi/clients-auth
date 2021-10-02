import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Client } from "../shared/models";

interface FilterObj{
    gender:  string,
    city: string,
    country:  string
}

@Injectable({ providedIn: 'root' })
export class ClientsOperationsService {
    clients: Client[] = [];
    notUniqueId: Subject<boolean> = new Subject();

    constructor() { }


    private sortClients(currentSort, clients, asc: boolean = true) {
        return clients.sort((a, b) => {
            if (a[currentSort] < b[currentSort]) {
                return asc ? -1 : 1;
            }
            if (a[currentSort] > b[currentSort]) {
                return asc ? 1 : -1;
            }
            return 0;
        })
    }


    onSort(string: string, clients: Client[], isInit: boolean = false) {
        let visibleClients: Client[] = [];
        let currentSort = string[0].toLowerCase() + string.substr(1).replace(" ", "");
        let sorted = {
            currentSort: currentSort,
            reversed: false
        }

        let previousSort = localStorage.getItem("sort") ? JSON.parse(localStorage.getItem("sort")).currentSort : "";

        if (isInit) {
            visibleClients = JSON.parse(localStorage.getItem("sort")).reversed ? this.sortClients(previousSort, clients, false) : this.sortClients(previousSort, clients);
            sorted.reversed = JSON.parse(localStorage.getItem("sort")).reversed ? true : false;
        }
        else if (previousSort !== currentSort) {
            visibleClients = this.sortClients(currentSort, clients);
            sorted.reversed = false;
        }
        else {
            visibleClients = clients.reverse();
            sorted.reversed = localStorage.getItem("sort") ? !JSON.parse(localStorage.getItem("sort")).reversed : true;
        }

        previousSort = currentSort;
        localStorage.setItem("sort", JSON.stringify(sorted));

        return visibleClients;
    }

    filterClients(filterObject:FilterObj, clients: Client[]) {
        let filtered:FilterObj = {
            gender:  'none',
            city:  'none',
            country:  'none'
        }

        if (filterObject.gender !== 'none') {
            clients = clients.filter(client => {
                return client.gender === filterObject.gender;
            })
            filtered.gender = filterObject.gender;
        }
        if (filterObject.city !== 'none') {
            clients = clients.filter(client => {
                return client.address.city === filterObject.city;
            })
            filtered.city = filterObject.city;
        }
        if (filterObject.country !== 'none') {
            clients = clients.filter(client => {
                return client.address.country === filterObject.country;
            })
            filtered.country = filterObject.country;

        }
        localStorage.setItem("filter", JSON.stringify(filtered));
        return clients;
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