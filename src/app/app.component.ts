import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/services/pets.service';
import { Pet } from 'src/types/pets';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-animales';
  pets: Pet[] = [];

  constructor(private petsservice: PetsService) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.petsservice.getPets().subscribe((pets) => {
      this.pets = pets;
      console.log(this.pets);
    })
  }
}
