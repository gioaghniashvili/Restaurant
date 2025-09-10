import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'https://restaurant.stepprojects.ge/api/Categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.baseUrl}/GetAll`)
  }


}
