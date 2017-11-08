import { Component,Input, OnInit } from '@angular/core';
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
  tankPressure:number = 4;
  linePressure:number = 3.9;
  tankLevel:number = 65;
  GasLeak:number = 85;
  powerSupply:Number;
  isDataAvailable:boolean = false;
  public _element:any;
  imgAlarm:string;
  imgBeacon:string;
  imgConnect:string;
  meter1:any;
  meter2:any;
  meter3:any;
  meter4:any;
  solenoidArray:any;
  solenoid:any;
  log_date:any;
  cus_name:any;
  display='none';
  model: any = {};
  
  constructor(private route:ActivatedRoute,public nav: NavbarService,public http: Http) { 
     //this._element = this.element.nativeElement;
    //  google.charts.load('current', {'packages':['corechart']});
     //this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element)
   }

    ngOnInit() {
     //  this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element)
     //get the device id from routing
      this.deviceId = this.route.snapshot.params.deviceId;
      console.log(this.deviceId);
      //check user role and then alter the header
      this.nav.show();
      this.getGaugeValue(this.deviceId)
      this.imgAlarm='../../assets/offRed.jpg';
      this.imgBeacon='../../assets/offgaslow.jpg';
      this.imgConnect='../../assets/connected.jpg';
      
      setInterval(() =>{
           this.getGaugeValue(this.deviceId)
        },150000);  
    }

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
    getGaugeValue(id:string){
      var link = '/device/gaugesInfo';
      var jsonObject =[];
    //var data = JSON.stringify();
      this.http.post(link, {device_id:id})
      .map(res => res.json())
      .subscribe(data => {
      // this.data.response = data;
      console.log(data); 
            for (var i = 0; i < data.length; i++){
            var tankPressureA =data[i].tank_pressure;
            var linePressureA = data[i].line_pressure;
            var tankLevelA = data[i].gas_level;
            var gasLeakA = data[i].gas_detector; 
            //var tankPressureA =9;
            console.log(tankPressureA);
            this.tankPressure= Number(tankPressureA)*4 ;
            this.linePressure = Number(linePressureA)*4;
            this.tankLevel = Number(tankLevelA);
            this.GasLeak = Number(gasLeakA);
            //this.tankPressure= tankPressureA ;
            console.log("Tank pressure : "+this.tankPressure);
            this.isDataAvailable = true;

            this.pie_ChartData = [
              ['Label', 'Value'],
              ['Tank Pressure',this.tankPressure]];
            this.pie_ChartOptions = {
              max:20,
              width: 400, 
              height: 220,
              redFrom: 15,
              redTo: 20,
              yellowFrom: 10, 
              yellowTo: 15,
              minorTicks: 5
           };
           this.pie_ChartData1 = [
              ['Label', 'Value'],
              ['Line Pressure',this.linePressure]];
           this.pie_ChartOptions1 = {
              max:20,
              width: 400, 
              height: 220,
              redFrom: 15,
              redTo: 20,
              yellowFrom: 10, 
              yellowTo: 15,
              minorTicks: 5
           };
          this.pie_ChartData2 = [
              ['Label', 'Value'],
              ['Tank Level',this.tankLevel]];
          this.pie_ChartOptions2 = {
              width: 400, 
              height: 220,
              redFrom: 0,
              redTo: 10,
              yellowFrom: 10, 
              yellowTo: 20,
              minorTicks: 5
           };
          this.pie_ChartData3 = [
              ['Label', 'Value'],
              ['Gas Leak',this.GasLeak]];
          this.pie_ChartOptions3 = {
               width: 400, 
              height: 220,
              redFrom: 90,
              redTo: 100,
              yellowFrom: 75, 
              yellowTo: 90,
              minorTicks: 5
          };
            //this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element)
            //check for alarm and becon values
            if(Number(data[i].gas_leak)==1){
                this.imgAlarm = '../../assets/beaconflashing.gif';}
            else{ 
                this.imgAlarm='../../assets/offRed.jpg';}    

            if(Number(data[i].low_gas)==1){ 
              this.imgBeacon='../../assets/lowgas.gif'; }
            else{ 
               this.imgBeacon='../../assets/offgaslow.jpg';}  
            
            //set powr supply %
            this.powerSupply=Number(data[i].power_level);  
            this.meter1 = data[i].meter1.split(""); 
            this.meter2 = data[i].meter2.split(""); 
            this.meter3 = data[i].meter3.split(""); 
            this.meter4 = data[i].meter4.split(""); 

            //check for intermediate state
            if(Number(data[i].device_state_updated)==1){
            this.solenoidArray = data[i].control_solenoid.split("");
            this.solenoid = this.solenoidArray.map(Number);
            console.log(this.solenoid[0]);
            } else {
            this.solenoidArray = data[i].log_solenoid.split("");
            this.solenoid = this.solenoidArray.map(Number);
            console.log(this.solenoid[0]);}
            var today = new Date();
            //converting the log date in date formate
            var date2 = new Date(data[i].log_time);
            console.log(data[i].log_time);
            this.log_date=date2.toLocaleString(); 
            //get the difference between the date in days
            var diff = today.valueOf() - date2.valueOf();
            var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
            
            if(diffDays>2){
            this.imgConnect='../../assets/disconnected.jpg';  
            }
            else{
              this.imgConnect='../../assets/connected.jpg';
            }
            console.log(diffDays);
            this.cus_name = data[i].customer_name;
         } //for loop
        }, error => {
          console.log("Oooops!"+error);
        });
      }      

  elements= [
    false,
    true,
    false,
  ];
  
  handleChange(val: boolean, index: number){
    console.log("Index: "+index);
    console.log("Val:  "+val);
    this.elements[index] = !val;
  }

   openModal(){
       this.display='block'; 
    }
   onCloseHandled(){
       this.display='none'; 
    }

  onSubmitPassword(){
    console.log("Password is :"+ this.model.password);
    this.display='none'; 
    }
      
}



