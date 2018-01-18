import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  visible: boolean;
  userProfile:boolean;
  badge_value:any;
  constructor(){
   this.visible = false;
   this.userProfile= true;
    }
  hide() { this.visible = false;this.userProfile= true; }

  logOut(){this.visible = false;this.userProfile= false;}

  show() { this.visible = true;this.userProfile= true; }

  toggle() { this.visible = !this.visible; }
    
  doSomethingElseUseful() { }

  setbadgevalue(badge_value){
    this.badge_value=badge_value;

  }

  getbadgevalue(){
    return this.badge_value;
  }

}