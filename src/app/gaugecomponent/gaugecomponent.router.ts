import {Routes,RouterModule} from '@angular/router';
import {GaugecomponentComponent} from './gaugecomponent.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
const GAUGECOMPONENT_ROUTER:Routes=[{
    path:'',
    component:GaugecomponentComponent
}];

export const GaugecomponentRouter=RouterModule.forChild(GAUGECOMPONENT_ROUTER);