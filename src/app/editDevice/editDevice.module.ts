import {NgModule} from '@angular/core';
import {editDeviceComponent} from './index';
import {editDeviceRouter} from './editDevice.router';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';

@NgModule({
    declarations:[editDeviceComponent],
    imports:[editDeviceRouter,CommonModule,FormsModule]
})

export class editDeviceModule{}

