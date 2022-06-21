import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/usuario.interface';
import { PrincipalService } from '../../services/principal.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [`
  .tabla{
    box-shadow: 5px 10px gray;
  }
`
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]=[];

  constructor(private ps: PrincipalService) { }

  ngOnInit(): void {
    this.ps.getUsuarios()
      .subscribe(resp => {
        this.usuarios = resp;
      });
  }

}
