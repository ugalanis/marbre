import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AboutComponent } from './pages/about/about.component';
import { ItemComponent } from './pages/item/item.component';


const routes: Routes = [
    { path: 'home', component: PortfolioComponent },
    { path: 'about', component: AboutComponent },
    { path: 'item', component: ItemComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
    //defino una ruta para la excepción, tipo "else"
    //cualquier otra ruta que no este definida acá arriba hará un redirect al 'home' o "/", en este caso portfolio
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
