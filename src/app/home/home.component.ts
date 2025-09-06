import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category';
import { Product } from '../models/products';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { Basket } from '../models/basket';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule],
    styleUrl: './home.component.scss',
    templateUrl: './home.component.html',
    providers: [CategoryService, ProductService]
})
export class HomeComponent {

  constructor(
      private categoryService: CategoryService,
      private productService: ProductService
  )   { }
    imageURL: string = '';
    cart: Basket[] = [];
    categories: Category[] = [];
    products: Product[] = [];
    selectedCategoryId: number | null = null;
    spiciness! : number;
    nuts= false;
    vegetarian= false;
  ngOnInit() {
        this.fetchCategories();
        this.fetchProducts();
  }
  fetchCategories() {
      this.categoryService.getCategories().subscribe((data: any) => {
          this.categories = data;
      });
  }
  fetchProducts() {
      this.productService.getdata('https://restaurant.stepprojects.ge/api/Products/GetAll').subscribe((data: any) => {
  this.products = data;
});
  }
  
filterBtn() {
  this.productService.getdata(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegetarian=${this.vegetarian}&nuts=${this.nuts}${this.spiciness != null ? '&spiciness=' + this.spiciness : ''}`
  ).subscribe((data: any) => {
    console.log(data);
    this.products = data;
  }, (error) => {
    console.error('Error fetching data:', error);
  });
}


  resetFilters() {
       this.productService.getdata('https://restaurant.stepprojects.ge/api/Products/GetAll').subscribe((data: any) => {
            this.products = data;
    })

}



  addToCart(product: Product) {
     const cart: Basket[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.productId === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const newItem: Basket = {
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        };
        cart.push(newItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));      
  }


  getProductsByCategory(categoryId: number): Product[] {
    return this.products.filter(product => product.categoryId === categoryId);
  }

filterByCategory(categoryId: number) {
  const url = categoryId === 0
      ? 'https://restaurant.stepprojects.ge/api/Products/GetFiltered'
      : `https://restaurant.stepprojects.ge/api/Products/GetFiltered?categoryId=${categoryId}`;

  this.productService.getdata(url).subscribe(
    (data: any) => {
      this.products = data;
      console.log(this.products);
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  );
}



}