import {NgModule} from '@angular/core';
import {addDeviceComponent} from './index';
import {addDeviceRouter} from './addDevice.router';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';

@NgModule({
    declarations:[addDeviceComponent],
    imports:[addDeviceRouter,CommonModule,FormsModule]
})

export class addDeviceModule{}

