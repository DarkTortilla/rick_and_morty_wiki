import { Routes } from '@angular/router';
import { CaracterComponent } from './pages/caracter/caracter.component';
import { HomeComponent } from './pages/home/home.component';
import { PlacesComponent } from './pages/places/places.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { EpisodeComponent } from './pages/episode/episode.component';

export const routes: Routes = [
    { path:"", component:HomeComponent,title:"inicio"},
    { path:'fav',component:FavoritesComponent, title:'favorites'},
    { path:"places", component:PlacesComponent},
    { path:"episodes", component:EpisodesComponent},
    { path:"episode/:id", component:EpisodeComponent},
    //{},
    { path:"personaje/:id", component: CaracterComponent, title:"Personaje"}
];
