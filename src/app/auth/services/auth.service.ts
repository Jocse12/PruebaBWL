import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/auth/interfaces/usuario.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:3000/usuarios/';
  
  private _auth: Usuario[] = [];

  private usuario: Usuario ={
    id: '',
    email: '',
    contraseña: '',
    nombre: '',
    fechaRegistro: '',
    ultimaSesion: '',
  };
  private id='';
  fecha = new Date();
  private email="";
  private contraseña="";

  get auth(): Usuario{
    return this._auth[0];
  }

  constructor( private http: HttpClient) { }

  verificaAutenticacion():Observable<boolean>{
    if(!localStorage.getItem('token')?.valueOf() ){
      return of(false);
    }
    return this.http.get<Usuario[]>(`${this.baseUrl}?email=${localStorage.getItem('email')}&contraseña=${localStorage.getItem('contra')}` )
      .pipe(
        map( auth => {
          this._auth = auth;
          return true;
        } )
      );
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  login( email: string, contraseña: string){
    localStorage.setItem('email', email);
    localStorage.setItem('contra', contraseña);
    
    return this.http.get<Usuario[]>(`${this.baseUrl}?email=${email}&contraseña=${contraseña}` )
      .pipe(
        tap( auth => {
          this._auth = auth; 

          this.id= this._auth[0].id.toString();
          this.usuario.id = this._auth[0].id.toString();
          this.usuario.email = this._auth[0].email.toString();
          this.usuario.contraseña = this._auth[0].contraseña.toString();
          this.usuario.nombre = this._auth[0].nombre.toString();
          this.usuario.fechaRegistro = this._auth[0].fechaRegistro.toString();
          this.usuario.ultimaSesion = this.fecha.getUTCDate().toString()+'/'+(this.fecha.getUTCMonth()+1).toString()+'/'+this.fecha.getFullYear().toString()
            +' '+this.fecha.getHours().toString()+':'+this.fecha.getMinutes().toString() ;
        }),
        tap( auth => localStorage.setItem('token', auth[0].id) )
      );
  }

  updateSesion(): Observable<Usuario[]>{
    return this.http.put<Usuario[]>(`${this.baseUrl}${this.id}`,this.usuario);
  }

  logout(){
    localStorage.setItem('token', this._auth[0].id='' );
    localStorage.clear();
  }

}
