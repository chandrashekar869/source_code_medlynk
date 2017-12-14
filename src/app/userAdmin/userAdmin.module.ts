import {NgModule} from '@angular/core';
import {userAdminComponent} from './index';
import {userAdminRouter} from './userAdmin.router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
declarations:[userAdminComponent],
imports:[userAdminRouter,FormsModule,CommonModule,HttpClientModule]
})

export class userAdminModule{}
