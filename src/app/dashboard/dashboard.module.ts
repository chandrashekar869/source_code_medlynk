import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardRouter} from './dashboard.router'; 
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {HeaderComponent} from '../header/header.component';

@NgModule({
    declarations:[DashboardComponent],
    imports:[FormsModule,CommonModule,DashboardRouter,AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k'
        }),]
})

export class DashboardModule{}