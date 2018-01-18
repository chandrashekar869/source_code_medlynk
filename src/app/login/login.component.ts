import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService,NavbarService } from '../_services/index';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls:['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    display='none';
    valid:boolean=false;

    constructor(
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private nav: NavbarService) { }

    ngOnInit() {
        //reset nav Bar
        this.nav.logOut();
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    openModal(){
        this.model= {};
       this.display='block'; 
       document.getElementById('forgotpmessage').style.display='none';  
       document.getElementById('forgotplabel').style.display='';
       document.getElementById('forgotpinput').style.display='';
       document.getElementById('forgotpsubmit').style.display='';  
    }
  onCloseHandled(){
       this.display='none'; 
    }
    onSubmitPassword(){
        if(this.model.forgotp_emailid!='undefined'){
        this.http.post("/changePassword", {data:this.model.forgotp_emailid!}).subscribe(data => {
            if(data.text()=='ERR')
              this.alertService.error("Oops something went wrong");
            else if(data.text()=='WRONG_EMAIL'){
                this.onCloseHandled();
                this.alertService.error('Enter a valid emailid');
            }
            else if(data.text()=='DONE'){
                document.getElementById('forgotplabel').style.display='none';
                document.getElementById('forgotpinput').style.display='none';
                document.getElementById('forgotpsubmit').style.display='none'; 
                document.getElementById('forgotpmessage').style.display='';
            }
          });
    }
      }

    login() {
        if( this.model.password==undefined){
            this.valid=true;
        }
        else if( this.model.password.trim()==''){
            this.model.password='';
            this.valid=true;
        }
        else{
            this.valid=false;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error("Invalid User Id or Password");
                    this.loading = false;
                });
            }
    }
}
