import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../_services/index';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public nav: NavbarService) {  }

  ngOnInit() {

  }
}
