import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket } from '../models/basket';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private baseUrl = 'https://restaurant.stepprojects.ge/api/Baskets';

  constructor(private http: HttpClient) {}

  private errorHandling(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getBasket() {
    return this.http.get<Basket[]>(`${this.baseUrl}/GetAll`).pipe(catchError(this.errorHandling));
  }

  addItem(productId: number, quantity: number, price: number) {
    return this.http.post(`${this.baseUrl}/AddToBasket`, {
      productId,
      quantity,
      price
    }).pipe(catchError(this.errorHandling));
  }

  updateItem(productId: number, quantity: number, price: number) {
    return this.http.put(`${this.baseUrl}/UpdateBasket`, {
      productId,
      quantity,
      price
    }).pipe(catchError(this.errorHandling));
  }

  removeItem(productId: number) {
    return this.http.delete(`${this.baseUrl}/DeleteProduct/${productId}`).pipe(catchError(this.errorHandling));
  }
}
