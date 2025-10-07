import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Product } from '../../models/Product';
import { ProductServiceService } from '../product-service.service';
import {NgForOf,  NgIf, NgStyle} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    NgStyle
  ]
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    public prodService: ProductServiceService,
    private router: Router,
  private cartService: CartService
  ) {}

  products: Product[] = [];
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.prodService.getAllProduct().subscribe({
      next: (data) => {
        this.products=data.slice(0, 4)
        this.product = data.find(p => p.productID === id.toString());
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    });

    this.prodService.getProductbyid(id).subscribe({
      next: (data) => {
        this.product = data;

      },
      error: (err) => {
        console.error("Erreur lors de la récupération du produit :", err);
      }
    });
  }

  selectColor(color: string): void {
    if (this.product) {
      this.product.selectedColor = color;
    }
  }

  addToCart(product: Product) {
    if (product.colors?.length && !product.selectedColor) {
      alert('Please select a color before adding to cart.');
      return;
    }

    this.cartService.addToCart(product);
  }

}
