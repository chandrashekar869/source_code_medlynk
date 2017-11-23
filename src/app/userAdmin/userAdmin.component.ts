import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import {NavbarService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
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
  constructor(private router: Router,public nav: NavbarService,private http: HttpClient,public httpcustom: Http){
  }
  ngOnInit(): void {
    // Make the HTTP request:
    this.nav.show();
    var tempObj={};
    this.results=[]; 
    this.http.post('http://localhost:4040/userAdmin',{data:localStorage.getItem("currentuser")}).subscribe(data => {
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
    console.log("before");
    alert("Are you sure");
    console.log("after");
    console.log(this.results[i]);
    this.httpcustom.post("/delete", {data:this.results[i]}).subscribe(error =>{ console.error(error) });
      location.reload();
  }

  edit(i){
    console.log(this.results[i]);
    window.localStorage.setItem("clickedItem",JSON.stringify(this.results[i]));
    this.router.navigate(['./editUser']);
  }

}