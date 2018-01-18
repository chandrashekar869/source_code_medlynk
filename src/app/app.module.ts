import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService,NavbarService } from './_services/index';
import { LoginComponent } from './login/index';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EqualValidator } from './register/password.match.directive';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        
        AppComponent,
        AlertComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        EqualValidator
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