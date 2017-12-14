import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {GaugecomponentComponent} from './gaugecomponent.component';
import {GaugecomponentRouter} from './gaugecomponent.router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
 
@NgModule({
    declarations:[GaugecomponentComponent],
    imports:[GaugecomponentRouter,FormsModule,CommonModule]
})
export class GaugecomponentModule {}