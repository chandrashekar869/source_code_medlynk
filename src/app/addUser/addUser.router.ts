import {Routes,RouterModule} from '@angular/router';
import {addUserComponent} from './index';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
const ADDUSER_ROUTER:Routes=[
    {
        path:'',
        component:addUserComponent
    }
];

export const addUserRouter=RouterModule.forChild(ADDUSER_ROUTER);
