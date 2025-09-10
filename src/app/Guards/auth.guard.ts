import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
let router = inject(Router);

  let token = localStorage.getItem('token');

  if (token) {
    return true;
  }
  else {
    router.navigateByUrl('/login');
    return false;
  }};
