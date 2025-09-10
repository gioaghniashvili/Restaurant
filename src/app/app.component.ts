import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FrontPgComponent } from './front-pg/front-pg.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, FrontPgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NG1';

  get show() {
    return window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/cart' ;
  }
  get shows() {
    return  window.location.pathname !== '/login' && window.location.pathname !== '/register';
  }


}
