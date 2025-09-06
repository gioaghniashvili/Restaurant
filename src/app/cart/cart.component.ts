import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { Basket } from '../models/basket';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  isLoading: boolean = false;
  cartItems: Basket[] = [];
  total: number = 0;

  constructor(private cartService: BasketService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.isLoading = true;
    this.cartService.getBasket().subscribe({
      next: (res: any) => {
        // Normalize items to ensure name, price, quantity exist
        this.cartItems = this.normalizeItems(res);
        this.calculateTotal();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading basket:', err);
        this.cartItems = [];
        this.total = 0;
        this.isLoading = false;
      }
    });
  }

  normalizeItems(res: any): Basket[] {
    // If the basket items already contain name/price, return as is
    // Otherwise, enrich them from localStorage
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    return localCart.map((item: any) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name || 'Unknown Product',
        image: item.image || ''
      };
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  updateItem(item: Basket) {
    // Update quantity in localStorage
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const found = localCart.find((i: any) => i.productId === item.productId);
    if (found) found.quantity = item.quantity;
    localStorage.setItem('cart', JSON.stringify(localCart));
    this.calculateTotal();
  }

  removeItem(item: Basket) {
    // Remove from localStorage and array
    let localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    localCart = localCart.filter((i: any) => i.productId !== item.productId);
    localStorage.setItem('cart', JSON.stringify(localCart));
    this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
    this.calculateTotal();
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.total = 0;
  }
  checkout() {
    alert('Checkout functionality is not implemented yet.');
  }


}
