import { Component, OnInit } from '@angular/core';
import { GetApiDataService } from '../../services/get-api-data.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink,LoaderComponent,CardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  characters:any[]=[];
  load:boolean=true;
  constructor(private getDataService: GetApiDataService) { }

  ngOnInit(): void {
    this.getFavorites()
  }
  getFavorites() {
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.length != 0) {
      this.getDataService.getFavorites(  localStorage.getItem('favorites')).subscribe(
        response => {
          console.log(response)
          this.characters=[...response]
          this.load=false;
        },
        error => {
          this.load=false;
        }
      )
    }
  }

}
