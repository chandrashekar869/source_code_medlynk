import {Routes,RouterModule} from '@angular/router';
import {deviceAdminComponent} from './index';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

const DEVICEADMIN_ROUTER:Routes=[
    {
        path:'',
        component:deviceAdminComponent
    }
]

export const deviceAdminRouter=RouterModule.forChild(DEVICEADMIN_ROUTER);