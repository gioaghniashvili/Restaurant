import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  registerLinkVisible() {
    return window.location.pathname !== '/login' && window.location.pathname !== '/register';
  }

  logOut() {
    localStorage.removeItem("token");

    Swal.fire({
      icon: 'success',
      title: 'Logged Out Successfully',
      showConfirmButton: true
    }).then(() => {
      window.location.reload();
    });
  }

  get isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
