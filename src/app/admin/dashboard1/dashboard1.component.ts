import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import * as Highcharts from 'highcharts';
import WOW from 'wow.js';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {
  Highcharts = Highcharts;
  pieChartData:any[]=[];
  chartOptions: any;
  chartOptions2: any;
  years: number[] = [];
  filteredData: any[] = [];

  constructor(private httpservice: ApiService) {}

  ngOnInit() {
    this.fetchData();
    
    const wow = new WOW.WOW({
      boxClass: 'wow', // default
      animateClass: 'animate__animated', 
      offset: 100, 
      mobile: true,
      live: true 
    });
    wow.init();  
  }

  fetchData():void{
    this.httpservice.getAnnualProduction().subscribe((data)=>{
      this.pieChartData = data;
      this.years = [...new Set(this.pieChartData.map(item => item.year))];
      this.filteredData = this.pieChartData.filter(item => item.year === this.years[0]);
      this.updateChart(this.filteredData);
      this.columnChart(this.filteredData)
    })
  }

  onYearChange(event: any) {
    const selectedYear = +event.target.value;  
    this.filteredData = this.pieChartData.filter(item => item.year === selectedYear);
    this.updateChart(this.filteredData);
    this.columnChart(this.filteredData);
  }

  updateChart(data:any) {
    const chartData = data.map((item:any) => ({
      name: item.category,
      y: item.value
    }));

    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Category Distribution'
      },
      series: [
        {
          name: 'Value',
          data: chartData
        }
      ]
    };
  }

  columnChart(data:any[]){
    this.chartOptions2 = {
      chart:{
        type: 'column'
      },
      title:{
        text: 'Yearly Data'
      },
      xAxis:{
        categories: data.map((item)=> item.category),
        title:{
          text:'Category'
        }
      },
      yAxis: {
        title: {
          text: 'Value',
        },
      },
      series:[
        {
          name: 'Value',
          data: data.map((item)=> item.value)
        }
      ]
      
    }   
  }


}
