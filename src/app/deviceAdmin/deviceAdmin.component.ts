import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { appConfig } from '../app.config';

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

  constructor(private router: Router,private http: HttpClient,public httpcustom: Http){
  }
  ngOnInit(): void {
    this.editimg = appConfig.imagePath+'edit.png';
    this.delete = appConfig.imagePath+'delete.png';
    this.setting = appConfig.imagePath+'settings.png';
    var tempObj={};
    // Make the HTTP request:
    this.http.post('http://40.71.199.63:3200/deviceAdmin',{data:localStorage.getItem("currentUser")}).subscribe(data => {
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
        else if(data[i].power_level<3.61 && data[i].low_gas!=null){
          status="Low power";
          color="red";
        }
        else if(data[i].log_time!=null && (currentdate.getTime()-d.getTime())>=60000){
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
    var delconfirm=confirm("Are you sure you want to delete:"+this.results[i]["device_id"]);
    if(delconfirm)
    {
      console.log(this.results[i]);
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
  window.localStorage.setItem("clickedDevice",JSON.stringify(this.results[i]));
  this.router.navigate(['./editDevice']);}

}