import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  phone!: string;
  password!: string;

  constructor(private http: ProductService, private router: Router) {}

  register() {
    this.http.postData("https://rentcar.stepprojects.ge/api/Users/register", {
      phoneNumber: this.phone,
      password: this.password
    }).subscribe({
      next: (resp: any) => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully',
          showConfirmButton: true
        }).then(() => {
          this.router.navigateByUrl("/login");
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Please try again.'
        });
        console.error('Registration error:', err);
      }
    });
  }
}
