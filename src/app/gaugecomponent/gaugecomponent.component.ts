import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleGaugesComponent } from '../google-gauges/google-gauges.component';
import { NavbarService } from '../_services/index';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
selector: 'app-gaugecomponent',
templateUrl: './gaugecomponent.component.html',
styleUrls: ['./gaugecomponent.component.css']
})

export class GaugecomponentComponent implements OnInit {
  //default values
  deviceId ='';
  tankPressure:number = 2.5;
  linePressure:number = 3.9;
  tankLevel:number = 65;
  GasLeak:number = 85;
  isDataAvailable:boolean = false;

  constructor(private route:ActivatedRoute,public nav: NavbarService,public http: Http) { }

    ngOnInit() {
     //get the device id from routing
      this.deviceId = this.route.snapshot.params.deviceId;
      console.log(this.deviceId);
      //check user role and then alter the header
      this.nav.show();
      this.getTestAttributes(this.deviceId);}

   // Gaues values in to put
    public pie_ChartData = [
        ['Label', 'Value'],
        ['Tank Pressure',this.tankPressure]];
    public pie_ChartOptions = {
        max:20,
        width: 400, 
        height: 220,
        redFrom: 15,
        redTo: 20,
        yellowFrom: 10, 
        yellowTo: 15,
        minorTicks: 5
    };

    public pie_ChartData1 = [
        ['Label', 'Value'],
        ['Line Pressure',this.linePressure]];
    public pie_ChartOptions1 = {
        max:20,
        width: 400, 
        height: 220,
        redFrom: 15,
        redTo: 20,
        yellowFrom: 10, 
        yellowTo: 15,
        minorTicks: 5
    };
       public pie_ChartData2 = [
        ['Label', 'Value'],
        ['Tank Level',this.tankLevel]];
    public pie_ChartOptions2 = {
        width: 400, 
        height: 220,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75, 
        yellowTo: 90,
        minorTicks: 5
    };
    public pie_ChartData3 = [
        ['Label', 'Value'],
        ['Gas Leak',this.GasLeak]];
    public pie_ChartOptions3 = {
         width: 400, 
        height: 220,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75, 
        yellowTo: 90,
        minorTicks: 5
    };

getTestAttributes(id:any){
  var link = '/device/gauesInfo';
  var jsonObject =[];
  //var data = JSON.stringify();
  this.http.post(link, {device_id:id})
  .map(res => res.json())
  .subscribe(data => {
  // this.data.response = data;
  console.log(data); 
  for (var i = 0; i < data.length; i++){
    //create json 
    var item = {};
    var tankPressureA =data[i].gas_pressureA;
    console.log(tankPressureA);
    this.tankPressure= Number(tankPressureA) ;
    this.isDataAvailable = true;
  } 
  }, error => {
    console.log("Oooops!"+error);
  });

}

}



