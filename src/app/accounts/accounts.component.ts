import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientsService } from '../clients/clients.service';
import { Client,Account } from '../shared/models';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  id: number;
  client: Client;
  accounts: Account[];
  isLoading: boolean = true;
  showForm: boolean = false;
  isNotUnique: boolean = false;

  constructor(private route: ActivatedRoute,
    private clientsService: ClientsService,
    private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.clientsService.getClients().subscribe(clients => {
        this.client = clients.find(client => client.id === this.id);
      });
      this.accountsService.getClientAccounts(this.id).subscribe(accounts => {
        this.accounts = accounts;
        this.isLoading = false;
      });
    })

  }

  onSubmit(form: NgForm) {
    this.accounts.forEach(account => {
      if (account.accountNumber === form.value.accountNumber)
        this.isNotUnique = true;
    });

    let temp: Account[] = [...this.accounts];

    if (!this.isNotUnique) {
      temp.push(form.value);
      this.accountsService.postAccounts(form.value.clientId, temp).subscribe(response => {
        console.log(response);
        this.accounts.push(form.value);
        this.showForm = false;
      },
        error => {
        console.log(error);
          if (error.status === 409) {
            this.isNotUnique = true;
          }
        }
      );
    }
  }

  closeAccount(index:number){
    if(this.accounts[index].status === 'ACTIVE'){
      this.accounts[index].status = 'CLOSED';
      this.accountsService.postAccounts(this.id,this.accounts).subscribe(res=>{
        alert("Account closed");
      })
    }
    else{
      alert("Account is already closed");
    }
  }
}
