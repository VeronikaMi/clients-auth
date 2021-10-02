import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/shared/models';
import { ClientsOperationsService } from '../clients-operations.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() visibleClients:Client[];
  @Output() close = new EventEmitter<Client[]>();
  @Input() cities: string[];
  @Input() countries: string[];

  constructor(private clientsOperationsService:ClientsOperationsService) { }

  ngOnInit(): void {
  }

  
  onFilter(form:NgForm) {
    this.visibleClients = this.clientsOperationsService.filterClients(form.value,this.visibleClients);
  
    this.close.emit(this.visibleClients);
  }

  cancel(){
    this.close.emit(this.visibleClients);
  }

}
