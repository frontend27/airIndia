import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './layout/register/register.component';
import { LoginComponent } from './layout/login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'sign-up', pathMatch: 'full'
  },
  {
    path: 'sign-up', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'admin',
    loadChildren:()=> import('./admin/dashboard/dashboard.module').then(m=> m.DashboardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
