import {NgModule} from '@angular/core';
import {editDeviceComponent} from './index';
import {editDeviceRouter} from './editDevice.router';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
@NgModule({
    declarations:[editDeviceComponent],
    imports:[editDeviceRouter,CommonModule,FormsModule,HttpClientModule,AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k'
        })]
})

export class editDeviceModule{}

