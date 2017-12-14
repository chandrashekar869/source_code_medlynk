import {Routes,RouterModule} from '@angular/router';
import {addDeviceComponent} from './index';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';

const ADDDEVICE_ROUTER:Routes=[
    {
        path:'',
        component:addDeviceComponent
    }
]

export const addDeviceRouter=RouterModule.forChild(ADDDEVICE_ROUTER);