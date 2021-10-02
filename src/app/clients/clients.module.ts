import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ClientDetailsComponent } from "./client-details/client-details.component";
// import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientsComponent } from "./clients.component";
import { FilterComponent } from './filter/filter.component';
import { PlaceholderDirective } from "./filter/placeholder.directive";

@NgModule({
    declarations: [
        ClientsComponent,
        ClientDetailsComponent,
        FilterComponent,
        PlaceholderDirective
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
        FilterComponent,
        PlaceholderDirective

    ]

})
export class ClientsModule { }