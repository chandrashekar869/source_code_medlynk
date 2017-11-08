﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { DashboardComponent } from './dashboard/index';
import {GaugecomponentComponent} from './gaugecomponent/gaugecomponent.component';
import { userAdminComponent } from './userAdmin/index';
import { addUserComponent } from './addUser/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashBoard',component: DashboardComponent},
    { path: 'gauges/:deviceId', component:GaugecomponentComponent},
    { path: 'addUser' , component:addUserComponent },
    { path: 'userAdmin', component:userAdminComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);