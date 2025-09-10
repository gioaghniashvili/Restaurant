import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) {}


  private errorHandling(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getdata(url : string) {
    return this.http.get(url).pipe(
        catchError(error => {
            console.error('Error fetching data:', error);
            return throwError(() => new Error('Error fetching data, please try again later.'));
        })
    );
  }
  postData(url: string, obj: any) {
    return this.http.post(url, obj).pipe(catchError(this.errorHandling));
  }

}