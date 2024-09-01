import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GetApiDataService } from '../../services/get-api-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';4
import { faEarth, faPerson, faHeart, faHeartBroken, faGenderless, faRobot } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-caracter',
  standalone: true,
  imports: [SlicePipe, RouterLink, FontAwesomeModule],
  providers:[SlicePipe],
  templateUrl: './caracter.component.html',
  styleUrl: './caracter.component.css'
})
export class CaracterComponent implements OnInit{

  id:number=0;
  character:any;
  msgerror:boolean=false;
  faEarth=faEarth; 
  faPerson=faPerson; 
  faHeart=faHeart; 
  faHeartBroken=faHeartBroken;
  faGenderless=faGenderless;
  faRobot=faRobot;
  episodes:any=[];


  paginatedEpisodes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  constructor(private dataService:GetApiDataService, private actRouter:ActivatedRoute){}
  
  ngOnInit(): void {
  
    this.actRouter.params.subscribe((params:any)=>{
      this.id=params['id']
      //console.log(this.id)
      this.getCharacter(params['id'])
    })
    
  }


  getCharacter(id:number){
    this.dataService.getSingleCharacter(id).subscribe(
      async response=>{
        //console.log(response)
        this.character= response;
        this.episodes = await this.getEpisode(this.character.episode)
        //console.log(this.episodes)
        this.updatePaginatedItems();
      },
      error=>{
        //console.log(error)
        this.msgerror=true;
      }
    )
  }

  isFav():boolean{
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    //console.log(favorites)
    //console.log(this.id)
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

  async getEpisode(episode: any): Promise<any[]> {
    const episodes = episode.map((ep:any) => Number(ep.split('/').pop()));
  
    //console.log(episodes);
  
    try {
      const response = await this.dataService.getSetEpisodes(JSON.stringify(episodes)).toPromise();
      //console.log(response)
      return response;
    } catch (error) {
      //console.error(error);
      return [];
    }
  }

  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEpisodes = this.episodes.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  get totalPages(): number {
    return Math.ceil(this.episodes.length / this.itemsPerPage);
  }
  
  
  
}
