import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AppRoutingModule } from "../app-routing.module";
import { FormComponent } from "./form/form.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations:[
        FormComponent,
        LoadingSpinnerComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule
    ],
    exports:[
        FormComponent,
        LoadingSpinnerComponent,
        CommonModule,
        FormsModule,
        HttpClientModule,
    ]
})
export class SharedModule{}