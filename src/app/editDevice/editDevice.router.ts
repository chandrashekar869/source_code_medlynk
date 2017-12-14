import {Routes,RouterModule} from '@angular/router';
import {editDeviceComponent} from './index';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';

const EDITDEVICE_ROUTER:Routes=[
    {
        path:'',
        component:editDeviceComponent
    }
]

export const editDeviceRouter=RouterModule.forChild(EDITDEVICE_ROUTER);