import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { appConfig } from '../app.config';
import {AlertService} from '../_services/index';
import * as CryptoJS from 'crypto-js';

@Component({
  moduleId:module.id,
  templateUrl: './deviceAdmin.component.html',
  styleUrls: ['./deviceAdmin.component.css']
})

export class deviceAdminComponent implements OnInit {
  tablecontainer ='tablecontainer';
  title = 'Medlsys';
  tablerow='tablerow';
  tableprop='tableprop';
  results:any[]=[];
  status:string;
  editimg:string;
  delete:string;
  setting:string;
  model: any = {};
  display='none';
  id:number;

  constructor(private alert:AlertService,private router: Router,private http: HttpClient,public httpcustom: Http){
  }
  ngOnInit(): void {
    this.editimg = appConfig.imagePath+'edit.png';
    this.delete = appConfig.imagePath+'delete.png';
    this.setting = appConfig.imagePath+'settings.png';
    var tempObj={};
    // Make the HTTP request:
    this.http.post(appConfig.apiUrl+'/deviceAdmin',{data:localStorage.getItem("currentUser")}).subscribe(data => {
      // Read the result field from the JSON response.
      var currentdate=new Date();
      var timediff;
      
      for(var i=0;i<data["length"];i++){
        if(data[i].http_post_interval!='undefined'){
          timediff=Number(data[i].http_post_interval);
          if(timediff >=60 ){
          timediff=timediff;}
        else if(timediff<60 && timediff>=30){
          timediff=3*timediff;}
        else if(timediff>0 && timediff<30){
          timediff=5*timediff;
}
        }
        else{
          data[i].http_post_interval=0;
          timediff=5;
        }
        timediff*=1000;
        console.log("deviceadmin",timediff);
        if(data[i].ang2_threshold=='undefined' || data[i].ang3_threshold=='undefined'){
          data[i].ang2_threshold="DISABLE";
          data[i].ang3_threshold="DISABLE";
          data[i].ang2_lower_limit="20000";
          data[i].ang3_lower_limit="0";
        }
  
        var status="";
        var color="";
        var d=new Date(data[i].server_log_time);
        var log_date_options = { year: '2-digit', month: '2-digit', day: 'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true };
        var display_date=d.toLocaleString("en-IN",log_date_options);
        var diff=currentdate.getTime()-d.getTime();
        if(timediff >= 60000 ){
          diff=diff-50000;
          console.log("greater than diff",diff);
          console.log("server_log_time",d,d.getTime());
          console.log("device_log_time",currentdate,currentdate.getTime());
        }
        if((data[i].gas_leak==1 && data[i].gas_leak!=null) || (data[i].ang2_threshold!=null && data[i].ang2_threshold=="ENABLE" && data[i].ang2_lower_limit!=null && Number(data[i].gas_detector)*1000>Number(data[i].ang2_lower_limit)  ) ){
          status="LEAK";
          color="red";
          if(data[i].log_time!=null && diff>timediff){
            status="LEAK & GSM";
            color="red";
          }
        }
        else if(data[i].low_gas==1 && data[i].low_gas!=null  || (data[i].ang3_threshold!=null && data[i].ang3_threshold=="ENABLE" && data[i].ang3_lower_limit!=null && Number(data[i].gas_level)*1000<Number(data[i].ang3_lower_limit)  )){
          status="GAS";
          color="red";
          if(data[i].log_time!=null && diff>timediff){
            status="GAS & GSM";
            color="red";
          }
        }
        else if(data[i].power_level<9 && data[i].low_gas!=null){
          status="POWER";
          color="red";
          if(data[i].log_time!=null && diff>timediff){
            status="POWER & GSM";
            color="red";
          }
        }
        else if(data[i].log_time!=null && diff>timediff){
          status="GSM";
          color="red";
        }
        else{
          if(data[i].log_time==null){
            status="No Data";
            color="red";
            display_date="";
          }
          else{
          status="Updated";
          color="green";}
        }
        data[i].color=color;
        data[i].device_status=status;
        data[i].display_date=display_date;

        this.results.push(data[i]);
      }
    });
  }
  deletefromtable(i){
    var delconfirm=confirm("Are you sure you want to delete:"+this.results[i]["device_id"]);
    if(delconfirm)
    {
      this.httpcustom.post("/deletedevices", {data:this.results[i],user_id:localStorage.getItem("currentUser")}).subscribe({ error: e => console.error(e) });
      location.reload();  
    }
    /*alert("Are you sure you want to delete the device");
    console.log(this.results[i]);
    this.httpcustom.post("/deletedevices", {data:this.results[i],user_id:localStorage.getItem("currentuser")}).subscribe({ error: e => console.error(e) });
    location.reload();*/
  }
  edit(i){
   /* console.log(this.results[i]);
    
    
  */
  var encrypteddata=CryptoJS.AES.encrypt(JSON.stringify(this.results[i]),new Date().toLocaleDateString()+"AES128").toString();  
  window.localStorage.setItem("clickedDevice",encrypteddata);
  this.router.navigate(['./editDevice']);}
  openModal(id){
     this.display='block'; 
     this.id=id;
  }
  onSubmitModal(){
    if(this.model.I_modalpassword==this.results[this.id].config_password){
      this.model.I_modalpassword="";
      this.onCloseHandled();
      this.alert.success("Please wait");
      this.gotoconfig(this.id);
    }
     else{
      this.model.I_modalpassword="";
      this.onCloseHandled();
      this.alert.error("Invalid password");
    }
  }
onCloseHandled(){
     this.display='none'; 
  }
  gotoconfig(i){
    var encrypteddata=CryptoJS.AES.encrypt(JSON.stringify(this.results[i]),new Date().toLocaleDateString()+"AES128").toString();    
    window.localStorage.setItem("clickedDevice",encrypteddata);
    this.router.navigate(['./config']);      
  }
  navToGauge(i){
    if(this.results[i].log_time==null){
      this.alert.error('No data to display');
    }
    else
    this.router.navigate(['./gauges/:'+this.results[i].device_id]);
  }
}
