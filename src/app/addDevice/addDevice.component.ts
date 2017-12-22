import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { NavbarService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../_services/index';
@Component({
  moduleId: module.id,
  templateUrl: './addDevice.component.html',
  styleUrls: ['./addDevice.component.css']
})
export class addDeviceComponent {
  name:string;
  model:any={};
  results:any[]=[];
  title = 'Medlsys';
  roles:string[]=["User","Admin","Sub Admin"];
  role:string;
  errmsg:string;
 select:any;
 selecta:any;
  constructor(private alertService:AlertService,private router: Router,public nav: NavbarService,public httpcustom: Http){
  }

  ngOnInit(): void {
    var tempObj={};
    this.nav.show();
    // Make the HTTP request:
  }


    submit(){
      this.errmsg="";
      console.log(this.model);
      this.model.editDevice=false;
      this.model.user_id=localStorage.getItem("currentUser");
      var params=["username","device_id","address","key_location","coordinates","loginpassword","configpassword","gsmmobilenumber"];
      for(var i=0;i<=7;i++){
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
        if(i==7){
            this.httpcustom.post("/addDevice", {data:this.model}).subscribe(data => {
              if(data.text()=='ERR')
                this.alertService.error("Oops something went wrong");
              else if(data.text()=='DONE'){
                this.router.navigate(['./deviceAdmin']);
                this.alertService.success("Added Successfully");
              }
            });
        }
      }

      console.log(this.model);
   
}
}