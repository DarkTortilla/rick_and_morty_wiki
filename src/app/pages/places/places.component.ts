import { Component, OnInit } from '@angular/core';
import { CorrouselComponent } from '../../components/corrousel/corrousel.component';
import { GetApiDataService } from '../../services/get-api-data.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CorrouselComponent,LoaderComponent,DatePipe],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css'
})
export class PlacesComponent implements OnInit{

  places:any[]=[]
  page:number=1;
  maxPage:number=10;
  load:boolean=true;

  constructor(private apiService:GetApiDataService){}
  ngOnInit(){
    this.getPlaces();
  }
  
  getPlaces(){
    this.apiService.getPlaces(this.page).subscribe(
      response=>{
        this.places.push(...response.results)
        this.load = false;
        this.maxPage = response.info.pages;
      },
      error=>{
        console.log(error)
        this.load=false
      }
    )
  }

  getMorePlaces(){
    if (this.page < this.maxPage) {
      this.page++;
      this.getPlaces();
    }

  }

}
