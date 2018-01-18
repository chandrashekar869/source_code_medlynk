import { Component,OnInit,OnDestroy } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../_services/alert.service';
import { Chart} from 'angular-highcharts';
import * as Highcharts from 'highcharts';
var mainarray:any=[];
var type:any;
var formatdata='%b %y';
var xscalename="Months";
var thirtydaydata;

declare var google:any;
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})

export class ReportingComponent implements OnDestroy {
  title = 'app';
  heading:any;
  dbdata:any;
  deviceId:any;
  currentDate=new Date();

  select:any;
  customdisabled:boolean=true;
  startDate=this.currentDate.getFullYear()+"-"+this.currentDate.getMonth()+"-"+this.currentDate.getDate();
  endDate=this.currentDate.getFullYear()+"-"+this.currentDate.getMonth()+"-"+this.currentDate.getDate();
  datethirty=new Date();
  err:string="";
  UndefinedOptionValue:any;
  result:any=["Last 24 hours","Last 30 days","Last 1 year","Custom"];
  chart:any;
  ngOnDestroy(){
    mainarray=[];
   }
  constructor(public alert:AlertService,public router:Router,private route:ActivatedRoute,public http: Http){
    
    var data=this.route.snapshot.params.deviceId;
    this.datethirty.setDate(this.datethirty.getDate()-30);
    type=data.split("~")[1];
    this.deviceId=data.split("~")[0];
    this.deviceId = this.deviceId.replace( /:/g, "" );
    if(type=="TL")
      this.heading='Tank Level';
    else if(type=="GL")
      this.heading='Gas Leak';      
    else if(type=="TP")
      this.heading='Tank Pressure';      
    else if(type=="LP")
      this.heading='Line Pressure';      
    else if(type=="meter1")
      this.heading='Meter 1';      
    else if(type=="meter2")
      this.heading='Meter 2';      
    else if(type=="meter3")
      this.heading='Meter 3';      
    else if(type=="meter4")
      this.heading='Meter 4';      
 
    this.http.post('/reporting', {param:type,deviceId:this.deviceId})
    .map(res => res.json())
    .subscribe(data => {
      var temparray;

      for(var i=0;i<data["length"];i++){
        var localdate=new Date(data[i].log_time);
        var newlocaldate=Date.UTC(localdate.getFullYear(),localdate.getMonth()+1,localdate.getDay(),localdate.getHours(),localdate.getMinutes(),localdate.getSeconds());  
        if(type=="TL"){
          temparray=[localdate.getTime(),Number(data[i].gas_level)*20];
        mainarray.push(temparray);
          
      }
      
    
    else if(type=="GL"){
        var gas_detector;
        if(Number(data[i].gas_detector)>4){
          if(new Date(data[i].log_time) >this.datethirty)
          gas_detector=(Number(data[i].gas_detector)-4)*6.25;}
        else{
          gas_detector=Number(data[i].gas_detector)*0;}
        temparray=[localdate.getTime(),gas_detector];
        mainarray.push(temparray);
          }
          else if(type=="TP"){
            temparray=[localdate.getTime(),Number(data[i].tank_pressure)*4];
            mainarray.push(temparray);  
          }
          else if(type=="LP"){
            temparray=[localdate.getTime(),Number(data[i].line_pressure)*4];
            mainarray.push(temparray);
          }
          else if(type=="meter1"){
            temparray=[localdate.getTime(),Number(data[i].meter1)];
            mainarray.push(temparray);
          }
          else if(type=="meter2"){
            temparray=[localdate.getTime(),Number(data[i].meter2)];
            mainarray.push(temparray);
          }
          else if(type=="meter3"){
            temparray=[localdate.getTime(),Number(data[i].meter3)];
            mainarray.push(temparray);
          }
          else if(type=="meter4"){
            temparray=[localdate.getTime(),Number(data[i].meter4)];
            mainarray.push(temparray);
          }
  }
      this.dbdata=mainarray;
      formatdata='%b %y';
    this.drawChart();
    });
  }

drawChart(){
  if(mainarray.length==0)
    this.err="No data present for the selected date interval";
  Highcharts.setOptions({
    global : {
      useUTC : false
  }
  });
  this.chart = new Chart({
    chart: {
      type: 'line'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
      second: '%H:%M:%S',
      minute: '%H:%M',
      hour: '%H:%M',
      day: '%e. %b',
      week: '%e. %b',
      month: '%b \'%y',
      year: '%Y'
      },
      title: {
          text: 'Date'
      },
      labels: {
        formatter: function() {
            return Highcharts.dateFormat(formatdata, this.value);
        }
    }
    },
    yAxis: {
      title: {
          text: this.heading
      },
      min: 0
  },
    title: {
      text: this.heading
    },
    credits: {
      enabled: false
    },
    series: [{
      name: this.heading,
      data: mainarray
    }]
  });

}
onSelect(select){
this.err="";
  var temp=[];
  var date:any=new Date().getTime();
  switch(Number(select)){
  case 0:
  formatdata='%H %M %S';
  for(var i=0;i<mainarray.length;i++){
      //console.log(mainarray[i][0]);  
      if((date-mainarray[i][0])<=86400000){
      temp.push([mainarray[i][0],mainarray[i][1]]);
    }  
    }
    var tempmain=mainarray;
    mainarray=temp;
    this.drawChart();
    mainarray=tempmain;
    this.customdisabled=true;
    break;
  case 1:
  formatdata='%d %b';
  var temp=[];
  this.http.post('/thirtydaydata', {param:type,deviceId:this.deviceId})
  .map(res => res.json())
  .subscribe(data => {
    var temparray;
    for(var i=0;i<data["length"];i++){
      var localdate=new Date(data[i].log_time);
      var newlocaldate=Date.UTC(localdate.getFullYear(),localdate.getMonth()+1,localdate.getDay(),localdate.getHours(),localdate.getMinutes(),localdate.getSeconds());  
      if(type=="TL"){
      temp.push([localdate.getTime(),Number(data[i].gas_level)*20]);
    } 
    else if(type=="GL"){
      var gas_detector;
      if(Number(data[i].gas_detector)>4){
        if(new Date(data[i].log_time) >this.datethirty)
        gas_detector=(Number(data[i].gas_detector)-4)*6.25;}
      else{
        gas_detector=Number(data[i].gas_detector)*0;}
      temp.push([localdate.getTime(),gas_detector]);
      }
      if(type=="TP"){
        temp.push([localdate.getTime(),Number(data[i].tank_pressure)*4]);
      } 
      if(type=="LP"){
        temp.push([localdate.getTime(),Number(data[i].line_pressure)*4]);
      }
      if(type=="meter1"){
        temp.push([localdate.getTime(),Number(data[i].meter1)]);
      }
      if(type=="meter2"){
        temp.push([localdate.getTime(),Number(data[i].meter2)]);
      }
      if(type=="meter3"){
        temp.push([localdate.getTime(),Number(data[i].meter3)]);
      }
      if(type=="meter4"){
        temp.push([localdate.getTime(),Number(data[i].meter4)]);
      } 

}
var tempmain=mainarray;
mainarray=temp;
this.drawChart();
mainarray=tempmain;
this.customdisabled=true;   
});
  break;
  case 2:for(var i=0;i<mainarray.length;i++){
    //console.log(date-mainarray[i][0]);
    formatdata='%b %y';             
      if((date-mainarray[i][0])<=31536000000){
    temp.push([mainarray[i][0],mainarray[i][1]]);
  }  
  }
  var tempmain=mainarray;
  mainarray=temp;
  this.drawChart();
  mainarray=tempmain;
  this.customdisabled=true;
  break;
  case 3:this.customdisabled=false;
}

}
onDateChange(id,date){
var currentDate=new Date(date);
  if(id==0){
   this.startDate=date; 
}
  if(id==1){
  this.endDate=date;
}
if(this.endDate<this.startDate && this.endDate!=this.startDate ){
this.err="End date selected is older than start date";

}
else{
  this.err="";
  var temp=[];
  var endDatemilli=new Date(this.startDate).getTime();
  var startDatemilli=new Date(this.endDate).getTime();
  if(startDatemilli-endDatemilli<86400000){
    formatdata='%H %M ';
    xscalename="Time";
  }
  else if(startDatemilli-endDatemilli>86400000 && startDatemilli-endDatemilli<2592000000){
    formatdata='%d %b';
    xscalename="Date";
  }
  else if(startDatemilli-endDatemilli>2592000000){
    formatdata='%b %y';
    xscalename="Month";
  }
  for(var i=0;i<mainarray.length;i++){
    if(mainarray[i][0]<=startDatemilli ){
    if(mainarray[i][0]>=endDatemilli)
    temp.push([mainarray[i][0],mainarray[i][1]]);
  }  
  }
  if(temp.length==0){
    var localdate=new Date(this.startDate);
    var newlocaldate=Date.UTC(localdate.getFullYear(),localdate.getMonth()+1,localdate.getDay(),localdate.getHours(),localdate.getMinutes(),localdate.getSeconds());  
    this.err="No entries found between "+this.startDate+" and "+this.endDate;
    var tempmain=mainarray;
    mainarray=[[localdate.getTime(),0]];
    this.drawChart();
    mainarray=tempmain;
  }else{
    var tempmain=mainarray;
    mainarray=temp;
    this.drawChart();
    mainarray=tempmain;
  }
}
}
}