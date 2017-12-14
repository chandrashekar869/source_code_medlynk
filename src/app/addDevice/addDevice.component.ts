import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { NavbarService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './addDevice.component.html',
  styleUrls: ['./addDevice.component.css']
})
export class addDeviceComponent {
  name:string;
  model:any={};
  results:any[]=[];
  title = 'Medlsys';
  roles:string[]=["User","Admin","Sub Admin"];
  role:string;
  errmsg:string;
 select:any;
 selecta:any;
  constructor(private router: Router,public nav: NavbarService,public httpcustom: Http){
  }

  ngOnInit(): void {
    var tempObj={};
    this.nav.show();
    // Make the HTTP request:
  }


    submit(){
      this.errmsg="";
      console.log(this.model);
      this.model.editDevice=false;
      this.model.user_id=localStorage.getItem("currentUser");
      var params=["username","device_id","address","coordinates","loginpassword","configpassword","gsmmobilenumber"];
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
        }
        if(i==params.length-1){
            this.httpcustom.post("/addDevice", {data:this.model}).subscribe({ error: e => console.error(e) });
            this.router.navigate(['./deviceAdmin']);
        }
      }

      console.log(this.model);
   
}
}