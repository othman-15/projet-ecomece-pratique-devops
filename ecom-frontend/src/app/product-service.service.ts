import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'  // Pour l'injecter globalement sans avoir à le mettre dans les providers du module
})
export class ProductServiceService {
  private host: string = "http://localhost:8083";

  constructor(private http: HttpClient) { }

  // Récupérer tous les produits
  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/api/products`);
  }

  // Récupérer un produit par id
  getProductbyid(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/api/products/${id}`);
  }

  // Supprimer un produit par id
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.host}/api/admin/products/${id}`);
  }

  // Ajouter un nouveau produit
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/api/admin/products`, product);
  }

  // Modifier un produit existant
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/api/admin/products/${id}`, product);
  }
}
