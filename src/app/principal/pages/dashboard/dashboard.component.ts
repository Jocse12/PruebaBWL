import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PrincipalService } from '../../services/principal.service';
import { Weather } from '../../interfaces/weather.interface';

interface Tareas{
  tarea: string;
  estado: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    .fila{
      background-color: gray;
    }
    .dash{
      box-shadow: 5px 10px gray;
    }
    a{
      cursor: pointer;
    }
  `
  ]
})
export class DashboardComponent implements OnInit {

  listaTareas: Tareas[] =[
    {
      tarea: 'Ir a correr',
      estado: true
    },
    {
      tarea: 'Revisar correos',
      estado: true
    },
    {
      tarea: 'Terminar la prueba',
      estado: false
    },
    {
      tarea: 'Terminar componente de proyecto1',
      estado: false
    },
    {
      tarea: 'Enviar papeleo',
      estado: true
    },
    {
      tarea: 'Actualizar calendario',
      estado: false
    },
  ];

  paises: Country[] = [];
  paisSeleccionado: Country[]=[];
  nombre="";
  flag="";
  zonaHoraria="";
  weather!: Weather;
  climaPais!: number;
  hora="";
  condicion='';

  constructor( private principalService: PrincipalService) { }

  ngOnInit(): void {
    this.principalService.buscarPais()
      .subscribe( pais => {
        this.paises = pais.splice(0,5); 
      }
      );
  }

  //Busca pais seleccionado por codigo y clima por nombre del pais
  buscarPais( codigo: string ){
    this.principalService.buscarPaisPorCodigo(codigo)
    .subscribe( resp => {
      
      this.paisSeleccionado = resp;
      this.nombre= this.paisSeleccionado[0].name.common;
      this.flag= this.paisSeleccionado[0].flags.png;
      this.zonaHoraria= this.paisSeleccionado[0].timezones[0];

      this.principalService.buscarWeather(this.nombre)
        .subscribe(resp => {
          
          this.weather = resp;
          
          this.climaPais = this.weather.current.temp_c;
          
          this.hora = this.weather.location.localtime;
          
          this.condicion = this.weather.current.condition.text;
        })
    });
  }

}
