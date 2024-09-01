import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GetApiDataService } from '../../services/get-api-data.service';
import { CorrouselComponent } from '../../components/corrousel/corrousel.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [LoaderComponent,CorrouselComponent, DatePipe],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit{
  episodes:any[]=[];
  load:boolean=true;
  page:number=1;
  max:number=10;
  constructor(private apiService:GetApiDataService){

  }
  ngOnInit(): void {
    this.getEpisodes()
  }
  getEpisodes(){
    this.apiService.getEpisodes(this.page).subscribe(
      response=>{
        this.episodes.push(...response.results);
        this.load = false;
        this.max = response.info.pages;
      },
      error=>{
        console.log(error)
          this.load=false;
      }
    )

  }
  getMoreEpisodes(){
    if (this.page<this.max) {
      this.page++;
      this.getEpisodes()
    }
  }

}
