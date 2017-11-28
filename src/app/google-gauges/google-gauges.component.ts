import {Directive,ElementRef,Input,OnInit,OnDestroy} from '@angular/core';
declare var google:any;

@Directive({
  selector: '[GoogleChart]'
})
export class GoogleGaugesComponent implements OnInit,OnDestroy {

public _element:any;
  @Input('chartType') public chartType:string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('chartData') public chartData: Object;
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
    console.log("containerId is :"+ this._element);
  }
  ngOnInit() {
    this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element);
    setInterval(() =>{
      google.charts.load('current', {'packages':['corechart']});
        setInterval(() =>{
          this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element)
        },0);
      },0
    );
  }
  drawGraph (chartOptions,chartType,chartData,ele) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var wrapper;
      wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable:chartData ,
        options:chartOptions || {},
        containerId: ele.id
      });
      wrapper.draw();
    }
  }
  
  ngOnDestroy() { 

    }

}
