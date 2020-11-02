import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OccupancyService } from './occupancy.service';
@Component({
  selector: 'app-occupancy',
  templateUrl: './occupancy.component.html',
  styleUrls: ['./occupancy.component.css']
})
export class OccupancyComponent implements OnInit {
  // DataGrid static Data
  public data = [];
  // Define dataGrid columns
  public columns: SohoDataGridColumn[] = [
    {
      id: '1', name: 'Date', field: 'Date', sortable: true
    },
    {
      id: '2', name: 'Capacity', field: 'Capacity',
      sortable: true
    },
    {
      id: '3', name: 'Occupancy', field: 'Occupancy',
      sortable: true
    }
  ];
  // Chart data
  public lineData = [];
  // Chart xAxis config
  public xAxis = { rotate: -65, ticks: 16 };

  // Chart yAxis config
  public yAxis = {
    ticks: { number: 7 },
    domain: [10, 120]
  };
  // Date Pipe
  public datePipe = new DatePipe('en-US');

  constructor(private occupancyService: OccupancyService) { 
    this.getOccupancyData();

  }

  ngOnInit() {
    // Regroup xAxis data to format Date
    var dataX = this.lineData.map(function (d, i) {
      return d.data.map(function (d2, i2) {
        return d2;
      });
    });
    dataX = [].concat.apply([], dataX);
    dataX.forEach((dataX: any) => dataX.name = this.datePipe.transform(dataX.name, 'dd/MM/yyyy'));
  }
  /**
   * Get Occupancy Data for Chart and Datagrid display
   */
  private getOccupancyData(): void {
    this.occupancyService.getOccupancies().subscribe((result: any) => {
      this.data = result;
    }, error => {
      console.log('error ', error);
    });

    this.occupancyService.getChartData().subscribe((result: any) => {
      this.lineData = result;
    }, error => {
      console.log('error ', error);
    });
  }
}
