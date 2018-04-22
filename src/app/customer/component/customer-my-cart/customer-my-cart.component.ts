import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-customer-my-cart',
  templateUrl: './customer-my-cart.component.html',
  styleUrls: ['./customer-my-cart.component.css'],
  providers:[CartService]
})
export class CustomerMyCartComponent implements OnInit {  
  constructor(
    private cartService: CartService
  ) {
    
  }
  private items=[];
  x:number;
  prefix=1;

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems(){
    this.cartService.getCartItems().subscribe( 
      (res)=> {
        this.items=res;
        this.x=this.items.reduce(function(sum,cartItem){ return sum+cartItem.price*cartItem.quantity},0);
        console.log("result is:"+res[0].kkdCustId);
        console.log("items are"+ this.items);

      },
       (error)=> console.log(error)
    );
  }

  deleteItem(item,ind){
    this.cartService.deleteCartItem(item).subscribe(
      (res)=>{
        console.log("deleting");
        this.getCartItems();
      },
      (err)=> console.log(err)
    );
  }


  order={"orderId":"bdjn"};
orders=[];
convertOrder(){
  this.orders=this.items.map(
    (ele)=> {
      ele["address"]="#59 ramnagar";
      ele["orderId"]="ORDER101";
      ele["farmerStatus"]="active";
      ele["expectedDate"]="9 APRIL";
      ele["expectedTime"]="9 APRIL";
      ele.mobileNo="9993894794";
      ele["transactionId"]="COD";
      ele["totalAmount"]=10;
      ele["orderType"]="bulk";
      ele["otp"]="5799";
      ele["otpVerified"]="false";
      console.log("ordrr before posting is"+ele);
      this.cartService.postOrder(ele).subscribe((res)=> console.log(ele),(err)=> console.log("error"+err));
    }
  )
}


checkout(){
  this.convertOrder();
  //this.cartService.postOrder(order)

}

  // delete(i: number) {
  //   console.log(i);
  //   this.items.splice(i, 1);
  //   this.x=this.items.reduce(function(sum,cartItem){ return sum+cartItem.price*cartItem.quantity},0);
  // }

  // checkout() {
  //   this.items.map(order => this.cartService.addOrder(order));
  //   //this.items.map(order =>)
  // }

}

