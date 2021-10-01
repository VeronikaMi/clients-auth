import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AccountsComponent } from "./accounts.component";

@NgModule({
    declarations:[
        AccountsComponent,
    ],
    imports:[
        SharedModule,
        AppRoutingModule,
        TranslateModule
    ],
    exports:[
        AccountsComponent,
    ]
})
export class AccountsModule{}