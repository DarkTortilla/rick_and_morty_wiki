import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() character:any;


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
}
