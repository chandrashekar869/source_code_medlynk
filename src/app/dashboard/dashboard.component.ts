import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService,NavbarService } from '../_services/index';
import { Ng4DropdownModule } from 'ng4-material-dropdown';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
   moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	// initial map points or center point on the map and declare values
	title: string = 'My first AGM project';  
	lat: number = 12.98164225;
	lng: number = 77.59287357;
	levelNum:number;
	mapID: string = 'TERRAIN';
  User_Id:string;
  userId:string = '12345';
  select:any;
  selectUndefinedOptionValue:any;

	ngOnInit(){
		this.nav.show();
		this.getDeviceAttributes(this.userId);


  setInterval(() =>{
          this.getDeviceAttributes(this.userId)
        },15000);  
 	}  


  constructor(private router: Router,public nav: NavbarService,public http: Http){}
  moduleName = 'Select'; 


	clickedMarker(marker:marker, index:number){
		//this functoin is called when marker is clicked 
		console.log('Clicked Marker:'+ marker.label+' at index'+index);
		 this.router.navigate(['./gauges/:'+marker.label]);
	}//clickedMarker
	mouseOver(infoWindow, gm) {
		//on mouse over event , it opens up the info-window
		infoWindow.open();
	}//mouseOver
	mouseOut(infoWindow, gm) {
		//on mouse out event , close info-window
		infoWindow.close();
	}//mouseOut

  levels:Array<Object> = [
      {num: 0, name: "AA"},
      {num: 1, name: "BB"}
  ];

    toNumber(){
    this.levelNum = +this.levelNum;
    console.log(this.levelNum);
  }

	options =['Red', 'Yellow', 'Green','Disconnected','All']
	selected;
	selectedData;

//onSelect whch map to be shown on map by default its All
  onSelect(val){
    console.log(val);
    this.selectedData = this.someData.filter(x => x.value == val)
    if(val=='All')
    {
     this.selectedData = this.someData;
    }
  }

//on select of device , center the tip point and show the info window 
  onSelected(val){
    console.log(val);
    for (var i = 0; i < this.someData.length; i++){
    // look for the entry with a matching `code` value
    if (this.someData[i].label == val){
       this.lat = this.someData[i].lat;
       this.lng = this.someData[i].lng;
       console.log(this.someData[i].label);
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
        var diff = today.valueOf() - date2.valueOf();
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
        //comment the console.log after done with testing
        console.log("Differe in days is "+ diffDays);
        //deivce id
        var device_id = data[i].device_id;
        var value ;
        var iconUrl;
        //check all conditions if alarm is 1 set value as RED like vice  and for 
        //disconnected check with log_time and current date time
        if(data[i].gas_leak == 1){
          value="Red";
          iconUrl='../../assets/red-pin.png';
        } 
        else if(data[i].low_gas == 1){
          value="Yellow";
          iconUrl='../../assets/yellow-pin.png';
        }
        else{
          value="Green";
          iconUrl='../../assets/green-pin.png';
        }
        //if the diff of current date time and log time is more than 2 days set status as 
        if(diffDays>2){
          value="Disconnected";
          iconUrl='../../assets/redcrossmarker.png'; 	
        }

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
      this.selectedData = this.someData;

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
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/green.png"
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'Map B',
		  draggable: false,
		  value:'RED',
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/red.png"
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'Map C',
		  draggable: true,
		  value:'YELLOW',
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/yellow.png"
	  }] 
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
	iconUrl?: string;
}