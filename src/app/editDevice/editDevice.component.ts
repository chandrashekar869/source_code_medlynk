import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../_services/index';
@Component({
  moduleId: module.id,
  templateUrl: './editDevice.component.html',
  styleUrls: ['./editDevice.component.css']
})
export class editDeviceComponent {
  name:string;
  model:any={};
  results:any[]=[];
  title = 'Medlsys';
  roles:string[]=["User","Admin","Sub Admin"];
  role:string;
  errmsg:string;
 select:any;
 selecta:any;
 user_details:any;
  constructor(private alertService:AlertService,private router: Router,public httpcustom: Http){
  }

  ngOnInit(): void {

    console.log("from editDevice");
    this.user_details=JSON.parse(localStorage.getItem("clickedDevice"));
    console.log(this.user_details);
    this.model.username=this.user_details.customer_name;
    this.model.device_id=this.user_details.device_id;
    this.model.address=this.user_details.address;
    this.model.key_location=this.user_details.key_location;
    this.model.coordinates=this.user_details.coordinates;
    this.model.gsmmobilenumber=this.user_details.gsm_mobile_number;
    this.model.loginpassword=this.user_details.device_password;
    this.model.configpassword=this.user_details.config_password;
    var tempObj={};
  }
  submit(){
    this.errmsg="";
    console.log(this.model);
    this.model.editDevice=true;
    var params=["username","device_id","address","key_location","coordinates","loginpassword","configpassword"];
    for(var i=0;i<=6;i++){
      if(!this.model.hasOwnProperty(params[i])){
        this.errmsg="Fill field "+params[i];
        break;
      }
      else{
        if(this.model[params[i]]==undefined){
          this.errmsg="* Fill field "+params[i];
          break;
        }
      }
      if(i==6){
          this.httpcustom.post("/addDevice", {data:this.model}).subscribe(data =>{
             if(data.text()=="DONE"){
               this.router.navigate(['./deviceAdmin']);
               this.alertService.success("Successfull");
            }
            if(data.text()=="ERR"){
              this.alertService.error("Something went wrong");
            }
            });
      }
    }

    console.log(this.model);
 
}
}