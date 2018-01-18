import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import {AlertService} from '../_services/index';
import 'rxjs/add/operator/map';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  device_id:any;
  constructor(public http: Http,private alertService:AlertService){
    var decrypteddata=CryptoJS.AES.decrypt(localStorage.getItem("clickedDevice"),new Date().toLocaleDateString()+"AES128").toString(CryptoJS.enc.Utf8);    
  this.device_id=JSON.parse(decrypteddata).device_id;
  } 
  pages=["home","network","serial","server","slave","analog","datetime","digitalcount","ssl"];
  currentpage="home";
  title = 'app';
  smsMessage:any;
  switchoptions=["ENABLE","DISABLE"];
  selectUndefinedOptionValue:any;
  gsm_mobile_number:any;
  switchoptions2=["on","off"];
  digitalChg=[{"name":"Any Change","value":"ANY"},{"name":"High to Low","value":"HL"},{"name":"Low to High","value":"LH"}];
  netInterfaces=["10 MBps Full Duplex","100 MBps Full Duplex","10 MBps Half Duplex","100 MBps Half Duplex"];
  baudrates=["1200","2400","4800","9600","19200","38400","57600","115200"];
  relay=["Relay 1","Relay 2","Relay 3","Relay 4","Relay 5","Relay 6","Relay 7","Relay 8"];
  databits=["7","8"];
  stopbits=["1","2  "];
  flowcontrol=["NONE","XON-XOFF","RTS-CTS"];
  parity=["None","Even","Odd","Mark","Space"];  
  httpmethods=["GET","POST"];
  digitalChange:"";
  digitalchange1:"";
  digitalchange2:"";
  digitalchange3:"";
  digitalchange4:"";
  digitalchange5:"";
  digitalchange6:"";
  digitalchange7:"";
  digitalchange8:"";  
  pulse_count1:any;
  pulse_count2:any;
  pulse_count3:any;
  pulse_count4:any;
  pulse_count5:any;
  pulse_count6:any;
  pulse_count7:any;
  pulse_count8:any;
  threshold1:any;
  threshold2:any;
  threshold3:any;
  threshold4:any;
  threshold5:any;
  threshold6:any;
  threshold7:any;
  threshold8:any;
  ntp_enable:any;
  http_method:any;
  gsm:any;
  relay_initial_state:any;
  server_connectivity_timeout_related_relay:any;
  time_stamp:any;
  data_backup:any;
  retain_relay_status:any;
  telnet_IAC:any;
  restart_on_loss_link:any;
  defeat_long_ack:any;
  baudrate:any;
  network_dhcp:any;
  network_interface:any;
  event:any;
  model:any={
      home:{
        mac:"",
        fwversion:"",
        productmodel:"",
        bootloader:""
      },
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
        server_path:"",
        connection_inactive_timeout:"",
        defeat_long_ack:"",
        restart_on_loss_link:"",
        telnet_IAC:"",
        retain_relay_status:"",
        data_backup:"",
        time_stamp:"",
        server_connectivity_timeout:"",
        server_connectivity_timeout_related_relay:"",
        relay_initial_state:"OFF",
        relay_next_state_duration:"",
        login_user_id:"",
        login_password:"",
        sfd:"",
        dlm:"",
        packet_try:"",
        response_timeout:"",
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
        ups_query:"",
        http_method:"",
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
      datetime:{
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
      digitalcount:{
        digita1:{
          pluseCount:"",
        pluseCountNum:"",
        setpulsecount:""
      },
      digita2:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
        setpulsecount:""
      },
      digita3:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
        setpulsecount:""
      },
      digita4:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
        setpulsecount:""
      },
      digita5:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
        setpulsecount:""
      },
      digita6:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
        setpulsecount:""
      },
      digita7:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
        setpulsecount:""
      },
      digita8:{
        pluseCount:"",
        digitalChange:"",
        pluseCountNum:"",
        setpulsecount:""
      }                                                   
    }
};

