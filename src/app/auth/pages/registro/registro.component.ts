import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [`
  .registro{
    box-shadow: 10px 15px gray;
  }
` 
  ]
})
export class RegistroComponent implements OnInit {

  //Grupo para el formulario
  registroFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    contraseña: ['', [Validators.required, Validators.minLength(6)] ],
    confirmContraseña: ['', Validators.required],
    nombre: ['', Validators.required]
  },{
    validators: [ this.vs.camposIguales('contraseña', 'confirmContraseña') ]
  }
  );

  usuario: Usuario = {
    id: '',
    email: '',
    contraseña: '',
    nombre: '',
    fechaRegistro: '',
    ultimaSesion: '',
  };

  fecha = new Date();
  fecha2 = new Date();

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private as: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    this.registroFormulario.reset({
      email: [''],
      contraseña: [''],
      confirmContraseña: [''],
      nombre: [''],
    });

  }

  //Valida si el campo es invalido y fue tocado
  campoNoValido( campo: string){
    return this.registroFormulario.get(campo)?.invalid &&
           this.registroFormulario.get(campo)?.touched;
  }


  submitFormulario(){
    this.usuario.email = this.registroFormulario.get('email')?.value;
    this.usuario.contraseña = this.registroFormulario.get('contraseña')?.value;
    this.usuario.nombre = this.registroFormulario.get('nombre')?.value;
    this.usuario.fechaRegistro = this.fecha.toLocaleDateString();
    this.usuario.ultimaSesion = ( this.fecha2.getUTCDate().toString()+'/'+(this.fecha2.getUTCMonth()+1).toString()+'/'+this.fecha2.getFullYear().toString()
    +' '+this.fecha2.getHours().toString()+':'+this.fecha2.getMinutes().toString() );

    this.as.agregarUsuario(this.usuario)
      .subscribe( usuario => {
        this.router.navigate(['./auth/login']);
      });

    this.registroFormulario.markAllAsTouched();
    this.registroFormulario.reset()
  }

}
