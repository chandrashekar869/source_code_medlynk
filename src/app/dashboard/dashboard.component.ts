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
   console.log("OnDestroy called in DashboardComponent");
   clearInterval(this.interval);
  }

  constructor(private router: Router,public http: Http,public nav:NavbarService){
    //get the local user id
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

	clickedMarker(marker:marker, index:number){
		//this functoin is called when marker is clicked 
		console.log('Clicked Marker:'+ marker.label+' at index'+index);
		this.router.navigate(['./gauges/:'+marker.label]);
	}//clickedMarker

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
    console.log(val);
    this.selectedVal = val;
    this.selectedData = this.someData.filter(x => x.value == val)
    if(val=='All')
    {
     this.selectedData = this.someData;
    }
  }

//on select of device , center the tip point and show the info window 
  onSelected(val){
    console.log("select data is :"+ val)
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
    //var data = JSON.stringify();
    console.log("id : "+id);
    this.http.post(link, {user_id:id})
    .map(res => res.json())
    .subscribe(data => {
    // this.data.response = data;
    console.log(data); 
    for (var i = 0; i < data.length; i++){
        var item = {};

        console.log(data[i].alarm);
        console.log(data[i].device_id);
        var today = new Date();
        //converting the log date in date formate
        var date2 = new Date(data[i].log_time);
        //get the difference between the date in days
        var diffDays = today.getTime() - date2.getTime();
        // var diffDays = Math.ceil(diff / (60000)); 
        //comment the console.log after done with testing
        console.log("Differe in days is "+ diffDays);
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

        if(data[i].gas_leak == 1 || this.GasLeak>10){
          value="Red";
          message = "Gas Leak";
          iconUrl=appConfig.imagePath+'redmarker.png';
              if(diffDays>60000){
              value="Disconnected";
               message = "Gas Leak and Disconnected";
              iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';  
            }
        } 
        else if(data[i].low_gas == 1 || this.tankLevel < 20){
          value="Yellow";
          message = "Low Gas";
          iconUrl=appConfig.imagePath+'yellow.png';
              if(diffDays>60000){
              message = "Low Gas and Disconnected";
              value="Disconnected";
              iconUrl=appConfig.imagePath+'yellowmarkerdisconnected.png';  
            }
        }
        else{
          value="Green";
          message = "All Good ";
          iconUrl=appConfig.imagePath+'greenmarker.png';
          
           if(this.powerSupply<30){
            value="Red";
            message = "Low Power Level";
            iconUrl=appConfig.imagePath+'redmarker.png';
            if(diffDays>60000){
              value="Disconnected";
               message = "Low Power Level and Disconnected";
              iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';  
            }
           }
           else if(this.powerSupply>30 && this.powerSupply<60)
           {
             value="Yellow";
             iconUrl=appConfig.imagePath+'yellow.png';
             if(diffDays>60000){
              message="Disconnected";
              value="Disconnected";
              iconUrl=appConfig.imagePath+'yellowmarkerdisconnected.png';  
            }
           }
           if(this.powerSupply>60)
           {
             value="Green";
             iconUrl=appConfig.imagePath+'greenmarker.png';
              if(diffDays>60000){
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
        console.log("lat"+lat+"lang"+lang);
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
      console.log("JSON OBJECT:"+jsonObject);
      var json = JSON.stringify(jsonObject);
      console.log("JSON OBJECT:"+json);
      //set json for map loc
      this.someData =JSON.parse(JSON.stringify(jsonObject))
      //this.selectedData = this.someData;
      console.log("select value :"+this.selectedVal);
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