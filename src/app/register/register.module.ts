import {NgModule} from '@angular/core';
import {RegisterComponent} from './index';
import {RegisterRouter} from './register.router';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations:[RegisterComponent],
    imports:[CommonModule,FormsModule,RegisterRouter]
})

export class RegisterModule {}
