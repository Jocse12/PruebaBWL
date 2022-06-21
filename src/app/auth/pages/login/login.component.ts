import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  .login{
    box-shadow: 10px 15px gray;
  }
    a{
      cursor: pointer;
    }
  `]
})
export class LoginComponent implements OnInit {

  LoginFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)] ],
    contraseña: ['', Validators.required ]
  });
  
  email:string='';
  contraseña: string ='';
  errorMsg: string = '';

  constructor( private fb: FormBuilder,
               private router: Router,
               private vs: ValidatorService,
               private as: AuthService) { }

  ngOnInit( ): void {
    this.LoginFormulario.reset({
      email: [''],
      contraseña: ['']
    });
  }

  campoNoValido( campo: string){
    return this.LoginFormulario.get(campo)?.invalid &&
           this.LoginFormulario.get(campo)?.touched;
  }

  loginSubmit(){
    console.log(this.LoginFormulario.get('email')?.value, this.LoginFormulario.get('contraseña')?.value);
    this.email = this.LoginFormulario.get('email')?.value;
    this.contraseña = this.LoginFormulario.get('contraseña')?.value
  
    this.as.login(this.email, this.contraseña )
    .subscribe( resp => {
        if(resp[0].id){
          this.router.navigate(['./principal/dashboard']);   
          this.as.updateSesion().subscribe();
        }
      });
  }

}
