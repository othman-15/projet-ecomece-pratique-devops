import {RegisterRequest} from '../models/auth/RegisterRequest';
import {Observable, tap} from 'rxjs';
import {AuthRequest} from '../models/auth/AuthRequest';
import {AuthResponse} from '../models/auth/AuthResponse';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:8083/api";

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth/register`, data, { responseType: 'text' });
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getFirstName(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.firstName || null;
    }
    return null;
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.sub || null;
    }
    return null;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.role || null;
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'ROLE_USER';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Erreur de décodage du token', e);
      return null;
    }
  }
}
