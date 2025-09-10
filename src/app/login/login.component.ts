import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  phone!: string;
  password!: string;

  constructor(
    private http: ProductService,
    private router: Router,
    private auth: AuthService
  ) {}

  logIn() {
    this.http.postData("https://rentcar.stepprojects.ge/api/Users/login", {
      phoneNumber: this.phone,
      password: this.password
    }).subscribe({
      next: (resp: any) => {
        localStorage.setItem("token", resp.token);
        this.auth.logIn();
        Swal.fire({
          icon: 'success',
          title: 'Logged In Successfully',
          showConfirmButton: true
        }).then(() => {
          this.router.navigateByUrl("/home");
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your phone number and password.'
        });
        console.error('Login error:', err);
      }
    });
  }
}
