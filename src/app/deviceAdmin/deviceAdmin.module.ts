import {NgModule} from '@angular/core';
import {deviceAdminComponent} from './index';
import {deviceAdminRouter} from './deviceAdmin.router';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations:[deviceAdminComponent],
    imports:[deviceAdminRouter,CommonModule,FormsModule,HttpClientModule]
})

export class deviceAdminModule{}

