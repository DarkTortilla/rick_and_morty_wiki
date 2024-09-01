import { Component, OnInit } from '@angular/core';
import { GetApiDataService } from '../../services/get-api-data.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CorrouselComponent } from '../../components/corrousel/corrousel.component';
import { FormsModule } from '@angular/forms';
import { query } from 'express';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,



  imports: [NgClass, RouterLink, CorrouselComponent, FormsModule, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  page: number = 1;
  maxPage: number = 0;
  characters: any[] = [];
  data: any;
  load: boolean = true;

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
      }
    )

  }
  getMoreData() {

    if (this.page < this.maxPage) {
      this.page++;
      this.getDataCharacters();
    }

  }

  getClass(value: string): string {
    //console.log(value)
    switch (value) {
      case 'Alive':
        return 'card text-bg-dark';
      case 'Dead':
        return 'card text-bg-danger';
      case 'unknown':
        return 'card text-bg-warning';
      default:
        return 'card text-secondary';
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
