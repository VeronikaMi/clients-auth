import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ClientDetailsComponent } from "./client-details/client-details.component";
// import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientsComponent } from "./clients.component";

@NgModule({
    declarations: [
        ClientsComponent,
        ClientDetailsComponent,
    ],
    imports: [
        SharedModule,
        // ClientsRoutingModule
        AppRoutingModule,
        TranslateModule
    ],
    exports: [
        ClientsComponent,
        ClientDetailsComponent,
    ]

})
export class ClientsModule { }