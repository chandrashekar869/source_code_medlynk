import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private router: Router,public httpcustom: Http){
  }

  ngOnInit(): void {

    console.log("from editDevice");
    this.user_details=JSON.parse(localStorage.getItem("clickedDevice"));
    console.log(this.user_details);
    this.model.username=this.user_details.customer_name;
    this.model.device_id=this.user_details.device_id;
    this.model.address=this.user_details.address;
    this.model.coordinates=this.user_details.coordinates;
    this.model.gsmmobilenumber=this.user_details.gsm_mobile_number;
    var tempObj={};
  }
  submit(){
    this.errmsg="";
    console.log(this.model);
    this.model.editDevice=true;
    var params=["username","device_id","address","coordinates","loginpassword","configpassword"];
    for(var i=0;i<params.length;i++){
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
      if(i==params.length-1){
          this.httpcustom.post("/addDevice", {data:this.model}).subscribe(data =>{ if(data.text()=="DONE")this.router.navigate(['./deviceAdmin']); });
      }
    }

    console.log(this.model);
 
}
}