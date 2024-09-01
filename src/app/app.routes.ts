import { Routes } from '@angular/router';
import { CaracterComponent } from './pages/caracter/caracter.component';
import { HomeComponent } from './pages/home/home.component';
import { PlacesComponent } from './pages/places/places.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path:"", component:HomeComponent,title:"inicio"},
    { path:'fav',component:FavoritesComponent, title:'favorites'},
    { path:"places", component:PlacesComponent},
    { path:"episodes", component:EpisodesComponent},
    //{},
    { path:"personaje/:id", component: CaracterComponent, title:"Personaje"},
    { path:'**', component:NotFoundComponent,title:"404"}
];
