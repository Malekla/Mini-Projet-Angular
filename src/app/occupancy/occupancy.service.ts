import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OccupancyService {

  constructor(private httpClient: HttpClient) { }

    /**
   * Get  Chart Data
   */
  public getChartData(): Observable<any> {
    return this.httpClient.get<any>('assets/fake-data/chart-data.json');
  }

    /**
   * Get Occupancy list
   */
  public getOccupancies(): Observable<any> {
    return this.httpClient.get<any>('assets/fake-data/dataGrid-data.json');
  }

}
