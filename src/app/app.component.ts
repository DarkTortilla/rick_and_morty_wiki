import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { app } from '../../server';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { CorrouselComponent } from './components/corrousel/corrousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavComponent, CorrouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rick_and_morty_wiki';
}
