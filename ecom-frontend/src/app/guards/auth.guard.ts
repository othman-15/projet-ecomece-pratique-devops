import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import {AuthService} from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const expectedRole = route.data['role']; // ex: ROLE_ADMIN ou ROLE_USER

    if (!this.authService.isLoggedIn()) {
      return this.router.parseUrl('/login');
    }

    const userRole = this.authService.getRole();

    // Si aucun rôle n’est exigé : juste connecté = OK
    if (!expectedRole) return true;

    // Vérifie si le rôle utilisateur correspond à celui requis
    if (userRole !== expectedRole) {
      return this.router.parseUrl('/unauthorized'); // ou vers /home si tu veux
    }

    return true;
  }
}
