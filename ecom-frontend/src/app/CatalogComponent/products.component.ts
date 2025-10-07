import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Product} from '../../models/Product';
import {ProductServiceService} from '../product-service.service';
import {Router} from '@angular/router';
import {CartService} from '../cart.service';

@Component({

  selector: 'app-products',
  templateUrl: './products.component.html',
standalone:false,
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public keyword:string ="";
  constructor(public prodService:ProductServiceService,private router:Router,private cartService: CartService) {
  }
  products: Product[] = [];

  ngOnInit(): void {
    this.prodService.getAllProduct().subscribe({
      next: (data) => this.products = data,
      error: (err) => {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    });
  }
  toggleFavorite(product: any) {
    product.favorite = !product.favorite;
    // Tu peux ensuite enregistrer ça localement ou via API
  }


  addToCart(product: Product) {
    if (product.colors?.length && !product.selectedColor) {
      alert('Please select a color before adding to cart.');
      return;
    }

    this.cartService.addToCart(product);
  }
  selectColor(product: Product, color: string): void {
    product.selectedColor = color;
  }
}


  // const p1 = new Product("P001");
  //   p1.productTitle = "HP Pavilion 15";
  //   p1.productPrice = "9500 DH";
  //   p1.quantity = 5;
  //   p1.image ="assets/images/Hp-pavilon.png";
  //
  //   const p2 = new Product("P002");
  //   p2.productTitle = "MacBook Air M2";
  //   p2.productPrice = "14000 DH";
  //   p2.quantity = 2;
  //   p2.image = 'assets/images/m2-macbook-air.png';
  //
  //   const p3 = new Product("P003");
  //   p3.productTitle = "hp mouse ";
  //   p3.productPrice = "360 DH";
  //   p3.quantity = 30;
  //   p3.image = "assets/images/mouse-hp.png";
  //   const p4 = new Product("P08703");
  //   p4.productTitle = "impriment Hp ";
  //   p4.productPrice = "1200 DH";
  //   p4.quantity = 15;
  //   p4.image = "assets/images/imprim-hp.png";
  //   const p5 = new Product("P087e03");
  //   p5.productTitle = "toushiba ";
  //   p5.productPrice = "9999 DH";
  //   p5.quantity = 18;
  //   p5.image = "assets/images/toushiba.png";
  //   this.products = [p1, p2, p3,p4,p5];


  // DeleteProduct(p: any) {
  //   let index= this.products.indexOf(p);
  //   this.products.splice(index,1);
  //
  // }

  // Find() {
  //   let list=[];
  //   for( let p of this.products){
  //     if(p.name.includes(this.keyword)){
  //       list.push(p);
  //     }
  //   }
  //   this.products=list;
  //
  // }

