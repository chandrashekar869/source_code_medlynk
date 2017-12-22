import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
const appRoutes: Routes = [
    { path: '', loadChildren:'app/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', loadChildren:'app/register/register.module#RegisterModule' },
    { path: 'dashBoard',loadChildren:'app/dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard]},
    { path: 'gauges/:deviceId', loadChildren:'app/gaugecomponent/gaugecomponent.module#GaugecomponentModule',canActivate: [AuthGuard]},
    { path: 'addUser' , loadChildren:'app/addUser/addUser.module#addUserModule',canActivate: [AuthGuard] },
    { path: 'userAdmin', loadChildren:'app/userAdmin/userAdmin.module#userAdminModule',canActivate: [AuthGuard]},
    { path: 'editUser', loadChildren:'app/editUser/editUser.module#editUserModule',canActivate: [AuthGuard]},
    { path: 'deviceAdmin', loadChildren:'app/deviceAdmin/deviceAdmin.module#deviceAdminModule',canActivate: [AuthGuard]},
    { path: 'addDevice', loadChildren:'app/addDevice/addDevice.module#addDeviceModule',canActivate: [AuthGuard]},
    { path: 'editDevice', loadChildren:'app/editDevice/editDevice.module#editDeviceModule',canActivate: [AuthGuard]},
    { path: 'config',  loadChildren:'app/configuration/configuration.module#ConfigurationModule',canActivate: [AuthGuard]},
    {path:  'reporting/:deviceId',loadChildren:'app/reporting/reporting.module#ReportingModule',canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes,{useHash:true});