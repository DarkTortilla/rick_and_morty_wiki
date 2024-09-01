import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOMEM } from 'dns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetApiDataService {

  private apiUrl:String='https://rickandmortyapi.com/api'
  constructor(private httpService:HttpClient) { }


  getCharacters(page: number, gender:string,status:string,name:string,specie:string ): Observable<any> {
    console.log(name)
    return this.httpService.get(

      this.apiUrl+'/character/?page='+page+
      '&gender='+gender+
      '&status='+status+
      '&name='+name+
      '&species='+specie);
  }
  getFavorites(data:any):Observable<any>{
    return this.httpService.get(this.apiUrl+'/character/'+data)
  }
 
  getSingleCharacter(id:number):Observable<any>{
    return this.httpService.get(this.apiUrl+'/character/'+id)
  }
  
 getPlaces(id:number):Observable<any>{
    return this.httpService.get(this.apiUrl+'/location?page='+id)
  }
  getSinglePlace(id:number):Observable<any>{
    return this.httpService.get(this.apiUrl+'/location/'+id)
  }

  getEpisodes(page:number):Observable<any>{
    return this.httpService.get(this.apiUrl+'/episode?page='+page)
  }
  getSingleEpisodie(){

  }
}
