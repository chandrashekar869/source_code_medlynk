import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(public http: Http){
  
  } 
  digitalchange1:any;digitalchange2:any;digitalchange3:any;digitalchange4:any;digitalchange5:any;digitalchange6:any;digitalchange7:any;digitalchange8:any;digitalchange9:any;digitalchange10:any;digitalchange11:any;digitalchange12:any;event:any;pulse_count7:any;network_interface:any;network_dhcp:any;document:any;defeat_long_ack:any;restart_on_loss_link:any;telnet_IAC:any;retain_relay_status:any;
  pulse_count1:any;pulse_count2:any;pulse_count3:any;pulse_count4:any;pulse_count5:any;pulse_count6:any;pulse_count8:any;pulse_count9:any;pulse_count10:any;pulse_count11:any;pulse_count12:any;
  threshold8:any;threshold7:any;threshold6:any;threshold5:any;threshold4:any;threshold3:any;threshold2:any;threshold1:any;
  ntp_enable:any;data_backup:any;time_stamp:any;server_connectivity_timeout_related_relay:any;relay_initial_state:any;gsm:any;
  http_method:any;onSelectSlave:any;
  title = 'app';
  switchoptions=["Enable","Disable"];
  switchoptions2=["on","off"];
  digitalChg=["Any Change","High to Low","Low to High"];
  netInterfaces=["10 MBps Full Duplex","100 MBps Full Duplex","10 MBps Half Duplex","100 MBps Half Duplex"];
  baudrate=["1200","2400","4800","9600","19200","38400","57600","115200"];
  relay=["relay1","relay2","relay3","relay4","relay5","relay6","relay7","relay8"];
  databits=["7","8"];
  stopbits=["1","2  "];
  flowcontrol=["None","XON-XOFF","RTS-CTS"];
  parity=["None","Even","Odd","Mark","Space"];  
  httpmethods=["GET","POST"];
  model:any={
    network:
    {
      ip:[],
      subnet:[],
      gateway:[],   
      dns:[],
      network_interface:"",
      dhcp:""
    },
    serial:{
      rs232:{
          baud_rate:"",
          data_bits:"",
          parity:"",
          stop_bits:"",
          flow_control:"",
          character_wait_timeout:""
      },
      rs485:{
        baud_rate:"",
        data_bits:"",
        parity:"",
        stop_bits:"",
        flow_control:"",
        character_wait_timeout:""
      }
    },
    server:{
      ip_filtering:
      {
        ip1:[],
        ip2:[],
        ip3:[],
        ip4:[],
        ip5:[]
      },
      server_connect_waittime:"",
      remote_ip:"",
      remote_port_no:"",
      connection_inactive_timeout:"",
      defeat_long_ack:"",
      restart_on_loss_link:"",
      telnet_IAC:"",
      retain_relay_status:"",
      data_backup:"",
      time_stamp:"",
      server_connectivity_timeout:"",
      server_connectivity_timeout_related_relay:"",
      relay_initial_state:"",
      relay_next_state_duration:"",
      login_user_id:"",
      login_password:"",
      sfd:"",
      dlm:"",
      gsm:{
        gsm:"",
        apn:"",
        user_id:"",
        password:""
      }
    },
    slave:{
      http_post_interval:"",
      unit_id:"",
      remote_data_path:"",
      server_path:"",
      ups_query:"",
      http_method:"",
      modbus_slave:{
        modbus_slave1:{
          slaveId:"",
          functionId:"",
          regStartingAdd:"",
          noRegRead:"",
          modbusFilePth:"",
        },
        modbus_slave2:{
          slaveId:"",
          functionId:"",
          regStartingAdd:"",
          noRegRead:"",
          modbusFilePth:"",
        },
         modbus_slave3:{
          slaveId:"",
          functionId:"",
          regStartingAdd:"",
          noRegRead:"",
          modbusFilePth:"",
        },
        modbus_slave4:{
          slaveId:"",
          functionId:"",
          regStartingAdd:"",
          noRegRead:"",
          modbusFilePth:"",
        },
        modbus_slave5:{
          slaveId:"",
          functionId:"",
          regStartingAdd:"",
          noRegRead:"",
          modbusFilePth:"",
        },
        modbus_slave6:{
          slaveId:"",
          functionId:"",
          regStartingAdd:"",
          noRegRead:"",
          modbusFilePth:"",
        }                                       
      }
    },
    analog:{
      analog1:{
        offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog2:{
        offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog3:{
        offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog4:{
        offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog5:{
        offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      }, 
      analog6:{
        offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog7:{
        offset:"",
        threshold:"",
        upperLimit:"",
        lowerLimit:"",
        method:"",
        relay:"" 
      },
      analog8:{
        offset:"",
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
    },
    digitalCount:{
      digita1:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },
      digita2:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },
      digita3:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },
      digita4:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },
      digita5:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },
      digita6:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },
      digita7:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },
      digita8:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      }, 
       digita9:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      }, 
      digita10:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      }, 
      digita11:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },
      digita12:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
      },                                                   
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
    }
  }

  submitNetwork(){
    var link = '/device/networkConfig';
    this.http.post(link, {obj:this.model})
    .map(res => res.json())
    .subscribe(data => {

    },
      error => {
     console.log("Oooops!"+error);
    });
   console.log(this.model); 
  }//submitNetwork




  onSelectSerial(val,data){
    switch(val){
      case 1:this.model.serial.rs232.baud_rate=data;
      break;
      case 2:this.model.serial.rs232.data_bits=data;
      break;
      case 3:this.model.serial.rs232.parity=data;
      break;
      case 4:this.model.serial.rs232.stop_bits=data;
      break;
      case 5:this.model.serial.rs232.flow_control=data;
      break;
      case 6:this.model.serial.rs485.baud_rate=data;
      break;
      case 7:this.model.serial.rs485.data_bits=data;
      break;
      case 8:this.model.serial.rs485.parity=data;
      break;
      case 9:this.model.serial.rs485.stop_bits=data;
      break;
    }
  }
  submitSerial(){
    console.log(this.model.serial);
  }
  submitServer(){
    console.log(this.model.server);
  }
  onSelectServer(val,data){
    switch(val){
      case 1:this.model.server.defeat_long_ack=data;
      break;
      case 2:this.model.server.restart_on_loss_link=data;
      break;
      case 3:this.model.server.telnet_IAC=data;
      break;
      case 4:this.model.server.retain_relay_status=data;
      break;
      case 5:this.model.server.data_backup=data;
      break;
      case 6:this.model.server.time_stamp=data;
      break;
      case 7:this.model.server.server_connectivity_timeout_related_relay=data;
      break;
      case 8:this.model.server.relay_initial_state=data;
      break;
      case 9:this.model.server.gsm.gsm=data;
      break;
    }
  }

  onSelectThreshold(val,data)
  {
    switch(val){
      case 1:this.model.analog.analog1.threshold=data;
      break;
      case 2:this.model.analog.analog2.threshold=data;
      break;
      case 3:this.model.analog.analog3.threshold=data;
      break;
      case 4:this.model.analog.analog4.threshold=data;
      break;
      case 5:this.model.analog.analog5.threshold=data;
      break;
      case 6:this.model.analog.analog6.threshold=data;
      break;
      case 7:this.model.analog.analog7.threshold=data;
      break;
      case 8:this.model.analog.analog8.threshold=data;
      break;
    }
  }
  onSelectPluseCount(val,data)
  {
    switch(val){
      case 1:this.model.digitalCount.digita1.pluseCount=data;
      break;
      case 2:this.model.digitalCount.digita2.pluseCount=data;
      break;
      case 3:this.model.digitalCount.digita3.pluseCount=data;
      break;
      case 4:this.model.digitalCount.digita4.pluseCount=data;
      break;
      case 5:this.model.digitalCount.digita5.pluseCount=data;
      break;
      case 6:this.model.digitalCount.digita6.pluseCount=data;
      break;
      case 7:this.model.digitalCount.digita7.pluseCount=data;
      break;
      case 8:this.model.digitalCount.digita8.pluseCount=data;
      break;
      case 9:this.model.digitalCount.digita9.pluseCount=data;
      break;
      case 10:this.model.digitalCount.digita10.pluseCount=data;
      break;
      case 11:this.model.digitalCount.digita11.pluseCount=data;
      break;
      case 12:this.model.digitalCount.digita12.pluseCount=data;
      break;
    }
  }
  onSelectDigitalCount(val,data)
  {
    switch(val){
      case 1:this.model.digitalCount.digita1.digitalChange=data;
      break;
      case 2:this.model.digitalCount.digita2.digitalChange=data;
      break;
      case 3:this.model.digitalCount.digita3.digitalChange=data;
      break;
      case 4:this.model.digitalCount.digita4.digitalChange=data;
      break;
      case 5:this.model.digitalCount.digita5.digitalChange=data;
      break;
      case 6:this.model.digitalCount.digita6.digitalChange=data;
      break;
      case 7:this.model.digitalCount.digita7.digitalChange=data;
      break;
      case 8:this.model.digitalCount.digita8.digitalChange=data;
      break;
      case 9:this.model.digitalCount.digita9.digitalChange=data;
      break;
      case 10:this.model.digitalCount.digita10.digitalChange=data;
      break;
      case 11:this.model.digitalCount.digita11.digitalChange=data;
      break;
      case 12:this.model.digitalCount.digita12.digitalChange=data;
      break;
    }
  }

  onSelectNTP(val,data){
    switch(val){
      case 1:this.model.date_time.enableNTP=data;
      break;
    }
  }

  submitAnalog()
  {
    console.log(this.model); 
  }
  submitDateTime()
  {
    console.log(this.model); 
  }
  submitSlave()
  {
    console.log(this.model);
  }
  prev(val){
    document.getElementById(val).click();
  }
  next(val){
    document.getElementById(val).click();
  }
  submitDigitalcount()
  {
    console.log(this.model);
  }

}
