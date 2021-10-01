import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        SharedModule,
        AppRoutingModule,
        TranslateModule
    ],
    exports:[
        AuthComponent
    ]
})
export class AuthModule{}