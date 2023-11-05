import { Component } from '@angular/core';
import { PetsService } from 'src/services/pets.service';
import { Pet } from 'src/types/pets';

@Component({
  selector: 'app-animals-page',
  templateUrl: './animals-page.component.html',
  styleUrls: ['./animals-page.component.scss']
})
export class AnimalsPageComponent {
  pets: Pet[] = [];
  setOfCheckedId = new Set<number>();
  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.petsService.getPets().subscribe((pets) => {
      this.pets = pets.map((p, index) => {
        return {
          ...p,
          id: index
        }
      });
      console.log(this.pets);
    });
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }


  onItemChecked(id: number, checked: boolean) {
    this.updateCheckedSet(id, checked);
  }
}
