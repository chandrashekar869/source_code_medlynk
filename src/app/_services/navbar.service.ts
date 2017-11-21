import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  visible: boolean;
  userProfile:boolean;

  constructor(){
   this.visible = false;
   this.userProfile= true; }

  hide() { this.visible = false;this.userProfile= true; }

  logOut(){this.visible = false;this.userProfile= false;}

  show() { this.visible = true;this.userProfile= true; }

  toggle() { this.visible = !this.visible; }

  doSomethingElseUseful() { }

}