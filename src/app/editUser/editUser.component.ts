import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {NavbarService } from '../_services/index';
@Component({
  moduleId: module.id,
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class editUserComponent {
  name:string;
  model:any={};
  results:any[]=[];
  assigned:any[]=[];
  temp:any[]=[];
  tempassigned:any[]=[];
  title = 'Medlsys';
  roles:string[]=["User","Admin","Sub Admin"];
  role:string;
  errmsg:string;
  user_details:any;
  select:any;
 selecta:any;
  constructor(private router: Router,public nav: NavbarService,private http: HttpClient,public httpcustom: Http){
  }

  ngOnInit(): void {
    this.nav.show();
    console.log("from editUser");
    this.http.post("http://40.71.199.63:3200/getUserData",{data:JSON.parse(localStorage.getItem("clickedItem"))}).subscribe(response =>{
    this.user_details=response["user_details"];
    this.model.username=this.user_details.user_name;
      this.model.email=this.user_details.email_id;
      this.model.phone=this.user_details.contact_no;
      this.model.address=this.user_details.address;
      this.role=this.user_details.role;
      var non_assigned_device_list:any[]=[];
      response["non_assigned_device_list"].map(function(val){
          non_assigned_device_list.push(val.device_id);
      });
      this.results=non_assigned_device_list;
      var assigned_device_list:any[]=[];
      response["user_device_list"].map(function(val){
          assigned_device_list.push(val.device_id);
      });
      this.assigned=assigned_device_list;
    });
    var tempObj={};
  }

onSelectRole(val){
  this.role=val;
}

  onSelect(val){
    this.temp=[];
    var i:any;
    for(i=0;i<=val.length;i++){
      if(val[i]!=undefined)
      this.temp[i]=val[i];
      console.log(this.temp);
    }
  }
  onSelectassigned(val){
    this.tempassigned=[];
    var i:any;
    for(i=0;i<=val.length;i++){
      if(val[i]!=undefined)
      this.tempassigned[i]=val[i];
      console.log(this.tempassigned);
    }
  }

  insertlist(){
    var i:any;
    var j:any;
    console.log(this.temp);
    for(i=0;i<=this.temp.length;i++){
      if(this.temp[i]!=undefined && this.assigned.indexOf(this.temp[i])==-1){
        this.assigned.push(this.temp[i]);
        var index=this.results.indexOf(this.temp[i],0);
        if(index>-1)
          this.results.splice(index,1);
        }
      }
      this.temp=[];
      }
    
    deletelist(){
      var i:any;
      var j:any;
      for(i=0;i<=this.tempassigned.length;i++){
        if(this.tempassigned[i]!=undefined && this.results.indexOf(this.tempassigned[i])==-1){
          this.results.push(this.tempassigned[i]);
          var index=this.assigned.indexOf(this.tempassigned[i],0);
          if(index>-1)
            this.assigned.splice(index,1);
          }
        }
        this.tempassigned=[];
    }
    submit(){
   this.model.role=this.role;
      this.model.assigned=this.assigned;
      this.model.user_id=this.user_details.user_id;
      this.errmsg="";
      var params=["username","email","phone","role","address","password","confirmpassword","assigned"];
      for(var i=0;i<params.length;i++){
        if(!this.model.hasOwnProperty(params[i])){
          this.errmsg="Fill field "+params[i];
          break;
        }
        else{
          if(this.model[params[i]]==undefined){
            this.errmsg="* Fill field "+params[i];
            break;
          }
          else if(i==2 && this.model.phone.length<10){
            this.errmsg="* Enter a valid phone number";
            break;
          }
          else if(i==6){
            if(this.model.password!=this.model.confirmpassword)
              {
                this.errmsg="* Passwords do not match";
                break;
              }
          }
        }
        if(i==params.length-1){
          this.model.user_id=this.user_details.user_id;
            this.httpcustom.post("/updateUsers", {data:this.model}).subscribe({ error: e => console.error(e) });
            this.router.navigate(['./userAdmin']);
          
        }
      }

      console.log(this.model);
   
}
}