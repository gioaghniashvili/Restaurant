import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) {}

  getdata(url : string) {
    return this.http.get(url).pipe(
        catchError(error => {
            console.error('Error fetching data:', error);
            return throwError(() => new Error('Error fetching data, please try again later.'));
        })
    );
  }

}
