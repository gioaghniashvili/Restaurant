import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpBasket: HttpClient) { }
  addToBasket(productId: number, quantity: number) {
    return this.httpBasket.post('https://restaurant.stepprojects.ge/api/Basket/AddToBasket', { productId, quantity });
  }
  getBasket() {
    return this.httpBasket.get('https://restaurant.stepprojects.ge/api/Baskets/GetAll');
  }
  removeFromBasket(productId: number) {
    return this.httpBasket.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${productId}`);
  }
  updateBasket(productId: number, quantity: number) {
    return this.httpBasket.put('https://restaurant.stepprojects.ge/api/Basket/UpdateBasket', { productId, quantity });
  }
}
