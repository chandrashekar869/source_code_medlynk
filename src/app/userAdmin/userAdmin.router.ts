import {Routes,RouterModule} from '@angular/router';
import {userAdminComponent} from './index';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

const USERADMIN_ROUTER :Routes=[
    {
        path:'',  
        component:userAdminComponent
    }
];

export const userAdminRouter=RouterModule.forChild(USERADMIN_ROUTER);