import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  displayData: any;
  constructor(private http: Http) { }

  _fetchData() {
    const headers = new Headers();
    let toReceive = '';
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://www.govtrack.us/api/v2/role?current=true&role_type=representative&limit=10',
      { headers: headers }).pipe(retry(3), map((res: Response) => toReceive = res.json())
      );
  }
  _fetchLineData() {
    const headers = new Headers();
    let toReceive = '';
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4200/assets/population.json',
      { headers: headers }).pipe(retry(3), map((res: Response) => toReceive = res.json())
      );
  }

  _fetchPieData() {
    const headers = new Headers();
    let toReceive = '';
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4200/assets/industries.json',
      { headers: headers }).pipe(retry(3), map((res: Response) => toReceive = res.json())
      );
  }
}
