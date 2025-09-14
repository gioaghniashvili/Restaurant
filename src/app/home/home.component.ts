import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category';
import { Product } from '../models/products';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { Basket } from '../models/basket';
import { BasketService } from '../services/basket.service';
import Swal from 'sweetalert2';
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
      private basketService: BasketService,
      private categoryService: CategoryService,
      private productService: ProductService
  )   {}
    searchTerm: string = '';
    imageURL: string = '';
    cart: Basket[] = [];
    categories: Category[] = [];
    products: Product[] = [];
    selectedCategoryId: number | null = null;
    spiciness! : number;
    nuts= false;
    vegetarian= false;
    isFiltered = false;
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
  
  liveSearch() {
    this.isFiltered = true;
    this.products = this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (this.searchTerm === '') {
      this.fetchProducts();
      this.isFiltered = false;
    }
  }
 
filterBtn() {
    this.selectedCategoryId = 0;
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
      this.selectedCategoryId = 0;
       this.productService.getdata('https://restaurant.stepprojects.ge/api/Products/GetAll').subscribe((data: any) => {
       this.products = data;
      this.vegetarian = false;
      this.nuts = false;
      this.spiciness = Number(null);
      console.log(this.products)
    })
 
}
getProductsByCategory(categoryId: number){
    return this.products.filter(product => product.categoryId === categoryId);
  }
 
 
filterByCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
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
 
addToCart(product: Product) {
  if (!localStorage.getItem("token")) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Please log in to add items to your cart!',
      confirmButtonText: 'Go to Login'
    }).then(() => {
      window.location.href = "/login";
    });
    return;
  }
 
  this.basketService.getBasket().subscribe(cartItems => {
    let existingItem = cartItems.find(item => item.product.id === product.id);
 
    if (existingItem) {
      let updatedQty = existingItem.quantity + 1;
      this.basketService.updateItem(product.id, updatedQty, updatedQty * product.price)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${product.name} quantity updated in cart.`,
            timer: 700,
            showConfirmButton: false
          });
        });
    }
    else {
      this.basketService.addItem(product.id, 1, product.price)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${product.name} added to cart.`,
            timer: 700,      
            showConfirmButton: false
          });
        });
    }
  });
}
 
 
 
 
}