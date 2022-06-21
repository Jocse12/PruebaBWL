import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

interface MenuItem{
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
  .cs{
    cursor: pointer;
  }
  `
  ]
})
export class MenuComponent {

  menu: MenuItem[] = [
    {
      texto: 'Dashboard',
      ruta: '/principal/dashboard'
    },
    {
      texto: 'Usuarios',
      ruta: '/principal/usuarios'
    }   
  ];

  constructor( private authService: AuthService,
               private router: Router){}

  get auth(){
    return this.authService.auth.nombre;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['./auth'])
  }

}