defaultmodel:any={
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
        baud_rate:"9600",
        data_bits:"8",
        parity:"NONE",
        stop_bits:"1",
        flow_control:"NONE",
        character_wait_timeout:"10"
    },
    rs485:{
      baud_rate:"9600",
      data_bits:"8",
      parity:"NONE",
      stop_bits:"1",
      flow_control:"NONE",
      character_wait_timeout:"10"
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
    server_path:"",
    connection_inactive_timeout:"",
    defeat_long_ack:"",
    restart_on_loss_link:"",
    telnet_IAC:"",
    retain_relay_status:"",
    data_backup:"",
    time_stamp:"",
    server_connectivity_timeout:"",
    server_connectivity_timeout_related_relay:"",
    relay_initial_state:"OFF",
    relay_next_state_duration:"",
    login_user_id:"",
    login_password:"",
    sfd:"",
    dlm:"",
    packet_try:"",
    response_timeout:"",
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
    ups_query:"",
    http_method:"",
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
  datetime:{
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
  digitalcount:{
    digita1:{
      pluseCount:"",
    pluseCountNum:"",
    setpulsecount:""
  },
  digita2:{
    pluseCount:"",
    digitalChange:"",
    pluseCountNum:"",
    setpulsecount:""
  },
  digita3:{
    pluseCount:"",
    digitalChange:"",
    pluseCountNum:"",
    setpulsecount:""
  },
  digita4:{
    pluseCount:"",
    digitalChange:"",
    pluseCountNum:"",
    setpulsecount:""
  },
  digita5:{
    pluseCount:"",
    digitalChange:"",
    pluseCountNum:"",
    setpulsecount:""
  },
  digita6:{
    pluseCount:"",
    digitalChange:"",
    pluseCountNum:"",
    setpulsecount:""
  },
  digita7:{
    pluseCount:"",
    digitalChange:"",
    pluseCountNum:"",
    setpulsecount:""
  },
  digita8:{
    pluseCount:"",
    digitalChange:"",
    pluseCountNum:"",
    setpulsecount:""
  }                                                   
}
};
  ngOnInit(): void {
    document.getElementById("tl0").click();
  }
  
  openCity(evt, configName,buttonid) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        document.getElementById('tl'+i).style.background="#f1f1f1";        
      }
      document.getElementById(buttonid).style.background="#fba31e";
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
        document.getElementById(configName).style.display = "block";

        this.currentpage=configName;
        
        this.loadDefault(this.pages.indexOf(this.currentpage));
  try{
        evt.currentTarget.className += " active"; 
      }
      catch(e){
        console.log("first call");
      }
      }
  onSelectNetwork(val,data){
    switch(val){
      case 1:this.model.network.network_interface=data;
      break;
      case 2:this.model.network.dhcp=data;
      break;
    }
  }

  networkcall(){
    var link = '/device/networkConfig';
    this.http.post(link, {obj:this.model,currentpage:this.currentpage,device_id:this.device_id})
    .subscribe(data => {
      if(data.text()=="ERR")
        this.alertService.error("Something went wrong.Try again");
      else if(data.text()=="DONE"){
        this.alertService.success("Configuration updated successfully");
        this.smsMessage = 'block';
      }
    },
      error => {
     console.log("Oooops!"+error);
    });

  }
  
  submitNetwork(){
  this.networkcall(); 
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
  onSelectSlave(id,data){
    this.model.slave.http_method=data;
  }
  submitSerial(){
  this.networkcall();
  }
  submitServer(){
  this.networkcall();
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
      case 1:this.model.digitalcount.digita1.pluseCount=data;
      break;
      case 2:this.model.digitalcount.digita2.pluseCount=data;
      break;
      case 3:this.model.digitalcount.digita3.pluseCount=data;
      break;
      case 4:this.model.digitalcount.digita4.pluseCount=data;
      break;
      case 5:this.model.digitalcount.digita5.pluseCount=data;
      break;
      case 6:this.model.digitalcount.digita6.pluseCount=data;
      break;
      case 7:this.model.digitalcount.digita7.pluseCount=data;
      break;
      case 8:this.model.digitalcount.digita8.pluseCount=data;
      break;
      case 9:this.model.digitalcount.digita9.pluseCount=data;
      break;
      case 10:this.model.digitalcount.digita10.pluseCount=data;
      break;
      case 11:this.model.digitalcount.digita11.pluseCount=data;
      break;
      case 12:this.model.digitalcount.digita12.pluseCount=data;
      break;
    }
  }
  onSelectDigitalCount(val,data)
  {
    switch(val){
      case 1:this.model.digitalcount.digita1.digitalChange=data;
      break;
      case 2:this.model.digitalcount.digita2.digitalChange=data;
      break;
      case 3:this.model.digitalcount.digita3.digitalChange=data;
      break;
      case 4:this.model.digitalcount.digita4.digitalChange=data;
      break;
      case 5:this.model.digitalcount.digita5.digitalChange=data;
      break;
      case 6:this.model.digitalcount.digita6.digitalChange=data;
      break;
      case 7:this.model.digitalcount.digita7.digitalChange=data;
      break;
      case 8:this.model.digitalcount.digita8.digitalChange=data;
      break;
    }
  }

  onSelectNTP(val,data){
    switch(val){
      case 1:this.model.datetime.enableNTP=data;
      break;
    }
  }

  submitAnalog()
  {
    this.networkcall();
  }
  submitDateTime()
  {
    this.networkcall();
  }
  submitSlave()
  {
    this.networkcall();
  }
  prev(val){
    document.getElementById(val).click();
    this.currentpage=this.pages[Number(val.replace("tl",""))];

  }
  next(val){
    document.getElementById(val).click();
    this.currentpage=this.pages[Number(val.replace("tl",""))];
  }
  submitDigitalcount()
  {
    this.networkcall();
  }
  onClose(){
    this.smsMessage = 'none';
 }

  loadDefault(val){
    this.http.post("/getconfig", {currentpage:this.currentpage,device_id:this.device_id})
    .map(res => res.json())
    .subscribe(data => {

      data=data[0];
      this.gsm_mobile_number=data.device_gsm_mobile_number;
      switch(val)
      {
        case 0:
        this.model.home.mac=data.mac_address;
        this.model.home.fwversion=data.firmware_version;
        this.model.home.productmodel=data.product_model;
        this.model.home.bootloader=data.boot_loader;
        break;
        case 1:
        this.defaultmodel.network.ip=data.ip_address.split(".");
        this.defaultmodel.network.subnet=data.netMask.split(".");
        this.defaultmodel.network.dns=data.dns_ip_address.split(".");
        this.defaultmodel.network.gateway=data.gateWay.split(".");
        this.defaultmodel.network.network_interface=data.network_interface;
        this.defaultmodel.network.dhcp=data.dhcp;
        this.model.network=this.defaultmodel.network;
        break;
        case 2:
        this.defaultmodel.serial.rs232.baud_rate=data.rs232_baud_rate;
        this.defaultmodel.serial.rs232.data_bits=data.rs232_data_bits;
        this.defaultmodel.serial.rs232.flow_control=data.rs232_flow_control;
        this.defaultmodel.serial.rs232.character_wait_timeout=data.rs232_c_timeout;
        this.defaultmodel.serial.rs485.baud_rate=data.rs485_baud_rate;
        this.defaultmodel.serial.rs485.data_bits=data.rs485_data_bits;
        this.defaultmodel.serial.rs485.character_wait_timeout=data.rs485_c_timeout;        
        this.model.serial=this.defaultmodel.serial;

        break;
        case 3:
        var indip=data.ipfiltering.split(",");
        for(var i=0;i<indip.length;i++)
          {
            var j=i+1;
            this.defaultmodel.server.ip_filtering["ip"+j]=indip[i].split(".");    
          }
        this.defaultmodel.server.server_connect_waittime=data.server_connect_wait_time;
        this.defaultmodel.server.remote_ip=data.remote_ip;
        this.defaultmodel.server.remote_port_no=data.remote_port_no;
        this.defaultmodel.server.server_path=data.server_path;
        this.defaultmodel.server.connection_inactive_timeout=data.connection_inactive_timeout;
        this.defaultmodel.server.defeat_long_ack=data.defeat_long_ack;
        this.defaultmodel.server.restart_on_loss_link=data.restart_on_loss_of_link;
        this.defaultmodel.server.telnet_IAC=data.telnet_IAC;
        this.defaultmodel.server.retain_relay_status=data.retain_relay_status;
        this.defaultmodel.server.data_backup=data.data_backup;
        this.defaultmodel.server.time_stamp=data.time_stamp;
        this.defaultmodel.server.server_connectivity_timeout=data.server_connectivity_timeout,
        this.defaultmodel.server.server_connectivity_timeout_related_relay=data.server_connectivity_timeout_related_relay,
        this.defaultmodel.server.relay_initial_state=data.Relay_initial_state,
        this.defaultmodel.server.relay_next_state_duration=data.relay_next_state_duration,
        this.defaultmodel.server.login_user_id=data.login_user_id,
        this.defaultmodel.server.login_password=data.login_password,
        this.defaultmodel.server.sfd=data.SFD,
        this.defaultmodel.server.dlm=data.DLM,
        this.defaultmodel.server.packet_try=data.packet_try,
        this.defaultmodel.server.response_timeout=data.response_timeout,
        this.defaultmodel.server.gsm.gsm=data.GSM;
        this.defaultmodel.server.gsm.apn=data.APN;
        this.defaultmodel.server.gsm.user_id=data.gsm_user_id;
        this.defaultmodel.server.gsm.password=data.gsm_password;
        this.model.server=this.defaultmodel.server;
        break;
        case 4:
        this.defaultmodel.slave.http_post_interval=data.http_post_interval;
        this.defaultmodel.slave.unit_id=data.unit_id;
        this.defaultmodel.slave.remote_data_path=data.remote_data_path;
        this.defaultmodel.slave.ups_query=data.ups_query;
        this.defaultmodel.slave.http_method=data.http_method;
        this.model.slave=this.defaultmodel.slave;
        break;
        case 5:
        var analogparams=["lowerLimit","method","offset","relay","threshold","upperLimit"];
        for(var i=0;i<8;i++)
          {
            var j=i+1;
            var params=["ang"+j+"_lower_limit","ang"+j+"_method","ang"+j+"_offset","ang"+j+"_relay","ang"+j+"_threshold","ang"+j+"_upper_limit"];
            for(var k=0;k<analogparams.length;k++){
              this.defaultmodel.analog["analog"+j][analogparams[k]]=data[params[k]];
//              console.log("this.defaultmodel.analog[analog"+j+"]["+analogparams[k]+"]=",data[params[k]]);
            }
          }
          this.defaultmodel.analog.numbers.masterNum=data.master_phone_number;
          for(var i=1;i<=10;i++){
            this.defaultmodel.analog.numbers["num"+i]=data["phone_number_"+i];
          }
          this.model.analog=this.defaultmodel.analog;
        break;
        case 6:
        this.defaultmodel.datetime.enableNTP=data.enable_ntp;
        var indip=data.ntp_server_ip.split(",");
        for(var i=0;i<indip.length;i++){
          this.defaultmodel.datetime.ntpServerIP["ntp"+(i+1)]=indip[i].split("."); 
        }
        this.defaultmodel.datetime.ntpPortNum=data.ntp_port_no;
        this.defaultmodel.datetime.timeZone=data.time_zone;
        this.defaultmodel.datetime.ntpInterval=data.ntp_update_time_interval;
        this.defaultmodel.datetime.rtcDate=data.rtc_current_date.split("T")[0].split("-").reverse().join("/");

        this.defaultmodel.datetime.rtcTime=data.rtc_current_time;
        this.model.datetime=this.defaultmodel.datetime;
        break;
        case 7:
        var params=["digitalChange","pluseCount","pluseCountNum","setpulsecount"];
        for(var i=1;i<=8;i++){
          var dbparams=["digi"+i+"_digital_change","digi"+i+"_pulse_count","digi"+i+"_pulse_count_number","digi"+i+"_set_pulse_count"];
          this.defaultmodel.digitalcount["digita"+i][params[0]]=data[dbparams[0]];
          this.defaultmodel.digitalcount["digita"+i][params[1]]=data[dbparams[1]];
          this.defaultmodel.digitalcount["digita"+i][params[2]]=data[dbparams[2]];
          this.defaultmodel.digitalcount["digita"+i][params[3]]=data[dbparams[3]];
        }
        this.model.digitalcount=this.defaultmodel.digitalcount;
        break;
      }

    },
      error => {
     console.log("Oooops!"+error);
    });
  }

}
