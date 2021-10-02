import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from '../shared/models';
import { ClientsService } from './clients.service';
import { FilterComponent } from './filter/filter.component';
import { PlaceholderDirective } from './filter/placeholder.directive';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit,OnDestroy {
  isLoading: boolean = true;
  clients: Client[];
  visibleClients: Client[];
  paged: Client[][] = [];
  // previousSort: string;
  pages;
  pageIndex:number;
  cities: string[] = [];
  countries: string[] = [];
  @ViewChild(PlaceholderDirective) filterCmp : PlaceholderDirective;
  sub:Subscription;

  constructor(private clientsService: ClientsService,
              private cmpFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.clientsService.getClients().subscribe(
      (clients: Client[]) => {
        this.clients = [...clients];

        clients.forEach(client => {
          if(client.address.city !== '' && !this.cities.includes(client.address.city)) this.cities.push(client.address.city);
          if(client.address.country !== '' && !this.countries.includes(client.address.country))this.countries.push(client.address.country);
        });

        // getting paging
        this.pages = this.clientsService.paging(clients);
        this.paged = this.clientsService.getPagedArray(clients, 10);

        if( localStorage.getItem("page")){
          this.pageIndex = +localStorage.getItem("page") - 1;
          this.visibleClients = this.paged[this.pageIndex];
        }
        else{
          this.pageIndex = 0;
          this.visibleClients = this.paged[0];
        }

        // sort
        this.visibleClients = localStorage.getItem("sort")? this.clientsService.onSort(JSON.parse(localStorage.getItem("sort")).currentSort,this.visibleClients,true) : this.visibleClients;

        this.isLoading = false;
      })

  }

  onSort(string: string) {
    this.visibleClients = this.clientsService.onSort(string,this.visibleClients);
  }

  onNavigate(page) {
    localStorage.setItem("page", page);
    this.pageIndex = page-1;
    this.visibleClients = this.paged[this.pageIndex];
    this.visibleClients = localStorage.getItem("sort")? this.clientsService.onSort(JSON.parse(localStorage.getItem("sort")).currentSort,this.visibleClients) : this.visibleClients;

  }

  showFilter(){
    const filterCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(FilterComponent);
    const filterCmpRef = this.filterCmp.viewContainerRef;
    filterCmpRef.clear();

    const compRef = filterCmpRef.createComponent(filterCmpFactory);

    compRef.instance.visibleClients = this.paged[this.pageIndex];
    compRef.instance.cities = this.cities;
    compRef.instance.countries = this.countries;

    this.sub = compRef.instance.close.subscribe((clients)=>{
      this.visibleClients = clients;
      this.sub.unsubscribe();
      filterCmpRef.clear();
    })
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
