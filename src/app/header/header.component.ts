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
  constructor( 
  	    private nav: NavbarService,   
        private router: Router,
        private alertService: AlertService,
        public http: Http) {  }

	ngOnInit() {
	}

	openModal(){
		this.display='block'; 
	}

	onCloseHandled(){
		this.display='none'; 
	}

	changePassword(){
		var link = '/users/changePassword';
	    this.http.post(link, {user_id:this.model})
	    .map(res => res.json())
	    .subscribe(data => {                      
	        this.alertService.success(' Password changed successfully', true);
	        this.router.navigate(['/login']); 
	    }, error => {
	     console.log("Oooops!"+error);
	     this.alertService.error(error);
	    });
	}
}
