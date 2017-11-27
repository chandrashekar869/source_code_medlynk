import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {NavbarService } from '../_services/index';
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
  constructor(private router: Router,public nav: NavbarService,private http: HttpClient,public httpcustom: Http){
  }
  ngOnInit(): void {
    this.nav.show();
    var user_id=1123;
    localStorage.setItem("currentuser","1");
    var tempObj={};
    // Make the HTTP request:
    this.http.post('http://localhost:4040/deviceAdmin',{data:localStorage.getItem("currentuser")}).subscribe(data => {
      // Read the result field from the JSON response.
      var currentdate=new Date();
      for(var i=0;i<data["length"];i++){
        var status="";
        var color="";
        var d=new Date(data[i].log_time);
        var display_date=d.toLocaleString();
        if(data[i].gas_leak==1 && data[i].gas_leak!=null){
          status="Gas leak";
          color="red";
        }
        else if(data[i].low_gas==1 && data[i].low_gas!=null){
          status="Low gas";
          color="red";
        }
        else if(data[i].power_level<20 && data[i].low_gas!=null){
          status="Low power";
          color="red";
        }
        else if(data[i].log_time!=null && (currentdate.getTime()-d.getTime())>=172800000){
          status="Disconnected";
          color="red";
        }
        else{
          if(data[i].log_time==null){
            status="No data recieved.";
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
        console.log(status);
        this.results.push(data[i]);
      }
      console.log(this.results);
      console.log(data);
    });
  }
  deletefromtable(i){
    alert("Are you sure you want to delete the device");
    console.log(this.results[i]);
    this.httpcustom.post("/deletedevices", {data:this.results[i],user_id:localStorage.getItem("currentuser")}).subscribe({ error: e => console.error(e) });
    location.reload();
  }
  edit(i){
    console.log(this.results[i]);
    window.localStorage.setItem("clickedDevice",JSON.stringify(this.results[i]));
    this.router.navigate(['./editDevice']);
  }
}