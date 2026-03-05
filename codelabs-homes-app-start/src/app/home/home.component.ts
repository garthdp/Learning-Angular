import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Search for homes" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of housingLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   housingService: HousingService = inject(HousingService);
   housingLocationList: HousingLocation[] = [];

   ngOnInit() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.housingService.fetchAllHousingLocations().subscribe(locations => {
      this.housingLocationList = locations;
    });
   }
}
