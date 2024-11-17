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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { TrainformComponent } from '../trainform/trainform.component';
import { TrainlistComponent } from '../trainlist/trainlist.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    DashboardComponent,
    Dashboard1Component,
    HeaderComponent,
    AsidebarComponent,
    ProductivatyComponent,
    TrainformComponent,
    TrainlistComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    HighchartsChartModule,
    MatTableModule
  ],
  providers: [MatDatepickerModule]
})
export class DashboardModule { }
