import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  cargada: boolean = false;
  info: InfoPagina = {};  
  equipo: any[] = [];

  constructor (private http: HttpClient) { 
    //console.log('Servicio de infoPagina listo');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    //Leo archivo JSON
    this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {        
          this.cargada = true;
          this.info = resp;
          //(resp: any) es otra opción para que tome las prioridades como un objeto
          // console.log(resp); console.log( resp['email'] );                
        });
  }

  private cargarEquipo() {
    //Leo archivo JSON
    this.http.get('https://angular-html-a5c98.firebaseio.com/equipo.json')    
        .subscribe( (resp: any[]) => {
          this.equipo = resp;
          console.log(resp);
        });
  }

}
