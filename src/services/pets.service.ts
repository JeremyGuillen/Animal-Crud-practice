import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pet } from 'src/types/pets';
@Injectable({providedIn: 'root'})
export class PetsService {
    constructor(private httpClient: HttpClient) {}

    getPets() {
        return this.httpClient.get<Pet[]>(`${environment.api_base_url}/pets`);
    }

    deletePets(id: number) {
        return this.httpClient.delete(`${environment.api_base_url}/pets/${id}`);
    }
}