import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Usuario } from 'src/app/auth/interfaces/usuario.interface';
import { Country } from '../interfaces/pais.interface';
import { Weather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  private baseUrl: string = 'http://localhost:3000/usuarios';

  private paisUrl: string = "https://restcountries.com/v3.1";

  private weatherKey: string = 'a0632f9b793f449bb6d212914222106';

  private weatherUrl: string = 'http://api.weatherapi.com/v1/current.json?'

  constructor(private http: HttpClient) { }

  //Obtiene lista de usuarios
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  //Obtiene lista de paises
  buscarPais(): Observable<Country[]> {
    const url = `${this.paisUrl}/all?fields=name,flags,cca2`;
    return this.http.get<Country[]>( url );
  }

  //Obitnene pais por codigo cca2
  buscarPaisPorCodigo( codigo: string): Observable<Country[]> {
    const url = `${this.paisUrl}/alpha/${codigo}`;
    return this.http.get<Country[]>( url );
  }

  //obtiene clima del país por su nombre
  buscarWeather( pais: string): Observable<Weather> {
    const url = `${this.weatherUrl}key=${this.weatherKey}&q=${pais} &aqi=no`;
    return this.http.get<Weather>( url );
  }

}
