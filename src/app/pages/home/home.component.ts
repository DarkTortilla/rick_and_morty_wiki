import { Component, OnInit } from '@angular/core';
import { GetApiDataService } from '../../services/get-api-data.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CorrouselComponent } from '../../components/corrousel/corrousel.component';
import { FormsModule } from '@angular/forms';
import { query } from 'express';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CaracterComponent } from '../caracter/caracter.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, RouterLink, CorrouselComponent, FormsModule, LoaderComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  page: number = 1;
  maxPage: number = 0;
  characters: any[] = [];
  data: any;
  load: boolean = true;
  msgError:string=''

  //-----filter
  gender: string = '';
  specie: string = '';
  status: string = '';
  name: string = '';

  constructor(private dataService: GetApiDataService) { }
  ngOnInit(): void {
    this.getDataCharacters()
  }

  getDataCharacters() {
    this.msgError=''
    console.log(this.page)
    this.dataService.getCharacters(this.page, this.gender, this.status, this.name, this.specie).subscribe(
      response => {
        this.characters.push(...response.results)
        //console.log(this.characters)
        this.load = false;
        this.maxPage = response.info.pages;
      },
      error => {
        console.log(error)
        this.load = false
        this.msgError=error.error.error;
      }
    )

  }
  getMoreData() {

    if (this.page < this.maxPage) {
      this.page++;
      this.getDataCharacters();
    }

  }


  filter() {
    this.load = true
    this.characters = []
    this.page = 1;
    this.getDataCharacters()
  }
  removeFilter() {
    this.page=1;
    this.load=true;
    this.gender = '';
    this.specie = '';
    this.status = '';
    this.name = '';
    this.characters=[]
    this.getDataCharacters()
  }





}
