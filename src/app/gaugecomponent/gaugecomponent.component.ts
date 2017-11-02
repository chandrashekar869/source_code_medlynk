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
      /*
      setInterval(() =>{
           this.getGaugeValue(this.deviceId)
        },5000); */
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
            var tankPressureA =data[i].gas_pressureA;
            var linePressureA = data[i].gas_pressureB;
            var tankLevelA = data[i].gas_level;
            var gasLeakA = data[i].gas_detector; 
            //var tankPressureA =9;
            console.log(tankPressureA);
            this.tankPressure= Number(tankPressureA) ;
            this.linePressure = Number(linePressureA);
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
            if(Number(data[i].alarm)==1)
                this.imgAlarm = '../../assets/beaconflashing.gif';
            if(Number(data[i].beacon)==1)
                this.imgBeacon='../../assets/lowgas.gif'; 
            //set powr supply %
            this.powerSupply=Number(data[i].power_level);  
            this.meter1 = data[i].meter1.split(""); 
            this.meter2 = data[i].meter2.split(""); 
            this.meter3 = data[i].meter3.split(""); 
            this.meter4 = data[i].meter4.split(""); 
            this.solenoidArray = data[i].solenoid.split("");
            this.solenoid = this.solenoidArray.map(Number);
            console.log(this.solenoid[0]);

            var today = new Date();
            //converting the log date in date formate
            var date2 = new Date(data[i].log_time);
            console.log(data[i].log_time);
            this.log_date=date2.toLocaleString(); 
            //get the difference between the date in days
            var diff = today.valueOf() - date2.valueOf();
            var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
            
            if(diffDays>2){
            this.imgConnect='../../assets/disconnected.png';  
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
        //chart2.draw(data2, options1);
        /*
        drawGraph(chartOptions,chartType,chartData,ele) {
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            var wrapper;
            wrapper = new google.visualization.ChartWrapper({
              chartType: chartType,
              dataTable:chartData ,
              options:chartOptions || {},
              containerId: ele.id
            });
            wrapper.draw();
          }
        }*/
      /* drawChart1(){
          var data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Tank Pressure', 10.2]
          ]);

          var data1 = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Tank Level', 68]
          ]);

          var data2 = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Gas Leak', 45]
          ]);
          var data3 = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Line Pressure', 12.7],
          ]);

          var options = {
            width: 630, height: 230,
            redFrom: 15, redTo: 20,
            yellowFrom:10, yellowTo: 15,
            minorTicks: 5,
            max : 20
          };

          var options1 = {
            width: 630, height: 230,
            redFrom: 90, redTo: 100,
            yellowFrom:75, yellowTo: 90,
            minorTicks: 5
          };

          var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
          var chart1 = new google.visualization.Gauge(document.getElementById('chart_div1'));
          var chart2 = new google.visualization.Gauge(document.getElementById('chart_div2'));
          var chart3 = new google.visualization.Gauge(document.getElementById('chart_div3'));

          chart.draw(data, options);
          chart1.draw(data1, options1);
          chart2.draw(data2, options1);
          chart3.draw(data3, options1);

          console.log("tank gas_pressureA");
          console.log(this.tankPressure);

          if (this.tankPressure==undefined) {
         console.log("tank gas_pressureA undefine");

          }


          setInterval(function() {
          data.setValue(0, 1,25);
          chart.draw(data, options);
          }, 100);

          setInterval(function() {
          data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
          chart1.draw(data, options);
          }, 5000);

          setInterval(function() {
          data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
          chart2.draw(data, options);
          }, 26000);
      }*/

}



