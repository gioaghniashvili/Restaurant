import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket } from '../models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private baseUrl = 'https://restaurant.stepprojects.ge/api/Baskets';

  constructor(private http: HttpClient) {}

  getBasket() {
    return this.http.get<Basket[]>(`${this.baseUrl}/GetAll`);
  }

  addItem(productId: number, quantity: number, price: number) {
    return this.http.post(`${this.baseUrl}/AddToBasket`, {
      productId,
      quantity,
      price
    });
  }

  updateItem(productId: number, quantity: number, price: number) {
    return this.http.put(`${this.baseUrl}/UpdateBasket`, {
      productId,
      quantity,
      price
    });
  }

  removeItem(productId: number) {
    return this.http.delete(`${this.baseUrl}/DeleteProduct/${productId}`);
  }
}
