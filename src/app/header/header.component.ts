import { Component, OnInit } from '@angular/core';
import { EqualValidator } from '../register/password.match.directive';
import { Router } from '@angular/router';
import { AlertService,NavbarService,UserService } from '../_services/index';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  display='none';
  model: any = {};
  userId:string;

  constructor( 
  	    private nav: NavbarService,   
        private router: Router,
        private alertService: AlertService,
        public http: Http) {  }

	ngOnInit() {
		this.userId = JSON.parse(localStorage.getItem('currentUser'));
	}

	openModal(){
		this.display='block'; 
	}

	onCloseHandled(){
		this.display='none'; 
	}

	changePassword(){
		console.log("model : "+this.model.password);
		var link = '/users/changePassword';
	    this.http.post(link, {user_id:this.userId,oldPassword:this.model.oldPassword,newPassword:this.model.password})
	    .map(res => res.json())
	    .subscribe(data => {  

	     if(data=='1'){
				this.alertService.success('Password changed successfully',true);
				this.router.navigate(['/login']);
	      }
	      else if(data=='2') {
                this.alertService.error('Your current password is incorrect');    
           }
	   
	    }, error => {
	     console.log("Oooops!"+error);
	     this.alertService.error(error);
	    });
	}
}
