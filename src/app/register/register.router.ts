import {Routes,RouterModule} from '@angular/router';
import{RegisterComponent} from './index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
const REGISTER_ROUTER:Routes=[
    {
        path:'',
        component:RegisterComponent
    }
];
export const RegisterRouter=RouterModule.forChild(REGISTER_ROUTER);