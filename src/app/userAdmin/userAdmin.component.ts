import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
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
  constructor(private router: Router,private http: HttpClient,public httpcustom: Http){
  }
  ngOnInit(): void {
    var tempObj={};
    // Make the HTTP request:
    this.http.get('http://localhost:3200/userAdmin').subscribe(data => {
      // Read the result field from the JSON response.
      for(var key in data){
        if(Number.isInteger(Number(key))){
          console.log(data[key]);
          tempObj=data[key];
          this.results.push(tempObj);
          console.log(this.results);
        }
      }
    });
  }
  deletefromtable(i){
    console.log(this.results[i]);
    this.httpcustom.post("/delete", {data:this.results[i]}).subscribe({ error: e => console.error(e) });
    location.reload();
  }
}