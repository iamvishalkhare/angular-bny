import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { HttpService } from '../../services/http.service';
import { ISenators } from '../../interfaces/senators';
import { DataSource } from '@angular/cdk/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource: Array<ISenators> = [];
  displayTable: boolean;
  displayProgressBar: boolean;
  lineData: any;
  pieData: any;
  showGraphs: boolean;
  displayedColumns: string[] = ['name', 'description', 'office', 'party', 'state', 'edit'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpservice: HttpService,
    public dialog: MatDialog) { }

  ngOnInit() { }

  clickOnHome() {
    this.displayProgressBar = true;
    this.showGraphs = false;
    this.httpservice._fetchData().subscribe(res => {
      this.dataSource = _.castArray();
      _.forEach(res.objects, function (value) {
        const pushVar = {
          id: value.person.cspanid,
          name: value.person.firstname + ' ' + value.person.lastname,
          description: value.description,
          office: value.extra.office,
          party: value.party,
          state: value.state,
        };
        this.dataSource.push(pushVar);
      }.bind(this));
      this.displayProgressBar = false;
      this.displayTable = true;
      this.httpservice.displayData = new MatTableDataSource(this.dataSource);
      this.httpservice.displayData.sort = this.sort;
    });
  }
  openDialog(element: ISenators) {
    this.dialog.open(DialogComponent, {
      data: {
        id: element.id,
        name: element.name,
        description: element.description,
        office: element.office,
        party: element.party,
        state: element.state,
      }
    });
  }

  clickOnGraph() {
    this.displayTable = false;
    this.httpservice._fetchLineData().subscribe(res => {
      console.log(res);
      const labelLine = [];
      const dataLine = [];
      _.forEach(res, function(value) {
        labelLine.push(value.date);
        dataLine.push(value.value);
      });
      this.lineData = {
        labels: _.reverse(labelLine),
        datasets: [
          {
            label: 'India\'s population year by year',
            data: _.reverse(dataLine),
            fill: false,
            borderColor: '#4bc0c0'
          }
        ]
      };
    });

    this.httpservice._fetchPieData().subscribe(res => {
      const labelPie = [];
      const dataPie = [];
      _.forEach(res, function(value) {
        labelPie.push(value.name);
        dataPie.push(value.value);
      });

      this.pieData = {
        labels: labelPie,
        datasets: [
            {
                data: dataPie,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };
    });
    this.showGraphs = true;
  }
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'editDialog.html',
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private httpservice: HttpService) { }

  save(id: number) {
    for (let i = 0; i <= this.httpservice.displayData.data.length; i++) {
      if (this.httpservice.displayData.data[i].id === id) {
        this.httpservice.displayData.data[i].name = this.data.name;
        this.httpservice.displayData.data[i].description = this.data.description;
        this.httpservice.displayData.data[i].office = this.data.office;
        this.httpservice.displayData.data[i].party = this.data.party;
        this.httpservice.displayData.data[i].state = this.data.state;
        break;
      }
    }
  }
}
