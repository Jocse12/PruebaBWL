import { Component } from '@angular/core';

interface MenuItem{
  texto: string;
  ruta: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu: MenuItem[] = [
    {
      texto: 'Dashboard',
      ruta: './principal/dashboard'
    },
    {
      texto: 'Usuarios',
      ruta: './principal/Usuarios'
    }
  ];
}