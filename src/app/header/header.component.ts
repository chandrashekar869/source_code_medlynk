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
	prevpage:any;
  constructor( 
  	    public nav: NavbarService,   
        private router: Router,
        private alertService: AlertService,
        public http: Http) {  }
	ngDoCheck(){
		this.user_name = JSON.parse(localStorage.getItem('userName'));
		this.userId = JSON.parse(localStorage.getItem('currentUser'));
		this.userRole = JSON.parse(localStorage.getItem('userRole'));
		if(this.userRole!=null && this.userRole.toLowerCase().replace(" ","").trim() == 'user')   
			this.nav.hide();
		if(this.prevpage!=location.hash && this.userId!=null ){
			this.prevpage=location.hash;
			clearInterval(this.interval);		
			this.getBadgeValue();
			this.interval = setInterval(() =>{
				this.getBadgeValue();
		 },10000);
		}
	}
	ngOnInit(){
		this.prevpage=location.hash;
		this.getBadgeValue();
		this.interval = setInterval(() =>{
			this.getBadgeValue();
	 },20000); 
		this.userId = JSON.parse(localStorage.getItem('currentUser'));
		this.userRole = JSON.parse(localStorage.getItem('userRole'));
		this.imagePath = appConfig.imagePath+'logo.png';
			if(this.userId ){
			this.user_name = JSON.parse(localStorage.getItem('userName'));
		    if(this.userRole.toLowerCase().replace(" ","").trim() == 'user')   
		        this.nav.hide();
		    else
		        this.nav.show();
	    }
	    else
	    	this.nav.logOut();
	}
	ngOnDestroy(){
    clearInterval(this.interval);
   }

	getBadgeValue(){
		this.count=0;
		this.http.post('/deviceAdmin',{data:localStorage.getItem("currentUser")})
	    .map(res => res.json())
	    .subscribe(data => {  
			var currentdate=new Date();
			var timediff;	
			for(var i=0;i<data["length"];i++){
				if(data[i].http_post_interval!='undefined'){
          timediff=Number(data[i].http_post_interval);
          if(timediff >=60 ){
          timediff=timediff;}
        else if(timediff<60 && timediff>=30){
          timediff=3*timediff;
  }
        else if(timediff>0 && timediff<30){
          timediff=5*timediff;
  }
        }
        else{
          data[i].http_post_interval=0;
          timediff=5;
        }
				timediff*=1000;
				console.log("header",data[i]);
				console.log("header",timediff);
        if(data[i].ang2_threshold=='undefined' || data[i].ang3_threshold=='undefined'){
          data[i].ang2_threshold="DISABLE";
          data[i].ang3_threshold="DISABLE";
          data[i].ang2_lower_limit="20000";
          data[i].ang3_lower_limit="0";
        }
				var d=new Date(data[i].server_log_time);
				var diff=currentdate.getTime()-d.getTime();
        if(timediff >= 60000 ){
          diff=diff-50000;
        }
				var flag=false;
				if((data[i].ang2_threshold!=null && data[i].ang2_threshold=="ENABLE" && data[i].ang2_lower_limit!=null && Number(data[i].gas_detector)*1000>Number(data[i].ang2_lower_limit)  ) || data[i].gas_leak==1 || data[i].gas_leak==null){
			  flag=true;
				}
			  else if((data[i].ang3_threshold!=null && data[i].ang3_threshold=="ENABLE" && data[i].ang3_lower_limit!=null && Number(data[i].gas_level)*1000<Number(data[i].ang3_lower_limit)  ) || data[i].low_gas==1 || data[i].low_gas==null){
				flag=true;
			}
			  else if( Number(data[i].power_level)<9 || data[i].low_gas==null){
			flag=true;  
			}
			  else if(data[i].log_time==null || diff>timediff){
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

	}
	changePassword(){
		this.display='none';

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
	     this.alertService.error("Something went wrong");
	    });
	}
	logOut(){
		this.nav.logOut();
		clearInterval(this.interval);
		this.router.navigate(['/login']);
	}
}
