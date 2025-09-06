import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpCategory: HttpClient ) { }

  getCategories() {
    return this.httpCategory.get('https://restaurant.stepprojects.ge/api/Categories/GetAll');
  }
  getcategoryById(id: number) {
    return this.httpCategory.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`);
  }

}
