import { Component } from '@angular/core';
import { PetsService } from 'src/services/pets.service';
import { Pet } from 'src/types/pets';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import moment from 'moment';
@Component({
  selector: 'app-animals-page',
  templateUrl: './animals-page.component.html',
  styleUrls: ['./animals-page.component.scss']
})
export class AnimalsPageComponent {
  pets: Pet[] = [];
  setOfCheckedId = new Set<number>();
  showEdit = false;
  title: 'Edit animal' | 'Add animal' = 'Add animal';
  petToEdit: Pet | undefined;
  mode: 'edit' | 'create' = 'create';
  petForm = this.fb.group({
    name: ['', [Validators.required]],
    breed: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    gender: ['', [Validators.required]],
  })
  constructor(private petsService: PetsService, private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.petsService.getPets().subscribe((pets) => {
      this.pets = pets;
      this.setOfCheckedId.clear();
    });
  }

  onDeleteClick() {
    if (this.setOfCheckedId.size === 1) {
      this.setOfCheckedId.forEach(id => {
        const petToDelete = this.pets.find((pet) => pet.id === id);
        if (!petToDelete) return;
        this.petsService.deletePets(petToDelete.id).subscribe((response) => {
          this.getPets();
        });
      });
    }
  }

  onAddClick() {
    this.showEdit = true;
    this.mode = 'create';
    this.title = 'Add animal';
  }

  onEditClick() {
    if (this.setOfCheckedId.size === 1) {
      this.setOfCheckedId.forEach(id => {
        this.petToEdit = this.pets.find((pet) => pet.id === id);
        if (this.petToEdit) {
          this.petForm.setValue({
            birthdate: new Date(this.petToEdit.birthdate).toString(),
            breed: this.petToEdit.breed,
            gender: this.petToEdit.gender,
            name: this.petToEdit.name
          });
          this.title = 'Edit animal';
          this.mode = 'edit';
          this.showEdit = true;
        };
      });
    }
  }

  onCloseDrawer() {
    this.petToEdit = undefined;
    this.showEdit = false;
    this.mode = 'create';
    this.title = 'Add animal';
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

  onSubmitForm() {
    if (!this.petForm.valid) return;
    const {birthdate, breed, gender, name} = this.petForm.value;
    const date = moment(birthdate).format('DD-MM-YYYY');
    const pet: Pet = {
      breed: breed!,
      gender: gender! as any,
      name: name!,
      birthdate: date,
      id: this.petToEdit? this.petToEdit.id :  this.pets.length + 2, 
    };
    if (this.mode === 'create') { 
      console.log(this.petForm.value);
      this.petsService.addPet(pet).subscribe((response) => {
        this.getPets();
        this.onCloseDrawer();
      })
    } else {
      if (!this.petToEdit) return;
      this.petsService.editPet(pet).subscribe((Response) => {
        this.getPets();
        this.onCloseDrawer();
      })
    }
  }
}
