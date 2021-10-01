import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../shared/models';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  isLoading: boolean = true;
  clients: Client[];
  visibleClients: Client[];
  paged: Client[][] = [];
  previousSort: string;
  pages;
  filter: boolean = false;
  cities: string[] = [];
  countries: string[] = [];

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.clientsService.getClients().subscribe(
      (clients: Client[]) => {
        this.clients = [...clients];

        clients.forEach(client => {
          if(client.address.city !== '' && !this.cities.includes(client.address.city)) this.cities.push(client.address.city);
          if(client.address.country !== '' && !this.countries.includes(client.address.country))this.countries.push(client.address.country);
        });

        this.pages = this.clientsService.paging(clients);
        this.paged = this.clientsService.getPagedArray(clients, 10);

        this.visibleClients = localStorage.getItem("page") ? this.paged[+localStorage.getItem("page") - 1] : this.paged[0];

        if(localStorage.getItem("sort") && JSON.parse(localStorage.getItem("sort")).reversed){
          this.visibleClients =  this.clientsService.sortClients(JSON.parse(localStorage.getItem("sort")).currentSort, this.visibleClients); 
          this.visibleClients = this.visibleClients.reverse();
          
        }
        else{
          this.visibleClients = localStorage.getItem("sort") ? this.clientsService.sortClients(JSON.parse(localStorage.getItem("sort")).currentSort, this.visibleClients) : this.visibleClients;
        }

        this.isLoading = false;
      })

  }

  onSort(string: string) {
    let currentSort = string[0].toLowerCase() + string.substr(1).replace(" ", "");
    let sorted = {
      currentSort: currentSort,
      reversed: false
    }

    if (this.previousSort !== currentSort) {
      this.visibleClients = this.clientsService.sortClients(currentSort, this.visibleClients);
      sorted.reversed = false;
    }
    else {
      this.visibleClients = this.visibleClients.reverse();
      sorted.reversed = true;
    }

    this.previousSort = currentSort;
    localStorage.setItem("sort", JSON.stringify(sorted));

  }

  onNavigate(page) {
    localStorage.setItem("page", page);
    this.visibleClients = this.paged[page - 1];
    this.visibleClients = localStorage.getItem("sort") ? this.clientsService.sortClients(localStorage.getItem("sort"), this.visibleClients) : this.visibleClients;
  }

  onFilter(form:NgForm) {
    console.log(this.clients);
    let filtered = {
      gender:false,
      city:false,
      country:false
    }

    if(form.value.gender !== 'none'){
      this.visibleClients = this.clients.filter(client =>{
        return client.gender.toLowerCase() === form.value.gender.toLowerCase();
      })
      filtered.gender = true;
    }
    if(form.value.city !== 'none'){
      this.visibleClients = this.clients.filter(client =>{
        return client.address.city === form.value.city;
      })
      filtered.city = true;
    }
    if(form.value.country !== 'none'){
      this.visibleClients = this.clients.filter(client =>{
        return client.address.country === form.value.country;
      })
      filtered.country = true;

    }
    localStorage.setItem("filter", JSON.stringify(filtered));

    this.filter = false;
  }
}
