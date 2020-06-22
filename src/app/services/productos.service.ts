import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos() {    
    //usamos una promesa asyncrona, para ejecutar cierto código hasta que éste se resuelva
    //tiene un callback que recibe dos argumentos, en resolve y el reject cuando sale mal
    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-a5c98.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {            
            this.productos = resp;
            this.cargando = false;        
            resolve(); //se ejecuta cuando la promesa termino correctamente
            // setTimeout(() => {
            //   this.cargando = false;            
            // }, 2000);
          });
    });
  }
  
  getProducto(id: string)
  {  
    return this.http.get(`https://angular-html-a5c98.firebaseio.com/productos/${ id }.json`)
  }

  buscarProducto(termino: string) 
  {
    if ( this.productos.length === 0 ) {
        //cargar productos
        this.cargarProductos().then( () => {
            //ejecutamos esta función después de tener los productos
            //aplicar filtro
            this.filtrarProductos( termino );
        });
    }
      else
      { //aplicar el filtro
        this.filtrarProductos( termino );
      }
  }

  private filtrarProductos (termino: string) {
    //console.log(this.productos);
    this.productosFiltrado = [];
    
    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      const categoriaLower = prod.categoria.toLocaleLowerCase();
      const tituloLower = prod.titulo.toLocaleLowerCase();
      
      if( categoriaLower.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) 
      {
        this.productosFiltrado.push( prod );
      }
    });
  }

}