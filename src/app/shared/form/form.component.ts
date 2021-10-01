import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/clients/clients.service';
import { Client } from '../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  notUniqueId:boolean = false;
  id:number;
  isEdit:boolean = false;
  client:Client;
  isLoading:boolean = true;
  imageUrl:string;
  selectedFile:Blob;
  image:string;

  // img encode btoa() , decode atob
  constructor(private route:ActivatedRoute,
              private clientsService:ClientsService,
              private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {    
    if(this.route.snapshot.params["id"]){
      this.isEdit = true;
      this.id = +this.route.snapshot.params["id"];
      this.clientsService.getClients().subscribe(clients=>{
        this.client = clients.find(client=>client.id === this.id);
        this.isLoading = false;
      });
    }
    else{
      this.isLoading = false;
    }

    this.clientsService.notUniqueId.subscribe(value=>{
      this.notUniqueId = value;
    })
  }

  onSubmit(form: NgForm) {
    let client: Client = form.value;
    client.photo = this.image;

    if(this.isEdit){
      this.clientsService.editClient(this.id,client);
    }
    else{
      this.clientsService.addClient(this.id,client);
    }  
  }

  getImgInBase64(files:FileList){
    this.selectedFile = files[0];
    this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedFile)) as string;
    // this.image = window.btoa(this.imageUrl);
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile as Blob);
    reader.onload = ()=>{
      this.image = reader.result as string;
    }
  }
}
