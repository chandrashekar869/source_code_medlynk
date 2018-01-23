import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { appConfig } from '../app.config';
import * as CryptoJS from 'crypto-js';

@Component({
  moduleId:module.id,
  templateUrl: './userAdmin.component.html',
  styleUrls: ['./userAdmin.component.css']
})
export class userAdminComponent implements OnInit {
  tablecontainer ='tablecontainer';
  title = 'Medlsys';
  tablerow='tablerow';
  tableprop='tableprop';
  results:any[]=[];
  editimg:string;
  delete:string;
  userRole:string;

  constructor(private router: Router,private http: HttpClient,public httpcustom: Http){
  this.userRole=JSON.parse(localStorage.getItem("userRole"));
  this.userRole=this.userRole.trim().replace(" ","").toLowerCase();
  }
  ngOnInit(): void {
    // Make the HTTP request:
    this.editimg = appConfig.imagePath+'edit.png';
    this.delete = appConfig.imagePath+'delete.png';
    var tempObj={};
    this.results=[]; 
    this.http.post(appConfig.apiUrl+'/userAdmin',{data:localStorage.getItem("currentUser")}).subscribe(data => {
      // Read the result field from the JSON response.
 
      for(var key in data){
        if(Number.isInteger(Number(key))){
          tempObj=data[key];
          this.results.push(tempObj);
        }
      }});
  }
  deletefromtable(i){
    if(this.userRole=='subadmin' && this.results[i].role=='Admin'){
      alert("Sub Admins cannot modify or delete an Administrator");
    }
    else{
    var delconfirm=confirm("Are you sure you want to delete:"+this.results[i]["user_name"]);
    if(delconfirm){
      this.httpcustom.post("/delete", {data:this.results[i]}).subscribe(error =>{ console.error(error) });
        location.reload();  
    }
  }
    /*alert("Are you sure");
    this.httpcustom.post("/delete", {data:this.results[i]}).subscribe(error =>{ console.error(error) });
      location.reload();*/
  }

  edit(i){
    if(this.userRole=='subadmin' && this.results[i].role=='Admin'){
      alert("Sub Admins cannot modify or delete an Administrator");
    }else{
    var encrypteddata=CryptoJS.AES.encrypt(JSON.stringify(this.results[i]),new Date().toLocaleDateString()+"AES128").toString();    
    window.localStorage.setItem("clickedItem",encrypteddata);
    this.router.navigate(['./editUser']);}
  }

}