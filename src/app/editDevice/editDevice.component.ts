import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions } from '@angular/http';
import {AlertService} from '../_services/index';
import * as CryptoJS from 'crypto-js';
import { appConfig } from '../app.config';

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
 display:any; 
 lat:number;
 lng:number;
 url:string='https://maps.googleapis.com/maps/api/geocode/json?address=';
 apikey='&key=AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k';
 iconUrl=appConfig.imagePath+'redmarker.png';
 maptoggle:boolean=false;
 constructor(private alertService:AlertService,private router: Router,public httpcustom: Http,public http:HttpClient){
  this.model.configpassword='default';
}

  ngOnInit(): void {
    var decrypteddata=CryptoJS.AES.decrypt(localStorage.getItem("clickedDevice"),new Date().toLocaleDateString()+"AES128").toString(CryptoJS.enc.Utf8);
    this.user_details=JSON.parse(decrypteddata);

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

  togglemap(){
    this.url='https://maps.googleapis.com/maps/api/geocode/json?address=';
    this.apikey='&key=AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k';
        this.url=this.url+this.model.address.trim().replace(/\s/g,'+');
    this.url=this.url.concat(this.apikey);
    if(this.model.address==undefined || this.model.address.trim()=='')
      this.errmsg='Please enter address';
    else{
      this.http.get(this.url).subscribe(data =>{
        this.lat=data["results"][0]['geometry']['location']['lat'];
        this.lng=data["results"][0]['geometry']['location']['lng'];      
        this.model.coordinates=this.lat+','+this.lng;   
      });
    if(this.maptoggle==false)
      this.maptoggle=true;
        else
      this.maptoggle=false;}
  
  }

  markerMoved(event){
    this.lat=event['coords']['lat'];
    this.lng=event['coords']['lng'];
    this.model.coordinates=this.lat+','+this.lng;   
  }
  

  openModal(){
    this.model= {};
     this.display='block'; 
  }
onCloseHandled(){
     this.display='none'; 
  }
  submit(){
    this.errmsg="";
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
               this.alertService.success("Device details updated successfully");
            }
            if(data.text()=="ERR"){
              this.alertService.error("Something went wrong");
            }
            });
      }
    }

 
}
}