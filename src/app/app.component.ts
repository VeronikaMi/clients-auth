import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader:boolean = true;
  sub:Subscription;
  constructor(private http:HttpClient,
              private appService:AppService){}
  
  
  ngOnInit(){
    this.sub = this.appService.loggedIn.subscribe(value=>{
      this.showHeader = value;
      console.log("showheader  " + this.showHeader)
    })
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
