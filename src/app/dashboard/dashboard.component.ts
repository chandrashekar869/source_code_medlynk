import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appConfig } from '../app.config';
import { AlertService,NavbarService,UserService } from '../_services/index';
import { User } from '../_models/index';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import 'rxjs/add/operator/map';

@Component({
   moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,OnDestroy {
	// initial map points or center point on the map and declare values
	title: string = 'My first AGM project';  
	lat: number = 12.98164225;
	lng: number = 77.59287357;
	levelNum:number;
	mapID: string = 'TERRAIN';
  User_Id:string;
  userId:string = '12345';
  message:string='hi';
  deviceName:string;
  markerOpen:boolean = false;
  currentUser: User;
  tankLevel:any;
  GasLeak:any;
  select:any;
  powerSupply:Number;
  selectUndefinedOptionValue:any;
  interval:any;
  selectedVal:string='All';
  zoomLevel:any;
	ngOnInit()
  {
  this.userId = JSON.parse(localStorage.getItem('currentUser'));
	this.getDeviceAttributes(this.userId);
  //set interval 
  this.interval = setInterval(() =>{
          this.getDeviceAttributes(this.userId)
        },15000);  
  }  
    //OnDestroy
  ngOnDestroy(){

   clearInterval(this.interval);
  }

  constructor(private router: Router,public http: Http,public nav:NavbarService){
    //get the local user id
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(Number(JSON.parse(localStorage.getItem('zoomLevel')))==undefined || Number(JSON.parse(localStorage.getItem('zoomLevel')))==0)
  localStorage.setItem('zoomLevel', JSON.stringify(10));
  this.zoomLevel= Number(JSON.parse(localStorage.getItem('zoomLevel')));
  }

	clickedMarker(marker:marker, index:number){
		//this functoin is called when marker is clicked 

		this.router.navigate(['./gauges/:'+marker.label]);
	}//clickedMarker

  zoomChange(m){
    console.log("hi");
    localStorage.setItem('zoomLevel', JSON.stringify(m));
    this.zoomLevel= Number(JSON.parse(localStorage.getItem('zoomLevel')));
  }

	mouseOver(infoWindow, gm) {
		//on mouse over event , it opens up the info-window
    this.deviceName = gm.label;
    this.message = gm.message;
		infoWindow.open();
	}//mouseOver


	mouseOut(infoWindow, gm) {
		//on mouse out event , close info-window
		infoWindow.close();
	}//mouseOut

	options =['Red', 'Yellow', 'Green','Disconnected','All']
	selected;
	selectedData;
//onSelect whch map to be shown on map by default its All
  onSelect(val){

    this.selectedVal = val;
    this.selectedData = this.someData.filter(x => x.value == val)
    if(val=='All')
    {
     this.selectedData = this.someData;
    }
  }

//on select of device , center the tip point and show the info window 
  onSelected(val){
    for (var i = 0; i < this.someData.length; i++){
        this.markerOpen = false;
        this.someData[i].info = false;
        // look for the entry with a matching `code` value
    if (this.someData[i].label == val){
        this.lat = this.someData[i].lat;
        this.lng = this.someData[i].lng;/*
        this.deviceName = this.someData[i].label;
        this.message = this.someData[i].message;
        this.markerOpen = true;
        console.log(this.someData[i].label);*/
        this.someData[i].info = true;
    	  }
      }
  }

    getDeviceAttributes(id:string){
    var link = '/users/deviceList';
    var jsonObject =[];
    var timediff;
    //var data = JSON.stringify();
    this.http.post(link, {user_id:id})
    .map(res => res.json())
    .subscribe(data => {
    // this.data.response = data;
    for (var i = 0; i < data.length; i++){
      if(data[i].http_post_interval!='undefined'){
        timediff=Number(data[i].http_post_interval);
        if(timediff >= 60 ){
        timediff=timediff+100;}
      else if(timediff<60 && timediff>=30){
        timediff=3*timediff;}
      else if(timediff>0 && timediff<30){
        timediff=5*timediff;}
      }
      else{
        data[i].http_post_interval=0;
        timediff=5;
      }
      timediff*=1000;
      console.log(timediff);

      if(data[i].ang2_threshold=='undefined' || data[i].ang3_threshold=='undefined'){
        data[i].ang2_threshold="DISABLE";
        data[i].ang3_threshold="DISABLE";
        data[i].ang2_lower_limit="20000";
        data[i].ang3_lower_limit="0";
      }
      var item = {};

        var today = new Date();
        //converting the log date in date formate
        var date2 = new Date(data[i].log_time);
        //get the difference between the date in days
        var diffDays = today.getTime() - date2.getTime();
        diffDays+=20000;
        if(timediff >= 60 ){
          diffDays-=70000;}

        // var diffDays = Math.ceil(diff / (60000)); 
        //comment the console.log after done with testing
        //deivce id
        var device_id = data[i].device_id;
        var value ;
        var iconUrl;
        var message;
        var tankLevelA = data[i].gas_level;
        var gasLeakA = data[i].gas_detector; 

        this.tankLevel = Math.round(Number(tankLevelA)*20);
        if(Number(gasLeakA)>4){
        this.GasLeak = Math.round((Number(gasLeakA)-4)*6.25);}
        else
        this.GasLeak = 0;
        this.powerSupply=Math.round(Number(data[i].power_level)*8.33);  

        if(data[i].gas_leak == 1 || (data[i].ang2_threshold!=null && data[i].ang2_threshold=="ENABLE" && data[i].ang2_lower_limit!=null && Number(data[i].gas_detector)*1000>Number(data[i].ang2_lower_limit)  )){
          value="Red";
          message = "Gas Leak";
          iconUrl=appConfig.imagePath+'redmarker.png';
              if(diffDays>timediff){
              value="Disconnected";
               message = "Gas Leak and Disconnected";
              iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';  
            }
        } 
        else if(data[i].low_gas == 1 || (data[i].ang3_threshold!=null && data[i].ang3_threshold=="ENABLE" && data[i].ang3_lower_limit!=null && Number(data[i].gas_level)*1000<Number(data[i].ang3_lower_limit)  )){
          value="Yellow";
          message = "Low Gas";
          iconUrl=appConfig.imagePath+'yellow.png';
          if(this.powerSupply<75){
            value="Red";
            message = "Low Power Level";
            iconUrl=appConfig.imagePath+'redmarker.png';}
              if(diffDays>timediff){
              message = "Low Gas and Disconnected";
              value="Disconnected";
              iconUrl=appConfig.imagePath+'yellowmarkerdisconnected.png';  
              if(this.powerSupply<75){
                value="Red";
                message = "Low Power Level";
                iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';}
            }
        }
        else{
          value="Green";
          message = "All Good ";
          iconUrl=appConfig.imagePath+'greenmarker.png';
          
           if(this.powerSupply<75){
            value="Red";
            message = "Low Power Level";
            iconUrl=appConfig.imagePath+'redmarker.png';
            if(diffDays>timediff){
              value="Disconnected";
               message = "Low Power Level and Disconnected";
              iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';  
            }
           }
           else if(this.powerSupply>75 && this.powerSupply<90)
           {
             value="Yellow";
             iconUrl=appConfig.imagePath+'yellow.png';
             if(diffDays>timediff){
              message="Disconnected";
              value="Disconnected";
              iconUrl=appConfig.imagePath+'yellowmarkerdisconnected.png';  
            }
           }
           if(this.powerSupply>60)
           {
             value="Green";
             iconUrl=appConfig.imagePath+'greenmarker.png';
              if(diffDays>timediff){
              value="Disconnected";
              message="Disconnected";
              iconUrl=appConfig.imagePath+'greenmarkerdisconnected.png';  
            }
           } 
        }
        //if the diff of current date time and log time is more than 2 days set status as 
        var coordinates = data[i].coordinates;
        var coordinates = coordinates.split(",");
        var lat = coordinates[0];
        var lang = coordinates[1];

        item["lat"] = Number(lat);
        item["lng"] = Number(lang);
        item["label"] = device_id;
        item["value"] = value;
        item["iconUrl"] = iconUrl;
        item["message"] = "Status: "+message;
        item["info"]=false;
        jsonObject.push(item);

        if(i==0){
         this.lat = Number(lat);
         this.lng = Number(lang);      
        }
      }

      var json = JSON.stringify(jsonObject);

      //set json for map loc
      this.someData =JSON.parse(JSON.stringify(jsonObject))
      //this.selectedData = this.someData;

      this.selectedData = this.someData.filter(x => x.value == this.selectedVal);
      if(this.selectedVal=='All')
      {
       this.selectedData = this.someData;
      }

    }, error => {
     console.log("Oooops!"+error);
    });
  }

   someData = 
      [{
		  lat: 51.673858,
		  lng: 7.615982,
		  label: 'Map A',
		  draggable: true,
		  value:'GREEN',
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/green.png",
      message:"",
      info: false
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'Map B',
		  draggable: false,
		  value:'RED',
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/red.png",
      message:"",
      info: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'Map C',
		  draggable: true,
		  value:'YELLOW',
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/yellow.png",
      message:"",
      info: false
	  }] 
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
	iconUrl?: string;
  message?:string;
  info: boolean;
}