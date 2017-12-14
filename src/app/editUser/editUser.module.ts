import{NgModule} from '@angular/core';
import{editUserComponent} from './index';
import{editUserRouter} from './editUser.router';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations:[editUserComponent],
    imports:[CommonModule,FormsModule,editUserRouter,HttpClientModule]
})

export class editUserModule{}