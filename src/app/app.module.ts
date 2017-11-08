import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AgmCoreModule } from '@agm/core';
import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService,NavbarService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/index';
import { FooterComponent } from './footer/footer.component';
import { GaugecomponentComponent } from './gaugecomponent/gaugecomponent.component';
import { GoogleGaugesComponent } from './google-gauges/google-gauges.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k'
        }),
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        DashboardComponent,
        FooterComponent,
        GaugecomponentComponent,
        GoogleGaugesComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        NavbarService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }