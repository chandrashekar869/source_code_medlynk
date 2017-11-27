import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleGaugesComponent } from '../google-gauges/google-gauges.component';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';

@Component({
selector: 'app-gaugecomponent',
templateUrl: './gaugecomponent.component.html',
styleUrls: ['./gaugecomponent.component.css']
})


export class GaugecomponentComponent implements OnInit {
  //default values
  deviceId ='';
  userId:string;
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
  solenoidtempArray:any;
  backgroundstring:string="white";
  solenoid:any;
  log_date:any;
  cus_name:any;
  display='none';
  devicePassword:string;
  disableSolenoid:boolean;
  controlButton:boolean;
  model: any = {};

  constructor(private route:ActivatedRoute,public http: Http) { 
     //this._element = this.element.nativeElement;
     //google.charts.load('current', {'packages':['corechart']});
     //this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element)
   }

    ngOnInit() {
     //  this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element)
     //get the device id from routing
      this.userId = JSON.parse(localStorage.getItem('currentUser'));
      this.deviceId = this.route.snapshot.params.deviceId;
      console.log(this.deviceId);
      //check user role and then alter the header

      this.getGaugeValue(this.deviceId);

      this.imgAlarm= appConfig.imagePath+'beacongreen.jpg';
      this.imgBeacon= appConfig.imagePath+'beacongreen.jpg';
      this.imgConnect= appConfig.imagePath+'connected.png';
      
      setInterval(() =>{
           this.getGaugeValue(this.deviceId)
        },3000);  
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
            this.GasLeak = Number(gasLeakA)*5;
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
                this.imgAlarm = appConfig.imagePath+'beaconred.png';}
            else{ 
                this.imgAlarm= appConfig.imagePath+'beacongreen.jpg';}    

            if(Number(data[i].low_gas)==1){ 
              this.imgBeacon=appConfig.imagePath+'beaconred.png'; }
            else{ 
               this.imgBeacon=appConfig.imagePath+'beacongreen.jpg';}  
            
            //set powr supply %
            this.powerSupply=Number(data[i].power_level);  
            this.meter1 = data[i].meter1.split(""); 
            this.meter2 = data[i].meter2.split(""); 
            this.meter3 = data[i].meter3.split(""); 
            this.meter4 = data[i].meter4.split(""); 

            this.solenoidtempArray = data[i].log_solenoid.split("");
            this.solenoidtempArray = this.solenoidtempArray.map(Number);
            this.devicePassword=data[i].device_password;
            
            //check for intermediate state
            if(Number(data[i].device_state_updated)==1){
              this.solenoidArray = data[i].control_solenoid.split("");
              this.solenoid = this.solenoidArray.map(Number);
              this.disableSolenoid=true;
              this.controlButton=true;
              this.backgroundstring="#f4dabf";
              this.solenoidtempArray[1] = this.solenoid[1];
              this.solenoidtempArray[2] = this.solenoid[2];
              this.solenoidtempArray[3] = this.solenoid[3];
              this.solenoidtempArray[4] = this.solenoid[4];
              this.solenoidtempArray[5] = this.solenoid[5];
              this.solenoidtempArray[6] = this.solenoid[6];
              console.log("solenoid"+this.solenoid[1]);
              console.log("solenoidtempArray"+this.solenoidtempArray[1]);
            } 
            else {
              this.solenoidArray = data[i].log_solenoid.split("");
              this.solenoid = this.solenoidArray.map(Number);
              this.disableSolenoid=true;
              this.controlButton = false; 
              this.solenoidtempArray[1] = this.solenoid[1];
              this.solenoidtempArray[2] = this.solenoid[2];
              this.solenoidtempArray[3] = this.solenoid[3];
              this.solenoidtempArray[4] = this.solenoid[4];
              this.solenoidtempArray[5] = this.solenoid[5];
              this.solenoidtempArray[6] = this.solenoid[6];
              this.backgroundstring="white";
              console.log("solenoid"+this.solenoid[1]);
            }
            var today = new Date();
            //converting the log date in date formate
            var date2 = new Date(data[i].log_time);
            console.log(data[i].log_time);
            this.log_date=date2.toLocaleString(); 
            //get the difference between the date in days
            var diff = today.valueOf() - date2.valueOf();
            var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
            
            if(diffDays>2){
            this.imgConnect=appConfig.imagePath+'disconnected.png';  
            }
            else{
            this.imgConnect=appConfig.imagePath+'connected.png';
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
  
  handleChange(event ,index){
    console.log("Index: "+index);
    if(this.solenoidtempArray[index] == 0)
       this.solenoidtempArray[index] = 1;
    else
       this.solenoidtempArray[index] = 0;

    console.log('event.target.value ' + this.solenoidtempArray[index]);
    console.log(this.solenoidtempArray[index]);
  }

  openModal(){
       this.display='block'; 
    }
  onCloseHandled(){
       this.display='none'; 
    }

  onSubmitPassword(){
    console.log("Password is :"+ this.model.password);
    if(this.devicePassword==this.model.password){
      this.display='none';
      this.disableSolenoid=false;
    }
    else{
      alert("Password is Invalid");
    }
  }  
  changeControler(){
      var solenoidArray = this.solenoidtempArray.join("").toString();
      var link = '/device/updateSolenoid';
      var jsonObject =[];
    //var data = JSON.stringify();
      this.http.post(link, {device_id:this.deviceId,solenoid:solenoidArray})
      .map(res => res.json())
      .subscribe(data => {
      console.log(data); 
      if(data=="1"){
        this.solenoid=this.solenoidtempArray;
        this.disableSolenoid=true;
        this.controlButton=true;
        this.backgroundstring="#f4dabf";
        console.log(data); 
      }
      },error => {
          console.log("Oooops!"+error);
      });
    }  
 }



