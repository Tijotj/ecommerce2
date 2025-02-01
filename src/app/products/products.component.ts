import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productsArray: any[] = [];
  categoryList: any[] = [];
  selectedCategory: number = 0;
  constructor(private pdtServ: ProductService){}
  ngOnInit():void {
    this.loadProducts();
    this.loadCategory();
  }
  loadProducts(){
    this.pdtServ.getAllProducts().subscribe({
      next: (res:any) => {
        debugger;
        this.productsArray = res.data;
        console.log(this.productsArray);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  loadCategory(){
    this.pdtServ.getAllCategories().subscribe({
      next:(res:any)=>{
        this.categoryList = res.data;
      }
    });
  }
  loadProductsByCategory(id: number){
    this.selectedCategory = id;
    this.pdtServ.getAllProductsByCategoryId(id).subscribe({
      next:(v:any)=>{
        this.productsArray = v.data;
      }
    });
  }
  add2cart(id: number){
    const selectedObj = {
      "CartId": 0,
      "CustId": this.pdtServ.loggedObj.custId,
      "ProductId": id,
      "Quantity": 1,
      "AddedDate": new Date()
    };
    if(this.pdtServ.loggedObj.custId != 0){
      this.pdtServ.addToCart(selectedObj).subscribe({
        next:(res:any)=>{
          if(res.result){
            alert("Product added to cart.");
            this.pdtServ.addProductSubject.next(true);
          } else {
            alert(res.message);
          }
        }
      });
    }
    else {
      alert("Please login to add product into cart!");
    }
  }
}
