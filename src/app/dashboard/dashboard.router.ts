import {Routes,RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
const DASHBOARD_ROUTER:Routes=[{
    path:'',
    component:DashboardComponent
}];
export const DashboardRouter=RouterModule.forChild(DASHBOARD_ROUTER);