import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard1Component } from '../dashboard1/dashboard1.component';
import { ProductivatyComponent } from '../productivaty/productivaty.component';

const routes: Routes=[
    {
        path:'', component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path:'dashboard',
                component: Dashboard1Component
            },
            {
                path:'productivaty',
                component: ProductivatyComponent
            }  
          ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class DashboardRoutingModule {}
