import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  lang;
  constructor(private router:Router,
              private appService:AppService,
              private translate: TranslateService) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang") || "en";
    this.translate.setDefaultLang(this.lang);
  }

  onLogout(){
    localStorage.clear();
    this.appService.loggedIn.next(false);
    this.router.navigate(['/auth']);
  }

  onChangeLan(lang){
    this.translate.setDefaultLang(lang);
    localStorage.setItem("lang",lang);
  }

}
