import { Component, OnInit,DoCheck,OnDestroy} from '@angular/core';
import { EqualValidator } from '../register/password.match.directive';
import { Router } from '@angular/router';
import { AlertService,NavbarService,UserService } from '../_services/index';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck,OnDestroy {
  display='none';
  model:any = {};
  imagePath:string;
  userId:string;
  user_name:string;
  value:any;	
	count:number=0;
	interval:any;
  userRole:string;
  constructor( 
  	    public nav: NavbarService,   
        private router: Router,
        private alertService: AlertService,
        public http: Http) {  }
	ngDoCheck(){
		this.user_name = JSON.parse(localStorage.getItem('userName'));
	}
	ngOnInit(){
		console.log("header called");
		this.getBadgeValue();
		this.interval = setInterval(() =>{
			this.getBadgeValue();
	 },20000); 
		this.userId = JSON.parse(localStorage.getItem('currentUser'));
		this.userRole = JSON.parse(localStorage.getItem('userRole'));
		this.imagePath = appConfig.imagePath+'logo.png';
			if(this.userId ){
			this.user_name = JSON.parse(localStorage.getItem('userName'));
		    if(this.userRole.toLowerCase() == 'user')   
		        this.nav.hide();
		    else
		        this.nav.show();
	    }
	    else
	    	this.nav.logOut();
	}
	ngOnDestroy(){
    clearInterval(this.interval);
    console.log("OnDestroy called");
   }

	getBadgeValue(){
		this.count=0;
		this.http.post('/deviceAdmin',{data:localStorage.getItem("currentUser")})
	    .map(res => res.json())
	    .subscribe(data => {  
			var currentdate=new Date();

			for(var i=0;i<data["length"];i++){
				var d=new Date(data[i].log_time);
				var flag=false;
				if(((Number(data[i].gas_detector)-4)*6.25)>=10 || data[i].gas_leak==1 || data[i].gas_leak==null){
			  flag=true;
				}
			  else if((Number(data[i].gas_level)*20)<20 || data[i].low_gas==1 || data[i].low_gas==null){
				flag=true;
			}
			  else if((Number(data[i].power_level)*8.33)<30 || data[i].low_gas==null){
			flag=true;  
			}
			  else if(data[i].log_time==null || (currentdate.getTime()-d.getTime())>=60000){
			flag=true;  
			}
			  else{
				if(data[i].log_time==null){
				flag=true;
				}
				else{
					flag=false;
				}
			  }
			if(flag==true)
				this.count++;  
			}
			this.value=this.count;
			}, error => {
	     console.log("Oooops!"+error);
		});
	}

	openModal(){
		this.model={};
		this.display='block'; 
	}

	onCloseHandled(){
		this.display='none'; 
	}
	setName(){
		console.log("name set");
	}
	changePassword(){
		this.display='none';
		console.log("model : "+this.model.password);
		var link = '/users/changePassword';
	    this.http.post(link, {user_id:this.userId,oldPassword:this.model.oldPassword,newPassword:this.model.password})
	    .map(res => res.json())
	    .subscribe(data => {  
	     if(data=='0'){
				this.alertService.success('Password changed successfully',true);
				this.router.navigate(['/login']);
	      }
	      else if(data=='2') {
                this.onCloseHandled();    
				this.alertService.error('Your current password is incorrect'); 
           }
		else if(data =='1'){   
                this.alertService.error('Something went wrong'); 
	       }
	    }, error => {
	     console.log("Oooops!"+error);
	     this.alertService.error("Something went wrong");
	    });
	}
	logOut(){
		this.nav.logOut();
		clearInterval(this.interval);
		this.router.navigate(['/login']);
	}
}
