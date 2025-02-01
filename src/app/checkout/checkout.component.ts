import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  loggedObj: any = {};
  checkoutObj: any = {
    "SaleId": 0,
    "CustId": 0,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "",
    "DeliveryAddress1": "",
    "DeliveryAddress2": "",
    "DeliveryCity": "",
    "DeliveryPinCode": "",
    "DeliveryLandMark": ""
  }
  constructor(private pdtServ: ProductService, private router: Router){
    const localData = localStorage.getItem('amazon_user');
    if(localData != null){
      this.loggedObj = JSON.parse(localData);
      this.getCartItems(this.loggedObj.custId);      
    }
  }
  ngOnInit():void {
    this.getCartItems(this.loggedObj.custId);
  }
  getCartItems(id: number){
    this.pdtServ.getAddToCartDataByCust(id).subscribe((res:any)=>{
      this.cartItems = res.data;
    });
  }
  callPlaceOrder(){
    this.checkoutObj.CustId = this.loggedObj.custId;
    this.checkoutObj.TotalInvoiceAmount = this.pdtServ.totalAmount;
    this.pdtServ.placeOrder(this.checkoutObj).subscribe((res:any)=>{
      if(res.result){
        this.pdtServ.addProductSubject.next(true);
        alert("Order has been successfully placed!");
        this.router.navigateByUrl('/');
      } else {
        alert(res.message);
      }
    });
  }
}
