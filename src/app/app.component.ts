import { Component, OnInit  } from '@angular/core';
import { DataService } from './data.service';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartType, ChartOptions , Chart} from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

export interface UserList {
  id: number,
  name: string;
  username: string;
  city: string;
  zipcode: number;
  company: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any;
  usercount: number =10;
  breakpoint: number;
  chart: any;
  selected: any ={
    name: '',
    username : '',
    email: ''
  };
  displayedColumns: string[] = ['S NO', 'NAME', 'USERNAME', 'CITY', 'PINCODE', 'COMPANY NAME'];
  ELEMENT_DATA: UserList[];
  percentage: any;
  lengthofUsers= 0;
  latlesszero = 0;
  langlesszero = 0;
  latgreaterzero = 0;
  langgreaterzero = 0;
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.data.getUserList().subscribe(data => {
      this.users = data
      console.log(this.users);
      const ELEMENT_DATA: UserList[] = this.users;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.CountsLatLang(this.users);
      this.latlesszero =this.latlesszero;

      this.percentage = (this.lengthofUsers / 100)*100;
      console.log ( " percentage " + this.latlesszero);
      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: ['Latitude > 0','Latitude < 0', 'Longitude > 0', 'Longitude < 0'],
          datasets: [
            {
              data: [this.latgreaterzero, this.latlesszero, this.langgreaterzero, this.langlesszero],
              backgroundColor: ['rgba(255, 26, 26, 1)','rgba(0, 153, 153, 1)', 'rgba(230, 172, 0, 1)', 'rgba(128, 128, 128, 0.1)'],
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          tooltips:{
            enabled:true
          }
        }
      });

    });
  }

  SelectRow(row){
    console.log(row)
    this.selected = {
      name: row.id,
      username : row.username,
      email: row.email
    };

  }

  CountsLatLang(objList){

    for (var prop in objList) {
      this.lengthofUsers = this.lengthofUsers + 1;
      if( parseFloat(objList[prop]["address"]["geo"]["lat"]) < 0 ){
        this.latlesszero = this.latlesszero + 1;
      }
      if(parseFloat(objList[prop]["address"]["geo"]["lat"]) > 0 ){
        this.latgreaterzero = this.latgreaterzero + 1;
      }
      if(parseFloat(objList[prop]["address"]["geo"]["lng"]) < 0 ){
        this.langlesszero = this.langlesszero + 1;
      }
      if(parseFloat(objList[prop]["address"]["geo"]["lng"]) > 0 ){
        this.langgreaterzero = this.langgreaterzero + 1;
      }

    }
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

}
