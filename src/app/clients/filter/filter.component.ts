import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/shared/models';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() visibleClients:Client[];
  @Output() close = new EventEmitter<Client[]>();
  backUpClients:Client[];
  @Input() cities: string[];
  @Input() countries: string[];

  constructor() { }

  ngOnInit(): void {
    this.backUpClients = this.visibleClients;
  }

  
  onFilter(form:NgForm) {
    // console.log(this.clients);
    // this.visibleClients = this.backUpClients;
    let filtered = {
      gender:false,
      city:false,
      country:false
    }

    if(form.value.gender !== 'none'){
      this.visibleClients = this.visibleClients.filter(client =>{
        return client.gender.toLowerCase() === form.value.gender.toLowerCase();
      })
      filtered.gender = true;
    }
    if(form.value.city !== 'none'){
      this.visibleClients = this.visibleClients.filter(client =>{
        return client.address.city === form.value.city;
      })
      filtered.city = true;
    }
    if(form.value.country !== 'none'){
      this.visibleClients = this.visibleClients.filter(client =>{
        return client.address.country === form.value.country;
      })
      filtered.country = true;

    }
    localStorage.setItem("filter", JSON.stringify(filtered));

    // this.filter = false;
    this.close.emit(this.visibleClients);
  }

  cancel(){
    this.close.emit(this.visibleClients);
  }

}
