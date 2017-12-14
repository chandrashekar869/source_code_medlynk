import{Routes,RouterModule} from '@angular/router';
import {editUserComponent} from './index';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

const EDITUSER_ROUTER:Routes=[
    {
        path:'',
        component:editUserComponent
    }
];

export const editUserRouter=RouterModule.forChild(EDITUSER_ROUTER);