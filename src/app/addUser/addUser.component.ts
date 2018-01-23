import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { appConfig } from '../app.config';
import {AlertService} from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})
export class addUserComponent {
  name:string;
  model:any={};
  results:any[]=[];
  assigned:any[]=[];
  temp:any[]=[];
  tempassigned:any[]=[];
  title = 'Medlsys';
  roles:{}=[{"name":"User","value":"user"},{"name":"Admin","value":"Admin"},{"name":"Sub Admin","value":"Sub Admin"}];
  role:string;
  errmsg:string;
  select:any;
  selecta:any;
  leftarrow:string;
  rightarrow:string;
  userRole:string;
  constructor(private router: Router,private alertService:AlertService,private http: HttpClient,public httpcustom: Http){
    this.userRole = JSON.parse(localStorage.getItem('userRole'));
    if(this.userRole.toLowerCase().replace(" ","").trim()=="subadmin")
      this.roles=[{"name":"User","value":"User"},{"name":"Sub Admin","value":"Sub Admin"}];

  }

  ngOnInit(): void {
    this.leftarrow = appConfig.imagePath+'leftarrow.jpg';
    this.rightarrow = appConfig.imagePath+'rightarrow.jpg';
    var tempObj={};
    // Make the HTTP request:
    this.http.get(appConfig.apiUrl+'/getDevices').subscribe(data => {
      // Read the result field from the JSON response.
      for(var key in data){
        if(Number.isInteger(Number(key))){
 
          tempObj=data[key];
          this.results.push(tempObj["device_id"]);
        }
      }
    });
  }

onSelectRole(val){
  this.role=val;
}

  onSelect(val){
    var i:any;
    for(i=0;i<=val.length;i++){
      if(val[i]!=undefined)
      this.temp[i]=val[i];
    }
  }
  onSelectassigned(val){
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
            this.httpcustom.post("/addUsers", {data:this.model}).subscribe(data => {
             
              if(data.text()=='DUP_KEY')
                this.alertService.error("User exists.");
              else if(data.text()=='I_ERR')
                this.alertService.error("Oops something went wrong");
              else if(data.text()=='DONE'){
                this.alertService.success(" User registration successful");
                this.router.navigate(['./userAdmin']);
              }
            });
        }
      }


   
}
}