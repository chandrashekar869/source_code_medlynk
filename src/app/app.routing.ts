import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { DashboardComponent } from './dashboard/index';
import { GaugecomponentComponent} from './gaugecomponent/gaugecomponent.component';
import { userAdminComponent } from './userAdmin/index';
import { addUserComponent } from './addUser/index';
import { editUserComponent } from './editUser/index';
import { deviceAdminComponent } from './deviceAdmin/index';
import { addDeviceComponent } from './addDevice/index';
import { editDeviceComponent } from './editDevice/index';
import { ConfigurationComponent } from './configuration/configuration.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashBoard',component: DashboardComponent},
    { path: 'gauges/:deviceId', component:GaugecomponentComponent},
    { path: 'addUser' , component:addUserComponent },
    { path: 'userAdmin', component:userAdminComponent},
    { path: 'editUser', component:editUserComponent},
    { path: 'deviceAdmin', component:deviceAdminComponent},
    { path: 'addDevice', component:addDeviceComponent},
    { path: 'editDevice', component:editDeviceComponent},
    { path: 'config', component:ConfigurationComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);