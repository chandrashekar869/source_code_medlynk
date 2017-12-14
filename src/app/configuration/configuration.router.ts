import {Routes,RouterModule} from '@angular/router';
import{ConfigurationComponent} from './configuration.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
const CONFIGURATION_ROUTER:Routes=[
    {
        path:'',
        component:ConfigurationComponent
    }
];
export const ConfigurationRouter=RouterModule.forChild(CONFIGURATION_ROUTER);