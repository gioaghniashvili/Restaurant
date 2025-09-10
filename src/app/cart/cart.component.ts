import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasketService } from '../services/basket.service';
import { Basket } from '../models/basket';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Basket[] = [];
  isLoading: boolean = false;
  total: number = 0;

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.loadCart();
    this.basketService.getBasket().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  loadCart() {
    this.isLoading = true;
    this.basketService.getBasket().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.isLoading = false;
        this.cartItems = [];
        this.total = 0;
      }
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) =>
      sum + (item.product.price * item.quantity), 0
    );
  }

  updateItem(item: Basket) {
    if (item.quantity < 1) {
      item.quantity = 1;
    }

    this.basketService.updateItem(item.product.id, item.quantity, item.price).subscribe({
      next: () => {
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Errori ar updatdeba:', err);
      }
    });
  }

  removeItem(item: Basket) {
    this.basketService.removeItem(item.product.id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.product.id !== item.product.id);
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error removing item:', err);
      }
    });
  }

  checkout() {
    console.log('Proceeding to checkout with total:', this.total);
  }
}
