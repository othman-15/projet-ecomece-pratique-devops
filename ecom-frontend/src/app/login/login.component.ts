import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRequest } from '../../models/auth/AuthRequest';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent implements OnInit {
  login: string = '';
  password: string = '';
  errorMessage: string = '';
  returnUrl: string = '/home'; // Valeur par défaut

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onLogin() {
    const credentials: AuthRequest = {
      email: this.login,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigateByUrl(this.returnUrl); // ✅ Redirige vers returnUrl
      },
      error: (err) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
        console.error('Erreur de connexion', err);
      }
    });
  }
}
