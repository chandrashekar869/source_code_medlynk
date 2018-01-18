import {NgModule} from '@angular/core';
import {addDeviceComponent} from './index';
import {addDeviceRouter} from './addDevice.router';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import{AgmCoreModule} from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations:[addDeviceComponent],
    imports:[addDeviceRouter,CommonModule,HttpClientModule,FormsModule,AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k'
        })]
})

export class addDeviceModule{}

