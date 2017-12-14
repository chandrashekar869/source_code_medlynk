import {NgModule} from '@angular/core';
import {ReportingComponent} from './reporting.component';
import {ReportingRouter} from './reporting.router';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
@NgModule({
    declarations:[ReportingComponent],
    imports:[CommonModule,FormsModule,ReportingRouter]
})

export class ReportingModule{}