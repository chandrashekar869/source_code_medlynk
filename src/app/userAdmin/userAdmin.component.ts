import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { appConfig } from '../app.config';

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

  constructor(private router: Router,private http: HttpClient,public httpcustom: Http){
  }
  ngOnInit(): void {
    // Make the HTTP request:
    this.editimg = appConfig.imagePath+'edit.png';
    this.delete = appConfig.imagePath+'delete.png';
    var tempObj={};
    this.results=[]; 
    this.http.post('http://40.71.199.63:3200/userAdmin',{data:localStorage.getItem("currentUser")}).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
      for(var key in data){
        if(Number.isInteger(Number(key))){
          console.log(data[key]);
          tempObj=data[key];
          this.results.push(tempObj);
          console.log("results",this.results);
        }
      }});
  }
  deletefromtable(i){
    var delconfirm=confirm("Are you sure you want to delete:"+this.results[i]["user_name"]);
    if(delconfirm){
      console.log(this.results[i]);
      this.httpcustom.post("/delete", {data:this.results[i]}).subscribe(error =>{ console.error(error) });
        location.reload();  
    }
    /*alert("Are you sure");
    console.log("after");
    console.log(this.results[i]);
    this.httpcustom.post("/delete", {data:this.results[i]}).subscribe(error =>{ console.error(error) });
      location.reload();*/
  }

  edit(i){
    console.log(this.results[i]);
    window.localStorage.setItem("clickedItem",JSON.stringify(this.results[i]));
    this.router.navigate(['./editUser']);
  }

}