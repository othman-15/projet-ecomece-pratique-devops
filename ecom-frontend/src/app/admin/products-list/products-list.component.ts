import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../product-service.service';
import { Product } from '../../../models/Product';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './products-list.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  errorMessage: string = '';

  constructor(
    private productService: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        this.products = data.map(Product.from);
      },
      error: (err) => {
        this.errorMessage = 'Error loading products';
        console.error(err);
      }
    });
  }

  deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productID !== id);
      },
      error: (err) => {
        console.error('Error deleting product', err);
      }
    });
  }

  addProduct() {
    this.router.navigate(['products/add']);
  }

  editProduct(id: string) {
    this.router.navigate(['/admin/products/edit', id]);
  }
}
