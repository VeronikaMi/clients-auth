import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientsComponent } from './clients/clients.component';
import { FormComponent } from './shared/form/form.component';

const routes: Routes = [
  { path: '', redirectTo:'clients', pathMatch:'full' },
  { path:'auth', component:AuthComponent },
  // { path:'clients', loadChildren:()=>import('./clients/clients.module').then(m=>m.ClientsModule)},

  { path:'clients', component:ClientsComponent, canActivate:[AuthGuard]},
  { path:'clients/new', component:FormComponent },
  { path:'clients/:id', component:ClientDetailsComponent, children:[
    { path: '', component:AccountsComponent }
  ] },
  { path:'clients/:id/edit', component:FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
