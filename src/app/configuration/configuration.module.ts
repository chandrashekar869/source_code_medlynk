import { NgModule, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import {ConfigurationComponent} from './configuration.component';
import {ConfigurationRouter} from './configuration.router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[ConfigurationComponent],
    imports:[CommonModule,FormsModule,ConfigurationRouter]
})

export class ConfigurationModule {}