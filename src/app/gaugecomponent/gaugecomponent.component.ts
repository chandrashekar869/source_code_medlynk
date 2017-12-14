import { Component,Input, OnInit,ElementRef ,OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';
declare var google:any;
declare var googleLoaded:any;


@Component({
selector: 'app-gaugecomponent',
templateUrl: './gaugecomponent.component.html',
styleUrls: ['./gaugecomponent.component.css']
})

export class GaugecomponentComponent implements OnInit,OnDestroy{
  //default values
  public _element:any;
  @Input('chartType') public chartType:string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('chartData') public chartData: Object;
  deviceId ='';
  gsm_mobile_number='';
  userId:string;
  userName:string;
  userRole:string;
  tankPressure:number = 0;
  linePressure:number = 0;
  tankLevel:number = 0;
  GasLeak:number = 0;
  powerSupply:Number;
  isDataAvailable:boolean = false;
  imgAlarm:string;
  imgBeacon:string;
  imgConnect:string;
  meter1:string[] =["0","0","0","0","0","0","0","0"];
  meter2:string[] =["0","0","0","0","0","0","0","0"];
  meter3:string[] =["0","0","0","0","0","0","0","0"];
  meter4:string[] =["0","0","0","0","0","0","0","0"];
  solenoidArray:any[]=[1,1,1,1,1,1,1,1];
  solenoidtempArray:any[]=[1,1,1,1,1,1,1,1];
  solenoidColor:any[]=["white","white","white","white","white","white","white","white"];	
  backgroundstring:string="white";
  solenoid:any[]=[1,1,1,1,1,1,1,1];
  log_date:any;
  cus_name:any;
  display='none';
  smsMessage='none';
  devicePassword:string;
  disableSolenoid:boolean;
  controlButton:boolean;
  interval:any;
  model: any = {};
  controlsValue:boolean=true;
  cursorPointer:string='not-allowed';

  constructor(public router:Router,private route:ActivatedRoute,public http: Http,public element: ElementRef) {
  this._element = this.element.nativeElement;
  }

  ngOnInit() {
   //get the device id from routing
    this.userId = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = JSON.parse(localStorage.getItem('userName'));
	this.userRole = JSON.parse(localStorage.getItem('userRole'));
    this.deviceId = this.route.snapshot.params.deviceId;
    console.log(this.deviceId);
    this.getGaugeValue(this.deviceId);
    this.imgAlarm= appConfig.imagePath+'beacongreen.jpg';
    this.imgBeacon= appConfig.imagePath+'beacongreen.jpg';
    this.imgConnect= appConfig.imagePath+'connected.png';
    this.drawGraph(this.tankPressure,this.linePressure,this.tankLevel,this.GasLeak);
    //google.charts.load('current', {'packages':['corechart']});
    this.interval = setInterval(() =>{
         this.getGaugeValue(this.deviceId)
      },30000); 
    }
  //OnDestroy
   ngOnDestroy(){
    clearInterval(this.interval);
    console.log("OnDestroy called");
   }
   // Gauges values
    
      getGaugeValue(id:string){
      var link = '/device/gaugesInfo';
      var jsonObject =[];
    //var data = JSON.stringify();
      this.http.post(link, {device_id:id,user_id:this.userId})
      .map(res => res.json())
      .subscribe(data => {
       console.log(data); 
          
          for (var i = 0; i < data.length; i++){
          var tankPressureA =data[i].tank_pressure;
          var linePressureA = data[i].line_pressure;
          var tankLevelA = data[i].gas_level;
          var gasLeakA = data[i].gas_detector; 
          //var tankPressureA =9;
          console.log(tankPressureA);
          this.tankPressure= Math.round((Number(tankPressureA)*4)* 10)/10 ;
          this.linePressure = Math.round((Number(linePressureA)*4)* 10)/10 ;
          this.tankLevel = Math.round(Number(tankLevelA)*20);
          if(Number(gasLeakA)>4){
          this.GasLeak = Math.round((Number(gasLeakA)-4)*6.25);}
          else
          this.GasLeak = 0;
          //this.tankPressure= tankPressureA ;
          console.log("Tank pressure : "+this.tankPressure);

          // remove this code once meter logic is added in backend side
          //set powr supply %
            this.powerSupply=Math.round(Number(data[i].power_level)*8.33);  
            this.meter1 = ("00000"+data[i].meter1).split(""); 
            this.meter2 = ("00000"+data[i].meter2).split(""); 
            this.meter3 = ("00000"+data[i].meter3).split(""); 
            this.meter4 = ("00000"+data[i].meter4).split(""); 

            this.solenoidtempArray = data[i].log_solenoid.split("");
            this.solenoidtempArray = this.solenoidtempArray.map(Number);
            this.devicePassword=data[i].device_password;
          
			this.solenoidArray = data[i].log_solenoid.split("");
            this.solenoid = this.solenoidArray.map(Number);
          //check for intermediate state
          if(Number(data[i].device_state_updated)==1){
            this.solenoidArray = data[i].control_solenoid.split("");
            this.solenoid = this.solenoidArray.map(Number);

            this.disableSolenoid=true;
            this.controlButton=true;
            //this.backgroundstring="#f4dabf";
            this.controlsValue=true;
            this.cursorPointer='not-allowed';

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
            this.solenoidColor=["white","white","white","white","white","white","white","white"];
            this.disableSolenoid=true;
            this.controlButton = false; 
            this.controlsValue=false;
            this.cursorPointer='not-allowed';
            //check for role 
            if(this.userRole.toLowerCase()=='user')  
            this.controlButton=true;

            this.solenoidtempArray[1] = this.solenoid[1];
            this.solenoidtempArray[2] = this.solenoid[2];
            this.solenoidtempArray[3] = this.solenoid[3];
            this.solenoidtempArray[4] = this.solenoid[4];
            this.solenoidtempArray[5] = this.solenoid[5];
            this.solenoidtempArray[6] = this.solenoid[6];
            //this.backgroundstring="white";
            console.log("solenoid"+this.solenoid[1]);
          }
          
          this.drawGraph(this.tankPressure,this.linePressure,this.tankLevel,this.GasLeak);

          var today = new Date();
          //converting the log date in date formate
          var date2 = new Date(data[i].log_time);
          //console.log(log_date);
          this.log_date=date2.toLocaleString(); 
          //get the difference between the date in days
          var diff = today.getTime() - date2.getTime();
          console.log("difference between the date in days: "+diff);
          // var diffDays = Math.ceil(diff / (60000)); 
          //console.log("difference between the date in days in minutes: "+diffDays);

                    //check for alarm and becon values
          if(Number(data[i].gas_leak)==1 || this.GasLeak>10 ){
              this.imgAlarm = appConfig.imagePath+'beaconred.png';}
          else{ 
              this.imgAlarm= appConfig.imagePath+'beacongreen.jpg';}    

          if(Number(data[i].low_gas)==1 || this.tankLevel < 20){ 
            this.imgBeacon=appConfig.imagePath+'beaconred.png';}
          else{ 
             this.imgBeacon=appConfig.imagePath+'beacongreen.jpg';}  
          
          if(diff>60000){
          this.imgConnect=appConfig.imagePath+'disconnected.png';  
          }
          else{
          this.imgConnect=appConfig.imagePath+'connected.png';
          }
          // console.log(diffDays);
          this.cus_name = data[i].customer_name;
          this.gsm_mobile_number = data[i].gsm_mobile_number;


       } //for loop
      }, error => {
        console.log("Oooops!"+error);
      });
  }   
  
  //method called when Solenoid is changed
  handleChange(event ,index){
    console.log("Index: "+index);
    if(this.solenoidtempArray[index] == 0)
       this.solenoidtempArray[index] = 1;
    else
       this.solenoidtempArray[index] = 0;

	if(this.solenoidtempArray[index]!=this.solenoid[index])
    this.solenoidColor[index]="blue";
    else
    this.solenoidColor[index]="white";

    console.log('event.target.value ' + this.solenoidtempArray[index]);
    console.log(this.solenoidtempArray[index]);
  }
 
 //function to call pop up for device password
  openModal(){
    	this.model= {};
       this.display='block'; 
    }
  onCloseHandled(){
       this.display='none'; 
    }

//called on submit of device password
  onSubmitPassword(){
    console.log("Password is :"+ this.model.password);
    if(this.devicePassword==this.model.password){
      this.display='none';
      this.disableSolenoid=false;
      this.cursorPointer='default';
    }
    else{
      alert("Password is Invalid");
    }
  }  

  //onClose 
  onClose(){
     this.smsMessage = 'none';
  }

//get the changed data of solenoid 
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
        //this.backgroundstring="#f4dabf";
		this.controlsValue=true;
        console.log(data); 
        this.smsMessage = 'block';
      }
      },error => {
          console.log("Oooops!"+error);
      });
    }
  
    goToHistorical(clicked_gauge){
      console.log("Clicked");
      this.router.navigate(['/reporting/:'+this.deviceId+"~"+clicked_gauge]);
    }  

      drawGraph (tankPressure,linePressure,tankLevel,GasLeak){

      google.charts.setOnLoadCallback(drawChart);
      google.charts.load('current', {'packages':['gauge']});
      function drawChart() {
        var tankPressureData = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['TP (BAR)',tankPressure]

        ]);
        var linePressureData = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['LP (PSIG) ',linePressure]
        ]);
        var tankLevelData = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['TL (%)',tankLevel]

        ]);
        var gasLeakData = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['GL (%)',GasLeak]

        ]);
        var tankPressureoptions = {
            max:20,
            width: 400, 
            height: 220,
            redFrom: 15,
            redTo: 20,
            yellowFrom: 10, 
            yellowTo: 15,
            minorTicks: 10
        };
        var linePressureoptions = {
            max:20,
            width: 400, 
            height: 220,
            redFrom: 15,
            redTo: 20,
            yellowFrom: 10, 
            yellowTo: 15,
            minorTicks: 10
        };
        var tankLeveloptions = {
            width: 400, 
            height: 220,
            redFrom: 0,
            redTo: 10,
            yellowFrom: 10, 
            yellowTo: 20,
            minorTicks: 5
        };
        var gasLeakoptions = {
            width: 400, 
            height: 220,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75, 
            yellowTo: 90,
        minorTicks: 5
        };
        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
        var chart1 = new google.visualization.Gauge(document.getElementById('chart_div1'));
        var chart2 = new google.visualization.Gauge(document.getElementById('chart_div2'));
        var chart3 = new google.visualization.Gauge(document.getElementById('chart_div3'));
        chart.draw(tankPressureData, tankPressureoptions);
        chart1.draw(linePressureData, linePressureoptions);
        chart2.draw(tankLevelData, tankLeveloptions);
        chart3.draw(gasLeakData, gasLeakoptions);                
      }
    }

 }
