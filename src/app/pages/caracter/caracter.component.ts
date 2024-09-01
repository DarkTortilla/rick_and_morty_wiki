import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GetApiDataService } from '../../services/get-api-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-caracter',
  standalone: true,
  imports: [SlicePipe, RouterLink],
  providers:[SlicePipe],
  templateUrl: './caracter.component.html',
  styleUrl: './caracter.component.css'
})
export class CaracterComponent implements OnInit{

  id:number=0;
  character:any;
  msgerror:boolean=false;

  
  constructor(private dataService:GetApiDataService, private actRouter:ActivatedRoute){}
  
  ngOnInit(): void {
  
    this.actRouter.params.subscribe((params)=>{
      this.id=params['id']
      console.log(this.id)
      this.getCharacter(params['id'])
    })
    
  }


  getCharacter(id:number){
    this.dataService.getSingleCharacter(id).subscribe(
      response=>{
        console.log(response)
        this.character= response;
      },
      error=>{
        console.log(error)
        this.msgerror=true;
      }
    )
  }

  isFav():boolean{
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    console.log(favorites)
    console.log(this.id)
    return favorites.includes(Number(this.id))
  }

  addToFavorites(){
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      favorites.push(Number(this.id));
      localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  removeFromFavorites(): void {
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  
    const index = favorites.indexOf(Number(this.id));
  
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } 
  }
  getEpisode(episode:string){
    return episode.split('/').pop();
  }
  
}
