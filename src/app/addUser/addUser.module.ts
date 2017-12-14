import {NgModule} from '@angular/core';
import {addUserComponent} from './index';
import {addUserRouter} from './addUser.router';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
    declarations:[addUserComponent],
    imports:[CommonModule,FormsModule,addUserRouter,HttpClientModule]
})

export class addUserModule{}
