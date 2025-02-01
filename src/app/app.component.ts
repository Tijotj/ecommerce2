import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce2';
  registerObj: any = {
    "CustId": 0,
    "Name": '',
    "MobileNo": '',
    "Password": ''
  };
  loginObj: any = {
    "UserName": "",
    "UserPassword": ""
  };
  loggedObj2: any = {
    custId: 0,
    name: '',
    mobileNo: '',
    password: ''
  };
  cartItems: any[] = [];
  subTotal: number = 0;
  logoutSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private pdtServ: ProductService, private router: Router){
    const localData = localStorage.getItem('amazon_user');
    if(localData != null) {
      this.pdtServ.loggedObj = JSON.parse(localData);
      this.loggedObj2 = this.pdtServ.loggedObj;
      this.loadCart(this.loggedObj2.custId);
    }
    this.pdtServ.addProductSubject.subscribe((res:boolean)=>{
      if(res){
        this.loadCart(this.loggedObj2.custId);
      }
    });
    this.logoutSubject.subscribe((res:boolean)=>{
      this.pdtServ.loggedObj.custId = 0;
      this.loggedObj2.custId = 0;
    });
  }
  onRegister(){
    this.pdtServ.register(this.registerObj).subscribe({
      next: (res:any) => {
        if(res.result)
          alert('Registered successfully!');
        else
          alert(res.message);
      }
    });
  }
  onLogin(){
    this.pdtServ.login(this.loginObj).subscribe({
      next: (res:any) => {
        if(res.result){
          alert('Login success!');
          this.pdtServ.loggedObj = res.data;
          this.loggedObj2 = this.pdtServ.loggedObj;
          localStorage.setItem('amazon_user',JSON.stringify(res.data));
          this.loadCart(this.loggedObj2.custId);
          this.router.navigateByUrl('/');
        }
        else  
          alert(res.message);
      }
    });
  }
  loadCart(id: number){
    this.subTotal = 0;
    this.pdtServ.getAddToCartDataByCust(id).subscribe((res:any)=>{
      this.cartItems = res.data;
      this.cartItems.forEach(item => {
        this.subTotal += item.productPrice;
        this.pdtServ.totalAmount = this.subTotal;
      });
    });
  }
  removeItem(id:number){
    this.pdtServ.removeItemFromCart(id).subscribe((res:any)=>{
      if(res.result){
        alert("Product removed!");
        this.loadCart(this.loggedObj2.custId);
      }
    });
  }
  logOutUser(){
    localStorage.removeItem('amazon_user');
    this.logoutSubject.next(true);
  }
}
