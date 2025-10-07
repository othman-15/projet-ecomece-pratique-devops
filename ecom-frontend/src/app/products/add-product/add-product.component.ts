import { Component } from '@angular/core';
import { ProductServiceService } from '../../product-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct: any = {
    productTitle: '',
    productPrice: 0,
    quantity: 0,
    category: '',
    colors: [],
    image: '', // Contiendra le chemin relatif (ex: 'assets/images/products/photo.jpg')
    favorite: false
  };

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  errorMessage: string = '';
  colorsInput: string = '';

  constructor(
    private productService: ProductServiceService,
    protected router: Router
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;



    // Stocker le chemin relatif dans newProduct.image
    this.newProduct.image = `assets/images/${file.name}`;

    // Prévisualisation de l'image
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;

      // Stocker le fichier localement (méthode simulée)
      this.storeImageLocally(file, file.name);
    };
    reader.readAsDataURL(file);
  }

  private generateUniqueFileName(originalName: string): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}_${randomString}_${originalName}`;
  }

  private storeImageLocally(file: File, fileName: string): void {
    // Cette méthode simule le stockage local
    // En réalité, vous devrez copier manuellement le fichier dans le dossier assets/images/products/
    console.log(`Simulation: Fichier ${fileName} serait stocké dans assets/images/products/`);
    console.log('En développement, copiez manuellement le fichier dans le dossier spécifié');
  }

  onSubmit(): void {
    // Convertir les couleurs en tableau
    this.newProduct.colors = this.colorsInput
      .split(',')
      .map(color => color.trim())
      .filter(color => color.length > 0);

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        this.errorMessage = 'Error adding product';
        console.error(err);
      }
    });
  }
}
