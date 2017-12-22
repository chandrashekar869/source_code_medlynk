import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
import { EqualValidator } from '../register/password.match.directive';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls:['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    if(data.text()=='1'){
                    this.alertService.error('The email address you have entered is already registered');
                    this.loading = false;
                    this.router.navigate(['/register']);
                    }
                    else if(data.text()=='0')
                    {   
                    this.alertService.success('Registered successfully! Please Login', true);
                    this.router.navigate(['/login']);
                    }
                    else
                    {
                    this.alertService.error('Registration not successfull');
                    this.loading = false;
                    this.router.navigate(['/register']);
                    }   
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}