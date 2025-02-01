import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  loggedObj: any = {
    custId: 0,
    name: '',
    mobileNo: '',
    password: ''
  };
  addProductSubject = new Subject<boolean>();
  totalAmount: number = 0;

  constructor(private http: HttpClient) { }
  getAllProducts():Observable<any> {
    return this.http.get<any>('https://freeapi.miniprojectideas.com/api/amazon/GetAllProducts/');
  }
  getAllCategories(): Observable<any[]>{
    return this.http.get<any[]>('https://freeapi.miniprojectideas.com/api/amazon/GetAllCategory');
  }
  getAllProductsByCategoryId(id:number):Observable<any>{
    return this.http.get<any>('https://freeapi.miniprojectideas.com/api/amazon/GetAllProductsByCategoryId?id='+id);
  }
  register(obj: any):Observable<any> {
    return this.http.post<any>('https://freeapi.miniprojectideas.com/api/amazon/RegisterCustomer',obj);
  }
  login(obj: any):Observable<any> {
    return this.http.post<any>('https://freeapi.miniprojectideas.com/api/amazon/Login',obj);
  }
  addToCart(obj: any):Observable<any> {
    return this.http.post<any>('https://freeapi.miniprojectideas.com/api/amazon/AddToCart',obj);
  }
  getAddToCartDataByCust(id: number):Observable<any[]> {
    const localData = this.http.get<any[]>('https://freeapi.miniprojectideas.com/api/amazon/GetCartProductsByCustomerId?='+id);
    return localData;
  }
  removeItemFromCart(cartId: number):Observable<any> {
    return this.http.get<any>('https://freeapi.miniprojectideas.com/api/amazon/DeleteProductFromCartById?='+cartId);
  }
  placeOrder(obj: any):Observable<any> {
    return this.http.post<any>('https://freeapi.miniprojectideas.com/api/amazon/PlaceOrder',obj);
  }
}