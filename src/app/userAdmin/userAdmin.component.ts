import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient){
  }
  ngOnInit(): void {
    var tempObj={};
    // Make the HTTP request:
    this.http.get('http://40.71.199.63:3200/userAdmin').subscribe(data => {
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
}