import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../auth-service.service';
import { RegisterRequest } from '../../models/auth/RegisterRequest';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  // Vérifie si les mots de passe correspondent
  passwordsMatch(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // Affiche les erreurs
      return;
    }

    const formData = this.signupForm.value;

    const request: RegisterRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword, // inclus maintenant
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      country: formData.country
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = 'Registration failed. Try again.';
        console.error(err);
      }
    });
  }
}
