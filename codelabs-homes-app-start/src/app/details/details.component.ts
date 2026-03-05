import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
    <img class="listing-photo" [src]="housingLocation?.photo ? 'data:image/jpeg;base64,' + housingLocation?.photo : housingLocation?.Photo" alt="Exterior photo of {{ housingLocation?.Name }}" />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.Name }}</h2>
        <p class="listing-location">{{ housingLocation?.City }}, {{ housingLocation?.Province }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">Features</h2>
        <ul>
          <li>Available Units: {{ housingLocation?.AvailableUnits }}</li>
          <li>Wifi: {{ housingLocation?.Wifi ? 'Yes' : 'No' }}</li>
          <li>Laundry: {{ housingLocation?.Laundry ? 'Yes' : 'No' }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Contact</h2>
        <button class="primary" type="button">Apply Now</button>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get("id"));
    this.housingService.fetchHousingLocationById(housingLocationId).subscribe(location => {
      this.housingLocation = location;
    });
  }
}
