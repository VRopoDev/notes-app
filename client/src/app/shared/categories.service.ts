import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class CategoriesService {

  categories: Category[] = new Array<Category>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/categories');
  }
        
  add(category: Category) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json',);
    return this.http.post<Category>('http://localhost:3000/api/category/', category, {headers: headers}).subscribe
    (category => {console.log("Add request successfull")});;
  }

}