import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  heroes: Hero[] = HEROES;
  selectedHero: Hero;

  hero: Hero = {
    id: 0,
    name: 'Windstorm'
  };

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  ngOnInit() {
  }

}
