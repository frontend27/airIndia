import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { Dashboard1Component } from '../dashboard1/dashboard1.component';
import { HeaderComponent } from '../common/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AsidebarComponent } from '../common/asidebar/asidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { ProductivatyComponent } from '../productivaty/productivaty.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    DashboardComponent,
    Dashboard1Component,
    HeaderComponent,
    AsidebarComponent,
    ProductivatyComponent
  ],
  imports: [
    CommonModule, 
    DashboardRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class DashboardModule { }
