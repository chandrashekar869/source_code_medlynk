import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { NavbarService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../_services/index';
import { appConfig } from '../app.config';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
 lat:number=12.9716;
 lng:number=77.5946;
 url:string='https://maps.googleapis.com/maps/api/geocode/json?address=';
 apikey='&key=AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k';
 iconUrl=appConfig.imagePath+'redmarker.png';
 maptoggle:boolean=false;
  constructor(private alertService:AlertService,private router: Router,public http: HttpClient,public nav: NavbarService,public httpcustom: Http){
  this.model.configpassword='default';
  }

  ngOnInit(): void {
    var tempObj={};
    this.nav.show();
    // Make the HTTP request:
  }
  togglemap(){
    this.errmsg='';
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


    submit(){
      this.errmsg="";

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
                this.alertService.success("Device added successfully");
              }
            });
        }
      }


   
}
}