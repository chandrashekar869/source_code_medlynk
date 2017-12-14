import { NgModule, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import {ConfigurationComponent} from './configuration.component';
import {ConfigurationRouter} from './configuration.router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations:[ConfigurationComponent],
    imports:[HttpModule,CommonModule,FormsModule,ConfigurationRouter]
})

export class ConfigurationModule {}