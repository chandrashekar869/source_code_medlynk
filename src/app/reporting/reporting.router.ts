import{Routes,RouterModule} from '@angular/router';
import {ReportingComponent} from './reporting.component';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
const REPORTING_ROUTER:Routes=[
    {
        path:'',
        component:ReportingComponent
    }
];

export const ReportingRouter=RouterModule.forChild(REPORTING_ROUTER);