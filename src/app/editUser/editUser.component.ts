import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../_services/index';
import { appConfig } from '../app.config';
import * as CryptoJS from 'crypto-js';

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
  roles:{}=[{"name":"User","value":"User"},{"name":"Admin","value":"Admin"},{"name":"Sub Admin","value":"Sub Admin"}];
  rolesub:{}=[{"name":"User","value":"User"},{"name":"Sub Admin","value":"Sub Admin"}];
  
  
  role:string;
  errmsg:string;
  user_details:any;
  selectUndefinedOptionValue:any;
  select:any;
 selecta:any;
   leftarrow:string;
  rightarrow:string;
  userRole:string;
  constructor(private alertService:AlertService,private router: Router,private http: HttpClient,public httpcustom: Http){
    this.userRole = JSON.parse(localStorage.getItem('userRole'))
    if(this.userRole.toLowerCase().trim().replace(" ","")=="subadmin")
      this.roles=this.rolesub;
  }

  ngOnInit(): void {
    this.leftarrow = appConfig.imagePath+'leftarrow.jpg';
    this.rightarrow = appConfig.imagePath+'rightarrow.jpg';
    
    var decrypteddata=CryptoJS.AES.decrypt(localStorage.getItem("clickedItem"),new Date().toLocaleDateString()+"AES128").toString(CryptoJS.enc.Utf8);
    this.http.post(appConfig.apiUrl+"/getUserData",{data:JSON.parse(decrypteddata)}).subscribe(response =>{
    this.user_details=response["user_details"];
    this.model.username=this.user_details.user_name;
      this.model.email=this.user_details.email_id;
      this.model.phone=this.user_details.contact_no;
      this.model.address=this.user_details.address;
      this.model.confirmpassword=this.user_details.password;
      this.model.password=this.user_details.password;
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
    }
  }
  onSelectassigned(val){
    this.tempassigned=[];
    var i:any;
    for(i=0;i<=val.length;i++){
      if(val[i]!=undefined)
      this.tempassigned[i]=val[i];
    }
  }

  insertlist(){
    var i:any;
    var j:any;
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
          else if(i==5 && !this.model.password.toString().match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/)){
            this.errmsg="Password should contain (Letters, Number/SpecialChar and min 8 Chars)";
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
            this.httpcustom.post("/updateUsers", {data:this.model}).subscribe(data => {
              if(data.text()=='DUP_KEY')
                this.alertService.error("User exists.")
              else if(data.text()=='I_ERR')
                this.alertService.error("Oops something went wrong");
              else if(data.text()=='DONE'){
                this.alertService.success("User details successfully");
                this.router.navigate(['./userAdmin']);
              }
            });
            
          
        }
      }

   
}
}