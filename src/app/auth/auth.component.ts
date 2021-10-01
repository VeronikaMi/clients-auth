import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { url } from 'src/globals';
import { AppService } from '../app.service';

interface Response{
  token:string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading:boolean = false;
  error:string = "";
  constructor(private http:HttpClient,
              private router:Router,
              private appService:AppService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.isLoading = true;

    this.http.post<Response>(url + "auth/login",
    {
      "name": form.value.username,
      "password": form.value.password
    }
    ).subscribe(response=>{
      localStorage.setItem("token",JSON.stringify(response.token));
      console.log(response.token);
      this.isLoading = false;
      this.router.navigate(['/clients']);
      this.appService.loggedIn.next(true);
    },
    error=>{
      console.log(error);
      this.error = "Invalid user data";
      this.isLoading = false;
    })


  }

}
