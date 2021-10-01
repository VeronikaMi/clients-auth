import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client,Account } from 'src/app/shared/models';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  client:Client;
  id:number;
  accounts:Account[] = [];
  isLoading:boolean = true;
  photo:string;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private clientsService:ClientsService,
              private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params["id"];
       this.clientsService.getClients().subscribe(clients=>{
        this.client = clients.find(client=>client.id === this.id);
        console.log(typeof(this.client.photo));
        if(this.client.photo !== ""){
          this.photo = window.atob(this.client.photo.split("base64,")[1].split("+")[0]);
          console.log(this.photo);
          }
        this.isLoading = false;
      });
    })

  }

  onDelete(){
    this.clientsService.deleteClient(this.id);
  }

  onEdit(){
    this.router.navigate(['/clients', this.id, 'edit']);
  }

}