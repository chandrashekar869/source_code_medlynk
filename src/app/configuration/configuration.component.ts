import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  title = 'app';
  switchoptions=["enable","disable"];
  netInterfaces=["10 MBps Full Duplex","100 MBps Full Duplex","10 MBps Half Duplex","100 MBps Half Duplex"];
  model:any={
    network:
    {
      ip:{
          nip1:"",
          nip2:"",
          nip3:"",
          nip4:""
         },
      subnet:{
          snm1:"",
          snm2:"",
          snm3:"",
          snm4:""
      },
      gateway:{
        gw1:"",
        gw2:"",
        gw3:"",
        gw4:""
      },   
      dns:{
        dns1:"",
        dns2:"",
        dns3:"",
        dns4:""
      },
      network_interface:"",
      dhcp:""
    },
    analog:{
      analog1:{
        Offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog2:{
        Offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog3:{
        Offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog4:{
        Offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog5:{
        Offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      }, 
      analog6:{
        Offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog7:{
        Offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog8:{
        Offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      numbers:{
        masterNum:"",
        num1:"",
        num2:"",
        num3:"",
        num4:"",
        num5:"",
        num6:"",
        num7:"",
        num8:"",
        num9:"",
        num10:""
      }                  
    },
    date_time:{
      enableNTP:"",
      ntpServerIP:{
      ntp1:[],
      ntp2:[],
      ntp3:[]      
      },
      ntpPortNum:"",
      timeZone:"",
      ntpInterval:"",
      rtcDate:"",
      rtcTime:""
    }

};

  ngOnInit(): void {
    document.getElementById("tl0").click();
  }
  
  openCity(evt, configName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
        document.getElementById(configName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  onSelectNetwork(val,data){
    switch(val){
      case 1:this.model.network.network_interface=data;
      break;
      case 2:this.model.network.dhcp=data;
      break;
      case 3:this.model.date_time.enableNTP=data;
      break;

    }
  }
  submitNetwork(){
   console.log(this.model); 
  }

  submitAnalog()
  {
    console.log(this.model); 
  }
  submitDateTime()
  {
    console.log(this.model); 
  }

}
